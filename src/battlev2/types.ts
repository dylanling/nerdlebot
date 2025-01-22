import type { Option } from "fp-ts/lib/Option";

export type BattleMovie = {
  name: string;
  year: string;
};

export type Battle = {
  movies: BattleMovie[];
  links: Record<string, number>;
  usedMovieIds: string[];
};

export type Movie = {
  id: string;
  lang: string;
  title: string;
  pop: number;
  votes: number;
  year: string;
  genres: number[];
};

export type Person = {
  id: string;
  name: string;
  pop: number;
};

// Who worked on this movie
export type MovieCredit = {
  cast: string[];
  crew: string[];
};

// What movies has this person worked on
export type PersonCredit = {
  cast: string[];
  crew: string[];
};

export type SearchGraph = {
  movies: Record<string, Movie>;
  people: Record<string, Person>;
  movieCredits: Record<string, MovieCredit>;
  peopleCredits: Record<string, PersonCredit>;
};

export type Genre =
  | "Adventure"
  | "Fantasy"
  | "Animation"
  | "Drama"
  | "Horror"
  | "Action"
  | "Comedy"
  | "History"
  | "Western"
  | "Thriller"
  | "Crime"
  | "Documentary"
  | "Science Fiction"
  | "Mystery"
  | "Music"
  | "Romance"
  | "Family"
  | "War"
  | "TV Movie";

export type Recommendation = {
  source: Movie;
  rec: Movie;
  link: Person;
};

export type WinConCache = {
  personId: string;
  movies: Record<string, Movie>;
  people: Record<string, Movie[]>;
};

export type WinCon = {
  genre: Option<Genre>;
  cache: Option<WinConCache>;
};

export type Recommendations = {
  nonWincon: Recommendation[];
  wincon: Recommendation[];
};
