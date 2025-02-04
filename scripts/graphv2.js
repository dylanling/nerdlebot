#!/usr/bin/env node

const fs = require("fs-extra");
const { readFile } = require("fs/promises");
const _ = require("lodash");
const { program } = require("commander");
const MiniSearch = require("minisearch");

program
  .option("-d, --debug", "debug")
  .option("-r, --raw", "should build raw graph")
  .option("-t, --title <string>", "movie name")
  .option("-y, --year <string>", "movie year");

program.parse(process.argv);

const options = program.opts();

const GENRES = {
  12: "Adventure",
  14: "Fantasy",
  16: "Animation",
  18: "Drama",
  27: "Horror",
  28: "Action",
  35: "Comedy",
  36: "History",
  37: "Western",
  53: "Thriller",
  80: "Crime",
  99: "Documentary",
  878: "Science Fiction",
  9648: "Mystery",
  10402: "Music",
  10749: "Romance",
  10751: "Family",
  10752: "War",
  10770: "TV Movie",
};

const IGNORED_GENRES = [99, 10770];

const TARANTINO = "138";
const DJANGO_UNCHAINED = "68718";
const TARANTINO_FILE = `${TARANTINO}_movie_credits.json`;
const DJANGO_UNCHAINED_FILE = `${DJANGO_UNCHAINED}_credits.json`;

const MOVIE_API_RESPONSES_DIRECTORY = "./static/movie";
const PERSON_API_RESPONSES_DIRECTORY = "./static/person";
const RAW_GRAPH_OUTPUT_FILE = "./static/graphv2.json";
const CREDITS_GRAPH_OUTPUT_FILE = "./static/creditsGraph.json";
const SCORES_GRAPH_OUTPUT_FILE = "./static/scoresGraph.json";
const FINAL_GRAPH_OUTPUT_FILE = "./static/graph.json";

const MIN_VOTE_CUTOFF = 25;
const SCORE_ORDER_PENALTY_CUTOFF_INDEX = 5;
const POPULAR_PERSON_CUTOFF = 6;
const POPULAR_FC_PERSON_CUTOFF = 2;
const POPULAR_MOVIE_CUTOFF = 6;
const KILLSHOT_MOVIE_CUTOFF = 5;
const OTHER_MOVIE_CUTOFF = 4;
// need to read from file on every chain

