type BattleMovie = {
  name: string;
  year: string;
};

type Battle = {
  movies: BattleMovie[];
  links: Record<string, number>;
  usedMovieIds: string[];
};

type Movie = {
  id: string;
  original_language: string;
  popularity: number;
  release_date: string;
  title: string;
  year: string;
};
type Person = {
  id: string;
  name: string;
  popularity: number;
};

export type { BattleMovie, Battle, Movie, Person };
