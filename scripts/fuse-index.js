const { readFileSync, writeFileSync } = require("fs");
const _ = require("lodash");
const Fuse = require("fuse.js");

console.log("Building Fuse index and serializing to static/fuseIndex.json");

const graph = JSON.parse(readFileSync("static/graph.json"));
const movies = _.values(graph.movies).map((movie) => {
  return {
    ...movie,
    id: movie.id.toString(),
    year: movie.release_date ? movie.release_date.split("-")[0] : "n/a",
  };
});

const index = Fuse.createIndex(["title", "year"], movies);
// Serialize and save it
writeFileSync("./static/fuseIndex.json", JSON.stringify(index.toJSON()));
