/*global browser*/

import * as O from "fp-ts/Option";

import MiniSearch from "minisearch";
import { battleBoard, latestMovie } from "./battlev2/dom";
import type {
  Battle,
  BattleMovie,
  Movie,
  SearchGraph,
  WinConCache,
  WinCon,
} from "./battlev2/types";
import { addMovie, initialState, lastMovie } from "./battlev2/battle";
import { personCache, makeGraph, makeIndex, searchForBattleMovie } from "./battlev2/graph";
import { formatMovie, printRecommendations, recommendations } from "./battlev2/recommendation";
import { FRANCES_MCDORMAND, ZENDAYA } from "./battlev2/constants";

const handleNewMovie = (battle: Battle, graph: SearchGraph, movie: Movie, wincon: WinCon): void => {
  // makeRecommendation(battle, graph, winConCache, movie);
  printRecommendations(recommendations(battle, graph, movie, wincon));
};

const awaitBattle = (): Promise<O.Option<Element>> => {
  console.log("Awaiting battle start!");
  return new Promise<O.Option<Element>>((resolve) => {
    if (O.isSome(battleBoard())) {
      console.log("Battle board detected, awaiting movies");
      return resolve(battleBoard());
    }
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
  (g: Promise<SearchGraph>, i: Promise<MiniSearch<Movie>>, w: Promise<WinCon>) =>
  (board: O.Option<Element>) => {
    let battle: Battle = initialState;

    const observer = new MutationObserver((mutations) => {
      if (mutations.length > 2) {
        const topMovie = O.flatMap(board, latestMovie);

        if (topMovie !== lastMovie(battle)) {
          O.map((battleMovie: BattleMovie) => {
            g.then((graph) =>
              i.then((index) =>
                w.then((wincon) => {
                  console.log(`Saw ${battleMovie?.name} (${battleMovie?.year}) on board`);
                  const movie = searchForBattleMovie(index, battleMovie);
                  console.log(`Found movie: ${formatMovie(movie)}`);
                  battle = addMovie(battle, battleMovie, movie);
                  handleNewMovie(battle, graph, movie, wincon);
                }),
              ),
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

const graph = makeGraph(chrome.runtime.getURL("static/graphv2.json"));
const index = graph.then(makeIndex);
// const cache = graph.then(personCache(FRANCES_MCDORMAND));
const wincon = graph.then((g) => {
  return {
    genre: O.some("Romance"),
    cache: O.none,
  } as WinCon;
});
// const winconPromise = graph.then(wincon)
const run = () => awaitBattle().then(awaitNewMovies(graph, index, wincon));
run();
