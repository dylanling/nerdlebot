import * as O from "fp-ts/Option";

import { pipe } from "fp-ts/function";
import type { Movie, Battle } from "./types";

import { head } from "fp-ts/Array";

const initialState: Battle = {
  movies: [],
  links: {},
};

const lastMovie = (battle: Battle): O.Option<Movie> => {
  return head(battle.movies);
};

const addMovie = (battle: Battle, movie: Movie): Battle => {
  return { ...battle, movies: [movie, ...battle.movies] };
};

const addMaybeMovie =
  (battle: Battle) =>
  (movie: O.Option<Movie>): Battle =>
    pipe(
      movie,
      O.map((m) => addMovie(battle, m)),
      O.getOrElse(() => battle),
    );

export { initialState, lastMovie, addMaybeMovie };
