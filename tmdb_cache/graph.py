import json
import re
import os
import time

from itertools import chain
from pygtrie import CharTrie

movie_info_keys = [
    "id",
    "original_language",
    "original_title",
    "popularity",
    "release_date",
    "title",
]

person_info_keys = ["id", "name", "original_name", "popularity"]


def find_directors(crew):
    return [
        item
        for item in crew
        if item["department"] == "Directing" and item["job"] == "Director"
    ]


def parse_credits(credits):
    if not credits:
        return []
    cast = credits["cast"]
    directors = find_directors(credits["crew"])
    results = directors + cast
    return list(filter(lambda item: item, results))


def build_graph_from_cache():
    start = time.time()
    people = {}
    movies = {}
    for filename in os.listdir("./person"):
        with open(f"./person/{filename}", "r") as f:
            data = json.load(f)
            person_id = data["id"]
            if person_id not in people:
                people[person_id] = {}

            credits = parse_credits(data)
            people[person_id]["credits"] = {
                item["id"]: {"order": item.get("order", -1)} for item in credits
            }
            for movie in credits:
                movie_id = movie["id"]
                if movie_id not in movies:
                    movies[movie_id] = {}
                if "info" not in movies[movie_id]:
                    movies[movie_id]["info"] = {
                        k: movie.get(k, None) for k in movie_info_keys
                    }
                if "credits" not in movies[movie_id]:
                    movies[movie_id]["credits"] = {
                        person_id: {"order": movie.get("order", -1)}
                    }

    for filename in os.listdir("./movie"):
        with open(f"./movie/{filename}", "r") as f:
            data = json.load(f)
            movie_id = data["id"]
            if movie_id not in movies:
                movies["movie_id"] = {}

            credits = parse_credits(data)
            movies[movie_id]["credits"] = {
                item["id"]: {"order": item.get("order", -1)} for item in credits
            }
            # movies[movie_id]["credits"] = list(
            #     map(lambda m: dict({m["id"]: m.get("order", -1)}), credits)
            # )
            for person in credits:
                person_id = person["id"]
                if person_id not in people:
                    people[person_id] = {}
                if "info" not in people[person_id]:
                    people[person_id]["info"] = {
                        k: person.get(k, None) for k in person_info_keys
                    }
                if "credits" not in people[person_id]:
                    people[person_id]["credits"] = {
                        movie_id: {"order": person.get("order", -1)}
                    }

    end = time.time()
    print(f"Built graph from cached API calls in {end - start}s")
    return people, movies


def sanitize_title(title):
    if title is None:
        return "__unknown_title__"
    return re.sub(r"[^a-z0-9 ]+", "", title.lower())


def movie_titles(movies):
    names = {}
    for movie in movies.values():
        if "info" not in movie:
            continue
        info = movie["info"]
        release_year = (info.get("release_date") or "Unknown").split("-")[0]
        names.setdefault(sanitize_title(info.get("title")), {}).setdefault(
            release_year, []
        ).append(info.get("id", None))
    return names


def load_graph():
    start = time.time()
    graph = {}
    with open("./graph.json", "r") as f:
        graph = json.load(f)
    end = time.time()
    print(f"Loaded graph from json file in {end - start}s")
    return graph


def prefix_trie(graph):
    start = time.time()
    trie = CharTrie()
    for title in graph["movie_titles"]:
        trie[title] = graph["movie_titles"][title]
        for prefix in ["the ", "a ", "an "]:
            if title.startswith(prefix):
                trie[title.lstrip(prefix)] = graph["movie_titles"][title]

    end = time.time()
    print(f"Constructed search index from graph in {end - start}s")

    return trie


def release_year(release_date):
    if not release_date:
        return "n/a"
    return release_date.split("-")[0]


def search_by_title(graph, trie, title, year=None):
    prefix = re.sub(r"[^a-z0-9 ]+", "", title.lower())
    try:
        matches = trie.values(prefix)
        movie_ids = list(
            chain.from_iterable(
                chain.from_iterable([match.values() for match in matches])
            )
        )
        movies = [
            graph["movies"].get(str(movie_id), {}).get("info", {})
            for movie_id in movie_ids
        ]
        if year:
            movies = list(
                filter(
                    lambda movie: release_year(movie.get("release_date")) == str(year),
                    movies,
                )
            )
        return sorted(movies, key=lambda movie: -movie.get("popularity", 0))
    except:
        return None


def main():
    print("Constructing graph and writing to graph.json")
    people, movies = build_graph_from_cache()
    graph = {"people": people, "movies": movies, "movie_titles": movie_titles(movies)}
    with open("./graph.json", "w") as f:
        json.dump(graph, f)


if __name__ == "__main__":
    main()
