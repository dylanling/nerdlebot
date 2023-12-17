import type { Movie, Battle } from "./types";
import * as O from "fp-ts/Option";

import { pipe } from "fp-ts/function";
import { battleBoard, latestMovie } from "./dom";
import { addMaybeMovie, initialState, lastMovie } from "./battle";

const handleNewMovie =
  (_: Battle) =>
  (movie: Movie): void => {
    console.log(`New movie added: ${movie.name} | ${movie.year}`);
    return;
  };

const awaitBattle = (): Promise<O.Option<Element>> => {
  return new Promise<O.Option<Element>>((resolve) => {
    if (O.isSome(battleBoard())) return resolve(battleBoard());

    const observer = new MutationObserver((_) => {
      if (O.isSome(battleBoard())) {
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

const awaitNewMovies = (board: O.Option<Element>) => {
  let battle: Battle = initialState;

  const observer = new MutationObserver((_) => {
    const topMovie = pipe(board, O.map(latestMovie), O.compact);

    if (topMovie !== lastMovie(battle)) {
      battle = pipe(topMovie, addMaybeMovie(battle));
      pipe(topMovie, O.map(handleNewMovie(battle)));
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};

console.log("active");

awaitBattle().then(awaitNewMovies);
