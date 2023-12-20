/*global browser*/

import type { BattleMovie, Battle, Movie } from "./types";
import * as O from "fp-ts/Option";

import MiniSearch from "minisearch";
import { battleBoard, gameOver, latestMovie } from "./dom";
import { addMovie, initialState, lastMovie } from "./battle";
import { makeGraph, type Graph, search, makeIndex, recommendations, formatRec } from "./graph";

const handleNewMovie = (battle: Battle, graph: Graph, movie: Movie): void => {
  console.log(`${movie.title} recommendations:`);
  const results = recommendations(battle, movie, graph);
  if (results) console.log(formatRec(results));
  else {
    console.log("Nothing found");
  }
};

const awaitBattle = (): Promise<O.Option<Element>> => {
  return new Promise<O.Option<Element>>((resolve) => {
    if (O.isSome(battleBoard())) return resolve(battleBoard());
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
  (g: Promise<Graph>, i: Promise<MiniSearch<Movie>>) => (board: O.Option<Element>) => {
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
              i.then((index) => {
                const movie = search(index, battleMovie);
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

const graph = makeGraph(chrome.runtime.getURL("static/graph.json"));
const index = graph.then(makeIndex);

const run = () => awaitBattle().then(awaitNewMovies(graph, index));
run();
