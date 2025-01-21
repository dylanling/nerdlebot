import type { MovieCredit, PersonCredit } from "./types";

export const CAST_SEARCH_LIMIT = 8;
export const MOVIE_SEARCH_LIMIT = 20;
export const SUB_MOVIE_SEARCH_LIMIT = 4;
export const SUB_CAST_SEARCH_LIMIT = 5;
export const RECOMMENDATION_LIMIT = 35;
export const EXTRA_RECOMMENDATION_LIMIT = 100;
export const QUEEN_LATIFAH = "15758";
export const UNKNOWN_MOVIE_CREDITS: MovieCredit = {
  cast: [],
  crew: [],
};

export const UNKNOWN_PERSON_CREDITS: PersonCredit = {
  cast: [],
  crew: [],
};
