import MiniSearch from "minisearch";
import get from "lodash/get";
import values from "lodash/values";
import type { Battle, BattleMovie, Movie, Person } from "./types";

export type MovieRecommendation = {
  id: string;
  top: string[];
  ks: string[];
  other: string[];
};

export type Recommendation = {
  crew: MovieRecommendation[];
  top: MovieRecommendation[];
  fc: MovieRecommendation[];
};

export type Graph = {
  movies: Record<string, Movie>;
  people: Record<string, Person>;
  recommendations: Record<string, Recommendation>;
};

const emptyRec: Recommendation = {
  crew: [],
  top: [],
  fc: [],
};

export const makeGraph = (url: string): Promise<Graph> => {
  return fetch(url).then<Graph>((response) => response.json());
};

const formatMovie = (movie: Movie): string => `${movie?.title} (${movie?.year})`;

const hydrateRecommendation = (rec: Recommendation, graph: Graph): Recommendation => {
  const getMovie = (movieId: string) => formatMovie(get(graph.movies, movieId));
  const hydrate = (movieRec: MovieRecommendation): MovieRecommendation => {
    return {
      id: get(graph.people, movieRec.id)?.name || "Unknown",
      top: movieRec.top.map(getMovie),
      ks: movieRec.ks.map(getMovie),
      other: movieRec.other.map(getMovie),
    };
  };
  return {
    crew: rec.crew.map(hydrate),
    top: rec.top.map(hydrate),
    fc: rec.fc.map(hydrate),
  };
};

const formatMovieRec = (rec: MovieRecommendation): string => {
  const top = rec.top.map((s) => `\t${s}`).join("\n");
  const ks = rec.ks.map((s) => `\t${s}`).join("\n");
  const other = rec.other.map((s) => `\t${s}`).join("\n");
  const titles = [top, ks, other].filter((s) => s && s != "").join("\n\t-----\n");
  return [`via ${rec.id}`, titles].join("\n");
};
export const formatRec = (rec: Recommendation): string => {
  const movieRecs = [
    ...values(rec.fc).reverse(),
    ...values(rec.top).reverse(),
    ...values(rec.crew).reverse(),
  ];
  return movieRecs.map(formatMovieRec).join("\n");
};

export const recommendations = (battle: Battle, movie: Movie, graph: Graph): Recommendation =>
  hydrateRecommendation(get(graph.recommendations, movie.id, emptyRec), graph);

export const makeIndex = (graph: Graph): MiniSearch<Movie> => {
  const miniSearch = new MiniSearch<Movie>({
    fields: ["title"],
    storeFields: ["id", "title", "year", "lang", "pop", "votes"],
  });

  miniSearch.addAll(values(graph.movies));
  return miniSearch;
};

export const search = (index: MiniSearch<Movie>, battleMovie: BattleMovie): Movie => {
  const searchOptions = {
    filter: (result: any) => (battleMovie.year ? result.year === battleMovie.year : true),
  };

  return index.search(battleMovie.name, searchOptions)[0] as unknown as Movie;
};
