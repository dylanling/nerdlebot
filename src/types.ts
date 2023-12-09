type Movie = {
  name: string;
  year: string;
};

type Battle = {
  movies: Movie[];
  links: Record<string, number>;
};

export type { Movie, Battle };
