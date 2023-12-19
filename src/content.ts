/*global browser*/

import type { BattleMovie, Battle, Movie } from "./types";
import * as O from "fp-ts/Option";

import Fuse from "fuse.js";
import { battleBoard, gameOver, latestMovie } from "./dom";
import { addMovie, initialState, lastMovie } from "./battle";
import { makeGraph, makeFuse, type Graph, search, recommendations, formatResult } from "./graph";

const handleNewMovie = (battle: Battle, graph: Graph, movie: Movie): void => {
  // console.log(`${movie.name} added`);
  const results = recommendations(battle, movie, graph).map(formatResult).join("\n");
  console.log(results);
};

const awaitBattle = (): Promise<O.Option<Element>> => {
  return new Promise<O.Option<Element>>((resolve) => {
    if (O.isSome(battleBoard())) return resolve(battleBoard());
    // return O.none;
    const observer = new MutationObserver((_) => {
      if (O.isSome(battleBoard())) {
        console.log("Battle board detected, awaiting movies");
        observer.disconnect();
        resolve(battleBoard());
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
};

const awaitNewMovies =
  (g: Promise<Graph>, f: Promise<Fuse<Movie>>) => (board: O.Option<Element>) => {
    let battle: Battle = initialState;

    const observer = new MutationObserver((mutations) => {
      if (mutations.length > 2) {
        // proxy for non keypress idk how else
        if (O.isSome(O.flatMap((b: Element) => gameOver(b))(board))) {
          console.log("Game over");
          observer.disconnect();
          run();
        }

        const topMovie = O.flatMap(board, latestMovie);

        if (topMovie !== lastMovie(battle)) {
          O.map((battleMovie: BattleMovie) => {
            g.then((graph) =>
              f.then((fuse) => {
                const movie = search(fuse, battleMovie);
                battle = addMovie(battle, battleMovie, movie);
                handleNewMovie(battle, graph, movie);
              }),
            );
          })(topMovie);
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  };

const g = makeGraph(chrome.runtime.getURL("static/graph.json"));
const f = g.then((graph) => makeFuse(chrome.runtime.getURL("static/fuseIndex.json"), graph));

// graph(chrome.runtime.getURL("static/graph.json")).then((g) => {
//   fuse(chrome.runtime.getURL("static/fuseIndex.json"), g).then((searchIndex) => {
//     const results = searchIndex.search(
//       { $and: [{ year: "2012" }, { title: "avengers" }] },
//       { limit: 1 },
//     );
//     console.log(results[0].item.release_date);
//   });
// });
const run = () => awaitBattle().then(awaitNewMovies(g, f));
run();
