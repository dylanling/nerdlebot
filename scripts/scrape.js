#!/usr/bin/env node

const fs = require("fs-extra");
const { readFile, writeFile } = require("fs/promises");
const _ = require("lodash");
const fetch = require("node-fetch");
const { RateLimit } = require("async-sema");
const { program } = require("commander");

require("dotenv").config();

program
  .option("-d, --depth <number>", "crawl depth", parseInt)
  .option("-m, --movie <string>", "movie id")
  .option("-p, --person <string>", "person id");

program.parse(process.argv);

const options = program.opts();

const API_URL = "https://api.themoviedb.org/3";
const HEADERS = {
  accept: "application/json",
  Authorization: `Bearer ${process.env.TMBD_API_TOKEN}`,
};
const MOVIE_API_RESPONSES_DIRECTORY = "./static/movie";
const PERSON_API_RESPONSES_DIRECTORY = "./static/person";

const CACHED_API_RESPONSES = new Set([
  ...fs.readdirSync(MOVIE_API_RESPONSES_DIRECTORY),
  ...fs.readdirSync(PERSON_API_RESPONSES_DIRECTORY),
]);

const throttle = RateLimit(3);

const readFromCache = (directory, filename) =>
  readFile(`${directory}/${filename}`, "utf8").then((data) => JSON.parse(data));

const writeToCache = (data, directory, filename) =>
  writeFile(`${directory}/${filename}`, JSON.stringify(data), "utf8").then((_) => {
    CACHED_API_RESPONSES.add(filename);
    return data;
  });

async function fetchAndCache(urlKey, directory, filename) {
  if (CACHED_API_RESPONSES.has(filename)) {
    console.log(`HIT for ${filename}`);
    return readFromCache(directory, filename);
  }
  await throttle();
  if (CACHED_API_RESPONSES.has(filename)) {
    console.log(`HIT for ${filename}`);
    return readFromCache(directory, filename);
  }
  console.log(`MISS for ${filename}, fetching from API`);
  return fetch(`${API_URL}/${urlKey}`, {
    method: "GET",
    headers: HEADERS,
    timeout: 3000,
  })
    .then((response) => {
      if (response.ok) return response.json();
      else {
        return response.json().then((data) => {
          throw _.get(data, "status_message", "Unknown error");
        });
      }
    })
    .then((data) => writeToCache(data, directory, filename))
    .catch((e) => console.log(`Error fetching ${urlKey}: ${e}`));
}

const movieCredits = (movieId) =>
  fetchAndCache(
    `movie/${movieId}/credits`,
    MOVIE_API_RESPONSES_DIRECTORY,
    `${movieId}_credits.json`,
  );

const personCredits = (personId) =>
  fetchAndCache(
    `person/${personId}/movie_credits`,
    PERSON_API_RESPONSES_DIRECTORY,
    `${personId}_movie_credits.json`,
  );

const principals = (credits) => [
  ..._.get(credits, "crew", []).filter((credit) => _.get(credit, "job") === "Director"),
  ..._.get(credits, "cast", []),
];

const scrape = (movieId = null, personId = null, depth = 1) => {
  if (depth < 1 || (!movieId && !personId)) return;
  if (movieId) {
    movieCredits(movieId)
      .then(principals)
      .then((people) => people.map((person) => person.id))
      .then((personIds) => personIds.forEach((personId) => scrape(null, personId, depth - 1)));
  } else if (personId) {
    personCredits(personId)
      .then(principals)
      .then((movies) => movies.map((movie) => movie.id))
      .then((movieIds) => movieIds.forEach((movieId) => scrape(movieId, null, depth - 1)));
  }
};

const depth = Math.min(options.depth, 4);
console.log(
  `Crawling ${
    options.movie ? `Movie ${options.movie}` : `Person ${options.person}`
  } to depth ${depth}`,
);
scrape(options.movie, options.person, Math.min(options.depth, 4) || 1);
