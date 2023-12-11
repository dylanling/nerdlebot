import json
import re
import os
import time

from itertools import chain
from pygtrie import CharTrie
from pprint import pprint

MOVIE_INFO_KEYS = ["original_language", "popularity", "release_date", "title"]
PERSON_INFO_KEYS = ["name", "popularity"]


def find_directors(crew):
    return [
        {**item, "order": -1}
        for item in crew
        if item["department"] == "Directing" and item["job"] == "Director"
    ]


def parse_credits(credits, keys):
    if not credits:
        return []
    cast = credits["cast"]
    directors = find_directors(credits["crew"])
    return (
        {
            result.get("id"): {k: result.get(k) for k in keys}
            for result in directors + cast
            if result and "id" in result
        },
        {
            result.get("id"): result.get("order", -1)
            for result in directors + cast
            if result and "id" in result
        },
    )


def build_graph_from_cache():
    movies = {}
    people = {}
    movie_credits = {}
    people_credits = {}

    for filename in os.listdir("./person"):
        with open(f"./person/{filename}", "r") as f:
            person_id = filename.split("_")[0]
            data, credits = parse_credits(json.load(f), MOVIE_INFO_KEYS)
            movies.update(data)
            people_credits.setdefault(person_id, {}).update(credits)
            for movie_id, order in credits.items():
                movie_credits.setdefault(movie_id, {}).setdefault(person_id, order)

    for filename in os.listdir("./movie"):
        with open(f"./movie/{filename}", "r") as f:
            movie_id = filename.split("_")[0]
            data, credits = parse_credits(json.load(f), PERSON_INFO_KEYS)
            people.update(data)
            movie_credits.setdefault(movie_id, {}).update(credits)
            for person_id, order in credits.items():
                people_credits.setdefault(person_id, {}).setdefault(movie_id, order)

    return {
        "movies": movies,
        "people": people,
        "movie_credits": movie_credits,
        "people_credits": people_credits,
    }


def main():
    print("Constructing graph and writing to graph.json")
    start = time.time()
    graph = build_graph_from_cache()
    end = time.time()
    print(f"Constructed graph in {end - start}s")

    print("Writing graph to json file")
    start = time.time()
    with open("./graph_v2.json", "w") as f:
        json.dump(graph, f)
    end = time.time()
    print(f"Wrote graph file in {end - start}s")


if __name__ == "__main__":
    main()
