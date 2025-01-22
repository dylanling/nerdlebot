import { getMovieCrewAndCast, getPersonsMovies } from "./graph";
import type {
  Battle,
  Genre,
  Movie,
  Person,
  Recommendation,
  Recommendations,
  SearchGraph,
  WinCon,
  WinConCache,
} from "./types";

import * as O from "fp-ts/Option";

import keys from "lodash/keys";
import keyBy from "lodash/keyBy";
import intersection from "lodash/intersection";
import intersectionBy from "lodash/intersectionBy";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import flatten from "lodash/flatten";
import includes from "lodash/includes";
import uniq from "lodash/uniq";
import uniqBy from "lodash/uniqBy";
import take from "lodash/take";
import sortBy from "lodash/sortBy";
import reverse from "lodash/reverse";
import values from "lodash/values";
import has from "lodash/has";
import reduce from "lodash/reduce";
import toPairs from "lodash/toPairs";
import chunk from "lodash/chunk";
import groupBy from "lodash/groupBy";
import {
  CAST_SEARCH_LIMIT,
  EXTRA_RECOMMENDATION_LIMIT,
  GENRE_IDS,
  MOVIE_SEARCH_LIMIT,
  RECOMMENDATION_LIMIT,
  SUB_CAST_SEARCH_LIMIT,
  SUB_MOVIE_SEARCH_LIMIT,
} from "./constants";
import { pipe } from "fp-ts/lib/function";
import { mapValues } from "lodash";

export const formatMovie = (movie?: Movie) => (movie ? `${movie.title} (${movie.year})` : "");

export const printRecommendations = (recs: Recommendations): void => {
  const { nonWincon, wincon } = recs;
  const nonWinconByPerson = groupBy(nonWincon, (r) => r.link.name);
  console.log("========= Non genre =========");
  console.log(
    toPairs(nonWinconByPerson)
      .map(([name, recs]) => {
        return [
          name,
          ...chunk(recs, 2).map(
            ([m1, m2]) => `    ${formatMovie(m1?.rec).padEnd(40)}${formatMovie(m2?.rec)}`,
          ),
        ].join("\n");
      })
      .join("\n"),
  );
  const winconByPerson = groupBy(wincon, (r) => r.link.name);
  console.log("========= Genre =========");
  console.log(
    toPairs(winconByPerson)
      .map(([name, recs]) => {
        return [
          name,
          ...chunk(recs, 2).map(
            ([m1, m2]) => `    ${formatMovie(m1?.rec).padEnd(40)}${formatMovie(m2?.rec)}`,
          ),
        ].join("\n");
      })
      .join("\n"),
  );
};

const defaultRecommendations = (
  battle: Battle,
  graph: SearchGraph,
  movie: Movie,
): Recommendations => {
  return {
    nonWincon: [],
    wincon: [],
  };
};

const recommendationsForGenre = (
  battle: Battle,
  graph: SearchGraph,
  movie: Movie,
  genre: Genre,
): Recommendations => {
  const crewAndCast = getMovieCrewAndCast(movie, graph);

  const moviesByPerson: Record<string, Movie[]> = mapValues(
    keyBy(crewAndCast, (p) => p.id),
    (p) => getPersonsMovies(p, graph),
  );

  const topBilled = take(crewAndCast, 3);
  const mostPopular = take(reverse(sortBy(crewAndCast, (p) => p.pop)), 8);
  const people: Record<string, Person> = keyBy(
    take(
      uniqBy([...topBilled, ...mostPopular], (p) => p.id),
      8,
    ),
    (p) => p.id,
  );

  const allRecommendations: Recommendations[] = values(people).map((p) => {
    const personMovies = reverse(
      sortBy(
        get(moviesByPerson, p.id).filter((m) => !includes(battle.usedMovieIds, m.id)),
        (m) => m.pop,
      ),
    );
    const genreMovies = take(
      personMovies.filter((m) => includes(m.genres, GENRE_IDS[genre])),
      6,
    );
    const nonGenreMovies = take(
      personMovies.filter((m) => !includes(m.genres, GENRE_IDS[genre])),
      6,
    );
    return {
      nonWincon: nonGenreMovies.map((m) => {
        return { source: movie, rec: m, link: p };
      }),
      wincon: genreMovies.map((m) => {
        return { source: movie, rec: m, link: p };
      }),
    };
  });

  return reduce(
    allRecommendations,
    (a: Recommendations, b: Recommendations) => {
      return {
        nonWincon: [...a.nonWincon, ...b.nonWincon],
        wincon: [...a.wincon, ...b.wincon],
      };
    },
    { nonWincon: [], wincon: [] },
  );
};

const recommendationsForTarget = (
  battle: Battle,
  graph: SearchGraph,
  movie: Movie,
  genre: Genre,
): Recommendations => {
  return {
    nonWincon: [],
    wincon: [],
  };
};

export const recommendations = (
  battle: Battle,
  graph: SearchGraph,
  movie: Movie,
  wincon: WinCon,
): Recommendations => {
  return pipe(
    wincon.genre,
    O.map((g) => recommendationsForGenre(battle, graph, movie, g)),
    O.getOrElse(() => defaultRecommendations(battle, graph, movie)),
  );
};

const makeRecommendation = (
  battle: Battle,
  graph: SearchGraph,
  cache: WinConCache,
  movie: Movie,
): void => {
  console.log(`Recommending for ${formatMovie(movie)}`);
  const crewAndCast = getMovieCrewAndCast(movie, graph).filter(
    (person) => person.id !== cache.personId,
  );

  const recs: Record<string, Movie[]> = {};
  const allMoviesByPerson: Record<string, Movie[]> = {};
  crewAndCast.forEach((person) => {
    allMoviesByPerson[person.id] = getPersonsMovies(person, graph);
  });

  const topPeople = reverse(sortBy(crewAndCast, (p) => p.pop));
  topPeople.forEach((person) => {
    if (uniq(flatten(values(recs))).length < RECOMMENDATION_LIMIT) {
      recs[person.id] = take(
        reverse(
          sortBy(
            get(allMoviesByPerson, person.id).filter((m) => !includes(battle.usedMovieIds, m.id)),
            (m) => m.pop,
          ),
        ),
        SUB_MOVIE_SEARCH_LIMIT,
      );
    }
  });
  console.log("\n\nRecommendations\n====================");
  keys(recs).forEach((pid) => {
    get(recs, pid).forEach((m) => {
      console.log(`  ${formatMovie(m)} via ${get(graph.people, pid).name}`);
    });
  });

  const winConPeople = intersection(
    crewAndCast.map((c) => c.id),
    keys(cache.people),
  ).map((pid) => get(graph.people, pid));
  console.log("\n\nWincons\n====================");
  winConPeople.forEach((person) => {
    const winconMovies = get(allMoviesByPerson, person.id).filter(
      (m) => has(cache.movies, m.id) && !includes(battle.usedMovieIds, m.id),
    );
    winconMovies.forEach((m) => {
      console.log(`  ${formatMovie(m)} via ${person.name}`);
    });
  });
};
