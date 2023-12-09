import * as O from "fp-ts/Option";
import { pipe } from "fp-ts/function";
import { head } from "fp-ts/Array";
const initialState = {
    movies: [],
    links: {},
};
const lastMovie = (battle) => {
    return head(battle.movies);
};
const addMovie = (battle, movie) => {
    return Object.assign(Object.assign({}, battle), { movies: [movie, ...battle.movies] });
};
const addMaybeMovie = (battle) => (movie) => pipe(movie, O.map((m) => addMovie(battle, m)), O.getOrElse(() => battle));
export { initialState, lastMovie, addMaybeMovie };
//# sourceMappingURL=battle.js.map