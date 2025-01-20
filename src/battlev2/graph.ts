import MiniSearch from "minisearch";
import values from "lodash/values";
import get from "lodash/get";
import take from "lodash/take";
import sortBy from "lodash/sortBy";
import reverse from "lodash/reverse";
import groupBy from "lodash/groupBy";
import mapValues from "lodash/mapValues";
import first from "lodash/first";
import flatten from "lodash/flatten";
import has from "lodash/has";
import set from "lodash/set";
import uniq from "lodash/uniq";

import type { BattleMovie, Movie, Person, SearchGraph, WinConCache } from "./types";

import {
  CAST_SEARCH_LIMIT,
  QUEEN_LATIFAH,
  UNKNOWN_MOVIE_CREDITS,
  UNKNOWN_PERSON_CREDITS,
} from "./constants";

export const makeGraph = (url: string): Promise<SearchGraph> => {
  return fetch(url).then<SearchGraph>((response) => response.json());
};

export const makeIndex = (graph: SearchGraph): MiniSearch<Movie> => {
  console.log("Building index from graph");
  const miniSearch = new MiniSearch<Movie>({
    fields: ["title"],
    storeFields: ["id", "title", "year", "lang", "pop", "votes"],
  });

  miniSearch.addAll(values(graph.movies));
  console.log("Built index from graph");
  return miniSearch;
};

export const searchForBattleMovie = (index: MiniSearch<Movie>, battleMovie: BattleMovie): Movie => {
  const searchOptions = {
    filter: (result: any) => (battleMovie.year ? result.year === battleMovie.year : true),
  };

  return index.search(battleMovie.name, searchOptions)[0] as unknown as Movie;
};

export const getMovieCrewAndCast = (movie: Movie, graph: SearchGraph): Person[] => {
  const movieCredits = get(graph.movieCredits, movie.id, UNKNOWN_MOVIE_CREDITS);
  const crew: Person[] = movieCredits.crew.map((id) => get(graph.people, id)).filter((p) => !!p);
  const cast: Person[] = movieCredits.cast.map((id) => get(graph.people, id)).filter((p) => !!p);
  return [...crew, ...cast];
};

export const getPersonsMovies = (person: Person, graph: SearchGraph): Movie[] => {
  const credits = get(graph.peopleCredits, person.id, UNKNOWN_PERSON_CREDITS);
  const crew: Movie[] = credits.crew.map((id) => get(graph.movies, id)).filter((m) => !!m);
  const cast: Movie[] = credits.cast.map((id) => get(graph.movies, id)).filter((m) => !!m);
  return reverse(sortBy([...crew, ...cast], (m) => m.pop));
};

export const latifahCache = (graph: SearchGraph): WinConCache => {
  console.log("Constructing cache for Queen Latifah");
  const latifah = get(graph.people, QUEEN_LATIFAH);
  const movies = mapValues(
    groupBy(getPersonsMovies(latifah, graph), (m) => m.id),
    first,
  ) as Record<string, Movie>;

  const people: Record<string, Movie[]> = {};

  values(movies).forEach((movie) => {
    const crewAndCast = getMovieCrewAndCast(movie, graph);
    crewAndCast.forEach((person) => {
      const latifahMovies = get(people, person.id) || [];
      set(people, person.id, uniq([...latifahMovies, movie]));
    });
  });

  console.log("Finished constructing cache for Queen Latifah");
  return {
    personId: QUEEN_LATIFAH,
    movies: movies,
    people: people,
  };
};
