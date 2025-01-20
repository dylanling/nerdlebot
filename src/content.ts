/*global browser*/

import * as O from "fp-ts/Option";

import MiniSearch from "minisearch";
import { battleBoard, latestMovie } from "./battlev2/dom";
import type { Battle, BattleMovie, Movie, SearchGraph, WinConCache } from "./battlev2/types";
import { addMovie, initialState, lastMovie } from "./battlev2/battle";
import { latifahCache, makeGraph, makeIndex, searchForBattleMovie } from "./battlev2/graph";
import { formatMovie, makeRecommendation } from "./battlev2/recommendation";

const handleNewMovie = (
  battle: Battle,
  graph: SearchGraph,
  winConCache: WinConCache,
  movie: Movie,
): void => {
  makeRecommendation(battle, graph, winConCache, movie);
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
  (g: Promise<SearchGraph>, i: Promise<MiniSearch<Movie>>, c: Promise<WinConCache>) =>
  (board: O.Option<Element>) => {
    let battle: Battle = initialState;

    const observer = new MutationObserver((mutations) => {
      if (mutations.length > 2) {
        const topMovie = O.flatMap(board, latestMovie);

        if (topMovie !== lastMovie(battle)) {
          O.map((battleMovie: BattleMovie) => {
            g.then((graph) =>
              i.then((index) =>
                c.then((cache) => {
                  console.log(`Saw ${battleMovie?.name} (${battleMovie?.year}) on board`);
                  const movie = searchForBattleMovie(index, battleMovie);
                  console.log(`Found movie: ${formatMovie(movie)}`);
                  battle = addMovie(battle, battleMovie, movie);
                  handleNewMovie(battle, graph, cache, movie);
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
const cache = graph.then(latifahCache);
const run = () => awaitBattle().then(awaitNewMovies(graph, index, cache));
run();
