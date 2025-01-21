import { getMovieCrewAndCast, getPersonsMovies } from "./graph";
import type { Battle, Movie, Person, SearchGraph, WinConCache } from "./types";

import keys from "lodash/keys";
import intersection from "lodash/intersection";
import intersectionBy from "lodash/intersectionBy";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import flatten from "lodash/flatten";
import includes from "lodash/includes";
import uniq from "lodash/uniq";
import take from "lodash/take";
import sortBy from "lodash/sortBy";
import reverse from "lodash/reverse";
import values from "lodash/values";
import has from "lodash/has";
import {
  CAST_SEARCH_LIMIT,
  EXTRA_RECOMMENDATION_LIMIT,
  MOVIE_SEARCH_LIMIT,
  RECOMMENDATION_LIMIT,
  SUB_CAST_SEARCH_LIMIT,
  SUB_MOVIE_SEARCH_LIMIT,
} from "./constants";

export const formatMovie = (movie: Movie) => `${movie?.title} (${movie?.year})`;

// export const formatRec = (movie: Movie, links: Person[]) =>
//   `${formatMovie(movie)} via ${links.map((p) => p.name).join(", ")}`;

// export const links = (source: Movie, target: Movie, graph: SearchGraph): Person[] => {
//   const sourcePeople = getMovieCrewAndCast(source, graph);
//   const targetPeople = getMovieCrewAndCast(target, graph);
//   return intersectionBy(sourcePeople, targetPeople, (p) => p.id);
// };

export const makeRecommendation = (
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

  // const winconMovies = uniq(flatten(winConPeople.map((id) => get(cache.people, id, [])))).filter(
  //   (m) => !includes(battle.usedMovieIds, m.id),
  // );

  // const topCastCrew = take(reverse(sortBy(crewAndCast, (p) => p.pop)), SUB_CAST_SEARCH_LIMIT);
  // const topRecs = uniq(
  //   flatten(
  //     topCastCrew.map((person) => take(getPersonsMovies(person, graph), SUB_MOVIE_SEARCH_LIMIT)),
  //   ),
  // );

  // const extraRecs = take(
  //   reverse(
  //     sortBy(
  //       uniq(
  //         flatten(
  //           take(crewAndCast, CAST_SEARCH_LIMIT).map((person) =>
  //             take(getPersonsMovies(person, graph), MOVIE_SEARCH_LIMIT),
  //           ),
  //         ),
  //       ),
  //       (m) => m.pop,
  //     ),
  //   ),
  //   EXTRA_RECOMMENDATION_LIMIT,
  // ).filter((m) => !includes(battle.usedMovieIds, m.id));

  // const recommendations = take([...topRecs, ...extraRecs], RECOMMENDATION_LIMIT);

  // console.log("Recommendations:");
  // recommendations.forEach((m) => {
  //   const via = links(movie, m, graph);
  //   console.log(`  ${formatRec(m, via)}`);
  // });

  // if (!isEmpty(winconMovies)) {
  //   console.log("Win condition movies:");
  //   winconMovies.forEach((m) => {
  //     const via = links(movie, m, graph);
  //     console.log(`  ${formatRec(m, via)}`);
  //   });
  // }
};
