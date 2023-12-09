import * as O from "fp-ts/Option";

import { pipe } from "fp-ts/function";
import type { Movie } from "./types";

const BATTLE_BOARD_SELECTOR = ".battle-board-movies";
const BATTLE_MOVIE_SELECTOR = ".battle-board-movie";

const battleBoard = (): O.Option<Element> =>
  pipe(BATTLE_BOARD_SELECTOR, document.querySelector, O.fromNullable);

const toMovie = (nodeText: string): O.Option<Movie> => {
  const parts = nodeText.split(" ");
  return parts.length < 2
    ? O.none
    : O.some({
        name: parts.slice(0, -1).join(" "),
        year: parts.slice(-1)[0].replace("(", "").replace(")", ""),
      });
};

const latestMovie = (board: Element) =>
  pipe(
    BATTLE_MOVIE_SELECTOR,
    board.querySelector,
    O.fromNullable,
    O.flatMap((element) => O.fromNullable(element.lastChild)),
    O.flatMap((element) =>
      element.nodeType === Node.TEXT_NODE ? O.fromNullable(element.textContent) : O.none,
    ),
    O.flatMap(toMovie),
  );

export { battleBoard, latestMovie };
