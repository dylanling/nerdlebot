import * as O from "fp-ts/Option";

import type { Battle, BattleMovie, Movie } from "./types";

import { head } from "fp-ts/Array";

const initialState: Battle = {
  movies: [],
  links: {},
  usedMovieIds: [],
};

const lastMovie = (battle: Battle): O.Option<BattleMovie> => {
  return head(battle.movies);
};

const addMovie = (battle: Battle, battleMovie: BattleMovie, movie: Movie): Battle => {
  return {
    ...battle,
    movies: [battleMovie, ...battle.movies],
    usedMovieIds: !!movie.id ? [movie.id, ...battle.usedMovieIds] : battle.usedMovieIds,
  };
};

export { initialState, lastMovie, addMovie };
