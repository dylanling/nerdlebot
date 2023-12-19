import Fuse from "fuse.js";
import get from "lodash/get";
import keys from "lodash/keys";
import values from "lodash/values";
import sortBy from "lodash/sortBy";
import type { Battle, BattleMovie, Movie, Person } from "./types";

const MOVIE_PERSON_WIDTH = 7;
const PERSON_MOVIE_WIDTH = 6;

export type Graph = {
  movies: Record<string, Movie>;
  people: Record<string, Person>;
  movie_credits: Record<string, Record<string, number>>;
  people_credits: Record<string, Record<string, number>>;
};

type Credit = {
  id: string;
  order: number;
};

export type Result = {
  person: Person;
  movies: Movie[];
};

export const makeGraph = (url: string): Promise<Graph> => {
  return fetch(url).then<Graph>((response) => response.json());
};

const score = (mPop: number, pPop: number, order: number): number => {
  const billingOrder = order === -1 ? 0.5 : order === 0 ? 0.7 : order;
  return (5.0 * pPop + 3.0 * mPop) / (billingOrder + 2.0);
};

const year = (movie: Movie) => movie.release_date.split("-")[0];

export const formatResult = (result: Result): string => {
  const movies = result.movies.map((movie) => `\t${movie.title} (${year(movie)})`).join("\n");
  return `via ${result.person.name}:\n${movies}`;
};

export const recommendations = (battle: Battle, movie: Movie, graph: Graph): Result[] => {
  const peopleIds = get(graph.movie_credits, movie.id);
  const movieCredits: Credit[] = keys(peopleIds).map((id) => {
    return { id: id, order: get(peopleIds, id) };
  });
  const people = movieCredits.map((credit) => {
    return { ...get(graph.people, credit.id), order: credit.order };
  });
  const sortedPeople = sortBy(
    people,
    (person) => -1 * score(movie.popularity, person.popularity, person.order),
  ).slice(0, MOVIE_PERSON_WIDTH);

  return sortedPeople.map((person) => {
    const movieIds = get(graph.people_credits, person.id);
    const peopleCredits: Credit[] = keys(movieIds).map((id) => {
      return { id: id, order: get(movieIds, id) };
    });
    const movies = peopleCredits
      .map((credit) => {
        return { ...get(graph.movies, credit.id), order: credit.order };
      })
      .filter((m) => !battle.usedMovieIds.includes(m.id));
    const sortedMovies = sortBy(
      movies,
      (movie) => -1 * score(movie.popularity, person.popularity, movie.order),
    ).slice(0, PERSON_MOVIE_WIDTH);
    return { person: person, movies: sortedMovies };
  });
};

export const makeFuse = (indexUrl: string, graph: Graph): Promise<Fuse<Movie>> => {
  const options = { keys: ["title", "year"] };
  const movies = values(graph.movies).map((movie) => {
    return { ...movie, year: movie.release_date ? movie.release_date.split("-")[0] : "n/a" };
  });
  return fetch(indexUrl)
    .then((response) => response.json())
    .then((index) => Fuse.parseIndex(index))
    .then((index) => new Fuse<Movie>(movies, options, index));
};

export const search = (fuse: Fuse<Movie>, battleMovie: BattleMovie) => {
  const results = fuse.search(
    { $and: [{ year: battleMovie.year }, { title: battleMovie.name }] },
    { limit: 1 },
  );
  return results[0].item;
};