async function buildRawGraph() {
  console.time("buildRawGraph");

  if (!options.raw) {
    return readFile(RAW_GRAPH_OUTPUT_FILE, "utf8").then((data) => {
      const graph = JSON.parse(data);
      console.timeEnd("buildRawGraph");
      return graph;
    });
  }

  const movies = {};
  const people = {};
  const movieCredits = {};
  const peopleCredits = {};
  const partialMovieCredits = {};
  const partialPeopleCredits = {};

  const movieFiles = options.debug
    ? [DJANGO_UNCHAINED_FILE]
    : fs.readdirSync(MOVIE_API_RESPONSES_DIRECTORY);
  const personFiles = options.debug
    ? [TARANTINO_FILE]
    : fs.readdirSync(PERSON_API_RESPONSES_DIRECTORY);

  // For now only director
  const isValidCrew = (credit) => credit?.job === "Director";

  const isValidMovie = (movie) =>
    movie.release_date && _.isEmpty(_.intersection(movie?.genre_ids || [], IGNORED_GENRES));

  const getIdFromFilename = (f) => f.split("_")[0];
  const getId = (credit) => credit?.id?.toString();
  const getMovieInfo = (movie) => {
    return {
      id: getId(movie),
      lang: movie.original_language,
      title: movie.title,
      pop: movie.popularity,
      votes: movie.vote_count,
      genres: movie.genre_ids || [],
      year: (movie.release_date || "n/a").split("-")[0],
    };
  };

  const getPersonInfo = (person) => {
    return {
      id: getId(person),
      name: person.name,
      pop: person.popularity,
      score: person.score || 0,
      lang: person.lang || "en",
    };
  };

  const getCast = (data) => _.get(data, "cast") || [];
  const getCrew = (data) => (_.get(data, "crew") || []).filter(isValidCrew);

  const addMovieData = (movieId, data) => {
    const cast = _.sortBy(getCast(data), (person) => person?.order);
    const crew = getCrew(data);
    [...cast, ...crew].forEach((person) => {
      const personId = getId(person);
      if (!_.hasIn(people, personId)) _.set(people, personId, getPersonInfo(person));
      if (!_.hasIn(partialPeopleCredits, personId)) _.set(partialPeopleCredits, personId, {});
      _.set(partialPeopleCredits, [personId, movieId], person.order || -1);
    });
    _.set(movieCredits, movieId, { cast: cast.map(getId), crew: crew.map(getId) });
  };

  const addPersonData = (personId, data) => {
    const cast = getCast(data).filter(isValidMovie);
    const crew = getCrew(data);
    [...cast, ...crew].forEach((movie) => {
      const movieId = getId(movie);
      if (!_.hasIn(movies, movieId)) _.set(movies, movieId, getMovieInfo(movie));
      if (!_.hasIn(partialMovieCredits, movieId)) _.set(partialMovieCredits, movieId, {});
      _.set(partialMovieCredits, [movieId, personId], movie.order || -1);
    });
    _.set(peopleCredits, personId, { cast: cast.map(getId), crew: crew.map(getId) });
  };

  async function handleFile(dir, filename, handler) {
    const data = await fs.promises.readFile(`${dir}/${filename}`, "utf-8");
    handler(getIdFromFilename(filename), JSON.parse(data));
  }

  const movieOperations = movieFiles.map((f) =>
    handleFile(MOVIE_API_RESPONSES_DIRECTORY, f, addMovieData),
  );

  const personOperations = personFiles.map((f) =>
    handleFile(PERSON_API_RESPONSES_DIRECTORY, f, addPersonData),
  );

  await Promise.all(movieOperations);
  await Promise.all(personOperations);

  const graph = {
    movies: movies,
    people: people,
    movieCredits: movieCredits,
    peopleCredits: peopleCredits,
    // partialMovieCredits: partialMovieCredits,
    // partialPeopleCredits: partialPeopleCredits,
  };
  if (options.debug) {
    console.log(JSON.stringify(graph, null, 2));
  } else {
    fs.writeFileSync(RAW_GRAPH_OUTPUT_FILE, JSON.stringify(graph));
  }
  console.timeEnd("buildRawGraph");
  return graph;
}

const DEFAULT_CREDITS = {
  cast: [],
  crew: [],
};

const partialCredits = (id, partial) => {
  if (!_.hasIn(partial, id)) {
    return {
      cast: [],
      crew: [],
    };
  }
  const crew = _.toPairs(_.get(partial, id))
    .filter((pair) => pair[1] == -1)
    .map((pair) => pair[0]);
  const cast = _.sortBy(
    _.toPairs(_.get(partial, id)).filter((pair) => pair[1] != -1),
    (pair) => pair[1],
  ).map((pair) => pair[0]);

  return {
    cast: cast,
    crew: crew,
  };
};

const annotateCredits = (graph) => {
  console.time("annotateCredits");
  if (!options.credits) {
    return readFile(CREDITS_GRAPH_OUTPUT_FILE, "utf8").then((data) => {
      const graph = JSON.parse(data);
      console.timeEnd("annotateCredits");
      return graph;
    });
  }
  _.values(graph.movies).forEach((movie) => {
    if (!_.hasIn(graph.movieCredits, movie.id)) {
      _.set(graph, ["movieCredits", movie.id], partialCredits(movie.id, graph.partialMovieCredits));
    }
  });
  _.values(graph.people).forEach((person) => {
    if (!_.hasIn(graph.peopleCredits, person.id)) {
      _.set(
        graph,
        ["peopleCredits", person.id],
        partialCredits(person.id, graph.partialPeopleCredits),
      );
    }
  });
  fs.writeFileSync(CREDITS_GRAPH_OUTPUT_FILE, JSON.stringify(graph));
  console.timeEnd("annotateCredits");
  return graph;
};

