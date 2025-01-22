import type { Genre, MovieCredit, PersonCredit } from "./types";

export const CAST_SEARCH_LIMIT = 8;
export const MOVIE_SEARCH_LIMIT = 20;
export const SUB_MOVIE_SEARCH_LIMIT = 4;
export const SUB_CAST_SEARCH_LIMIT = 5;
export const RECOMMENDATION_LIMIT = 35;
export const EXTRA_RECOMMENDATION_LIMIT = 100;
export const QUEEN_LATIFAH = "15758";
export const ZENDAYA = "505710";
export const FRANCES_MCDORMAND = "3910";
export const UNKNOWN_MOVIE_CREDITS: MovieCredit = {
  cast: [],
  crew: [],
};

export const UNKNOWN_PERSON_CREDITS: PersonCredit = {
  cast: [],
  crew: [],
};

export const GENRE_IDS: Record<Genre, number> = {
  Adventure: 12,
  Fantasy: 14,
  Animation: 16,
  Drama: 18,
  Horror: 27,
  Action: 28,
  Comedy: 35,
  History: 36,
  Western: 37,
  Thriller: 53,
  Crime: 80,
  Documentary: 99,
  "Science Fiction": 878,
  Mystery: 9648,
  Music: 10402,
  Romance: 10749,
  Family: 10751,
  War: 10752,
  "TV Movie": 10770,
};
