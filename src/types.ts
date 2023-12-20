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
  lang: string;
  title: string;
  pop: number;
  votes: number;
  year: string;
};

type Person = {
  id: string;
  name: string;
  pop: number;
};

export type { BattleMovie, Battle, Movie, Person };
