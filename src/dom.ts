import * as O from "fp-ts/Option";

import type { BattleMovie } from "./types";

const BATTLE_BOARD_SELECTOR = ".battle-board-movies";
const BATTLE_MOVIE_SELECTOR = ".battle-board-movie";
const GAME_OVER_SELECTOR = ".battle-board-game-over";

const battleBoard = (): O.Option<Element> =>
  O.fromNullable(document.querySelector(BATTLE_BOARD_SELECTOR));

const toMovie = (nodeText: string): O.Option<BattleMovie> => {
  const parts = nodeText.split(" ");
  return parts.length < 2
    ? O.none
    : O.some({
        name: parts.slice(0, -1).join(" "),
        year: parts.slice(-1)[0].replace("(", "").replace(")", ""),
      });
};

const latestMovie = (board: Element) => {
  const a = O.fromNullable(board.querySelector(BATTLE_MOVIE_SELECTOR));
  const b = O.flatMap(a, (element) => O.fromNullable(element.lastChild));
  const c = O.flatMap(b, (element) =>
    element.nodeType === Node.TEXT_NODE ? O.fromNullable(element.textContent) : O.none,
  );
  return O.flatMap(c, toMovie);
};

const gameOver = (board: Element) => O.fromNullable(board.querySelector(GAME_OVER_SELECTOR));

export { battleBoard, latestMovie, gameOver };
