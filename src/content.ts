import type { Movie, Battle } from "./types";
import * as O from "fp-ts/Option";

import { pipe } from "fp-ts/function";
import { head } from "fp-ts/Array";
// import { fromNullable, isSome, some, none } from 'fp-ts/Option';
import { battleBoard, latestMovie } from "./dom";
import { addMaybeMovie, initialState, lastMovie } from "./battle";

const BATTLE_BOARD_SELECTOR = ".battle-board-movies";
const BATTLE_MOVIE_SELECTOR = ".battle-board-movie";

// const lastMovie = (state: GameState): BoardMovie | null => {
//   return state.movies[0];
// };

// const addMovie = (state: GameState, movie: BoardMovie): GameState => {
//   return { movies: [movie, ...state.movies] };
// };

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

// const waitForBattleBoard = () => {
//   return new Promise<Element | null>((resolve) => {
//     if (document.querySelector(BATTLE_BOARD_SELECTOR)) {
//       return resolve(document.querySelector(BATTLE_BOARD_SELECTOR));
//     }

//     const observer = new MutationObserver((_) => {
//       if (document.querySelector(BATTLE_BOARD_SELECTOR)) {
//         observer.disconnect();
//         resolve(document.querySelector(BATTLE_BOARD_SELECTOR));
//       }
//     });

//     observer.observe(document.body, {
//       childList: true,
//       subtree: true,
//     });
//   });
// };

awaitBattle().then(awaitNewMovies);

// waitForBattleBoard().then((board) => {
//   console.log("Board is loaded! Watching board!");

//   var state: GameState = { movies: [] };

//   // TODO: use mutation-summary lib?
//   const observer = new MutationObserver((_) => {
//     const topMovie = board?.querySelector(BATTLE_MOVIE_SELECTOR);
//     if (
//       topMovie?.lastChild?.nodeType === Node.TEXT_NODE &&
//       toBoardMovie(topMovie?.lastChild?.textContent) !== state.movies[0]
//     ) {
//       const movie = toBoardMovie(topMovie?.lastChild?.textContent);
//       if (movie !== lastMovie(state)) {
//         if (movie) {
//           state = addMovie(state, movie);
//           // dumb nesting to satisfy ts while hacking
//           handleNewBoardMovie(movie);
//         }
//       }
//     }
//   });

//   observer.observe(document.body, {
//     childList: true,
//     subtree: true,
//   });
// });
