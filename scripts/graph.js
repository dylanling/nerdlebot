#!/usr/bin/env node

const fs = require("fs-extra");
const { readFile } = require("fs/promises");
const _ = require("lodash");
const { program } = require("commander");
const MiniSearch = require("minisearch");

program
  .option("-d, --debug", "debug")
  .option("-r, --raw", "should build raw graph")
  .option("-c, --credits", "should annotate credits")
  .option("-s, --score", "should annotate scores")
  .option("-a, --annotate", "should do full annotation with recommendations")
  .option("-t, --title <string>", "movie name")
  .option("-y, --year <string>", "movie year");

program.parse(process.argv);

const options = program.opts();

/**

const fs = require("fs-extra");
const { readFile } = require("fs/promises");
const _ = require("lodash");
const { program } = require("commander");
const MiniSearch = require("minisearch");
var graph = await readFile("./static/graphv2.json", "utf8").then(JSON.parse);

 */

const IGNORED_GENRES = [99, 10770];

const TARANTINO = "138";
const DJANGO_UNCHAINED = "68718";
const TARANTINO_FILE = `${TARANTINO}_movie_credits.json`;
const DJANGO_UNCHAINED_FILE = `${DJANGO_UNCHAINED}_credits.json`;

const MOVIE_API_RESPONSES_DIRECTORY = "./static/movie";
const PERSON_API_RESPONSES_DIRECTORY = "./static/person";
const RAW_GRAPH_OUTPUT_FILE = "./static/rawGraph.json";
const RAW_GRAPH_V2_OUTPUT_FILE = "./static/graphv2.json";
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

async function buildGraph() {
  console.time("buildGraph");

  if (!options.raw) {
    return readFile(RAW_GRAPH_OUTPUT_FILE, "utf8").then((data) => {
      const graph = JSON.parse(data);
      console.timeEnd("buildGraph");
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
    partialMovieCredits: partialMovieCredits,
    partialPeopleCredits: partialPeopleCredits,
    recommendations: {},
  };
  if (options.debug) {
    console.log(JSON.stringify(graph, null, 2));
  } else {
    fs.writeFileSync(RAW_GRAPH_OUTPUT_FILE, JSON.stringify(graph));
    fs.writeFileSync(RAW_GRAPH_V2_OUTPUT_FILE, JSON.stringify(graph));
  }
  console.timeEnd("buildGraph");
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

const scoreWithout = (person, movie, graph) => {
  const { cast, crew } = _.get(graph.movieCredits, movie.id, DEFAULT_CREDITS);
  const scores = [...cast, ...crew].map((personId) => _.get(graph.people, personId, {}).score || 0);
  return _.sum(scores) - person.score;
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

const killshots = (person, movies, graph) => {
  return _.sortBy(movies, (movie) => scoreWithout(person, movie, graph));
};

const personRecommendations = (person, graph) => {
  const { cast, crew } = _.get(graph.peopleCredits, person.id, DEFAULT_CREDITS);
  const movies = [...cast, ...crew]
    .map((movieId) => _.get(graph.movies, movieId, {}))
    .filter((movie) => (movie.votes || 0) >= MIN_VOTE_CUTOFF);
  const popular = _.sortBy(movies, (movie) => (movie.votes || 0) * -1);
  const top = popular.slice(0, POPULAR_MOVIE_CUTOFF).map((movie) => movie.id);
  const other = popular
    .filter(
      (movie) => !_.includes(top, movie.id) && (movie.lang != "en" || _.includes(movie.genres, 16)),
    )
    .slice(0, OTHER_MOVIE_CUTOFF)
    .map((movie) => movie.id);
  const ks = killshots(person, movies, graph)
    .slice(0, KILLSHOT_MOVIE_CUTOFF)
    .map((movie) => movie.id);
  return {
    id: person.id,
    top: top,
    ks: ks,
    other: other,
  };
};

const recommendations = (movie, graph) => {
  const { cast, crew } = _.get(graph.movieCredits, movie.id, DEFAULT_CREDITS);
  const sorted = _.sortBy(
    cast.map((personId) => _.get(graph.people, personId, {})),
    (person) => person.score * -1,
  );
  const crewPeople = crew
    .map((personId) => _.get(graph.people, personId, {}))
    .map((person) => personRecommendations(person, graph));
  const top = sorted
    .slice(0, POPULAR_PERSON_CUTOFF)
    .map((person) => personRecommendations(person, graph));
  const fc = sorted
    .filter((person) => person.lang != "en")
    .slice(0, POPULAR_FC_PERSON_CUTOFF)
    .map((person) => personRecommendations(person, graph));
  return {
    crew: crewPeople,
    top: top,
    fc: fc,
  };
};

const annotateRecs = (graph) => {
  console.time("annotateRecs");
  if (!options.annotate) {
    return readFile(FINAL_GRAPH_OUTPUT_FILE, "utf8").then((data) => {
      const graph = JSON.parse(data);
      console.timeEnd("annotateRecs");
      return graph;
    });
  }

  _.values(graph.movies).forEach((movie) => {
    const recs = recommendations(movie, graph);
    _.set(graph, ["recommendations", movie.id], recs);
  });

  const optimizedGraph = {
    movies: graph.movies,
    people: graph.people,
    recommendations: graph.recommendations,
  };
  fs.writeFileSync(FINAL_GRAPH_OUTPUT_FILE, JSON.stringify(optimizedGraph));
  console.timeEnd("annotateRecs");
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

buildGraph()
  .then(annotateCredits)
  .then(annotateScores)
  .then(annotateRecs)
  .then(buildIndex)
  .then(search)
  .then(handleSearch);