const movieVotesForPersonScore = (movie) =>
  movie.genres && movie.votes
    ? _.includes(movie.genres, 16)
      ? Math.round(movie.votes / 8)
      : movie.votes
    : 0;

const personScore = (personId, graph) => {
  const { cast, crew } = _.get(graph.peopleCredits, personId, DEFAULT_CREDITS);
  const crewScores = crew.map((movieId) =>
    movieVotesForPersonScore(_.get(graph.movies, movieId, {})),
  );
  const castScores = cast.map((movieId) => {
    const { cast } = _.get(graph.movieCredits, movieId, DEFAULT_CREDITS);
    const i = _.indexOf(cast, personId);
    const votes = movieVotesForPersonScore(_.get(graph.movies, movieId, {}));
    if (i < 0) return 0;
    return i < SCORE_ORDER_PENALTY_CUTOFF_INDEX ? votes : Math.round(votes / i);
  });
  return _.sum([...crewScores, ...castScores]);
};

const primaryLanguage = (personId, graph) => {
  const { cast, crew } = _.get(graph.peopleCredits, personId, DEFAULT_CREDITS);
  const langs = [...crew, ...cast]
    .map((movieId) => _.get(graph.movies, movieId, {}))
    .map((movie) => _.get(movie, "lang", "en"));
  return _.head(_(langs).countBy().entries().maxBy(_.last)) || "en";
};

const annotateScores = (graph) => {
  console.time("annotateScores");
  if (!options.score) {
    return readFile(SCORES_GRAPH_OUTPUT_FILE, "utf8").then((data) => {
      const graph = JSON.parse(data);
      console.timeEnd("annotateScores");
      return graph;
    });
  }
  _.values(graph.people)
    .map((person) => person.id)
    .forEach((personId) => {
      const score = personScore(personId, graph);
      const lang = primaryLanguage(personId, graph);
      _.set(graph, ["people", personId, "score"], score);
      _.set(graph, ["people", personId, "lang"], lang);
    });
  fs.writeFileSync(SCORES_GRAPH_OUTPUT_FILE, JSON.stringify(graph));
  console.timeEnd("annotateScores");
  return graph;
};

const buildGraph = (graph) => {
  console.time("buildGraph");
  // if (!options.annotate) {
  //   return readFile(FINAL_GRAPH_OUTPUT_FILE, "utf8").then((data) => {
  //     const graph = JSON.parse(data);
  //     console.timeEnd("buildGraph");
  //     return graph;
  //   });
  // }

  const optimizedGraph = {
    movies: graph.movies,
    people: graph.people,
  };

  fs.writeFileSync(FINAL_GRAPH_OUTPUT_FILE, JSON.stringify(optimizedGraph));
  console.timeEnd("buildGraph");
  return graph;
};

const buildIndex = (graph) => {
  console.time("buildIndex");
  const miniSearch = new MiniSearch({
    fields: ["title"],
    storeFields: ["id", "title", "year", "lang", "pop", "votes"],
  });

  miniSearch.addAll(_.values(graph.movies));
  console.timeEnd("buildIndex");
  return {
    graph: graph,
    index: miniSearch,
  };
};

const search = (graphAndIndex) => {
  console.time("search");
  const title = options.title;
  const year = options.year;
  if (!title) {
    console.timeEnd("search");
    return {};
  }

  const searchOptions = {};
  if (options.year) {
    searchOptions.filter = (result) => result.year === year;
  }
  const results = graphAndIndex.index.search(title, searchOptions);
  console.timeEnd("search");
  const result = _.isEmpty(results) ? {} : results[0];
  return {
    graph: graphAndIndex.graph,
    result: result,
  };
};

const handleSearch = (graphAndResult) => {
  const movieId = graphAndResult.result.id;
  const graph = graphAndResult.graph;
  const movie = _.get(graph.movies, movieId);
  const recs = _.get(graph.recommendations, movieId);
  console.log(JSON.stringify(movie, null, 2));
  console.log(JSON.stringify(recs, null, 2));
  return graph;
};

buildRawGraph();
//   .then(annotateCredits)
//   .then(annotateScores)
//   .then(buildGraph)
//   .then(buildIndex)
//   .then(search)
//   .then(handleSearch);
