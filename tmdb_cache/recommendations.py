import re
import time

from graph import load_graph
from pick import pick
from pprint import pprint
from pygtrie import CharTrie


def sanitize_title_for_trie(title):
    if title is None:
        return "__unknown_title__"
    return re.sub(r"[^a-z0-9 ]+", "", title.lower())


def prefix_trie(graph):
    start = time.time()
    trie = CharTrie()
    for movie in graph["movies"].values():
        title = sanitize_title_for_trie(movie.get("title"))
        annotated_movie = {**movie, "item_type": "movie"}
        trie[title] = annotated_movie
        for prefix in ["the ", "a ", "an "]:
            if title.startswith(prefix):
                trie[title.lstrip(prefix)] = annotated_movie

    for person in graph["people"].values():
        name = sanitize_title_for_trie(person.get("name"))
        trie[name] = {**person, "item_type": "person"}

    end = time.time()
    print(f"Constructed search index from graph in {end - start}s")

    return trie


def release_year(movie):
    return movie.get("release_date", "Unknown").split("-")[0]


def score(person_popularity, movie_popularity, billing_order):
    if billing_order == -1:
        billing_order = 0.5
    elif billing_order == 0:
        billing_order = 0.7
    return ((5 * person_popularity) + (3 * movie_popularity)) / (billing_order + 2)


def search(prefix, trie):
    prefix = re.sub(r"[^a-z0-9 ]+", "", prefix.lower())
    try:
        matches = trie.values(prefix)
    except:
        matches = []

    return sorted(matches, key=lambda item: -item.get("popularity", 0))


def format_movie(movie, with_id=False):
    title = movie.get("title", "???")
    year = release_year(movie)
    movie_id = movie.get("id", "?")
    movie_id_debug = f", id: {movie_id}" if with_id else ""
    return f"{title} - ({year}){movie_id_debug}"


def format_person(person, with_id=False):
    name = person.get("name", "???")
    person_id = person.get("id", "?")
    debug = f", id: {person_id}" if with_id else ""
    return f"{name}{debug}"


def format(item, with_id=True):
    if item.get("item_type") == "person":
        return format_person(item, with_id=with_id)
    elif item.get("item_type") == "movie":
        return format_movie(item, with_id=with_id)
    return "Unknown item"


def person_recommendations(graph, movie, limit=None):
    people_ids = [
        k
        for k, _ in sorted(
            graph["movie_credits"].get(str(movie["id"]), {}).items(),
            key=lambda item: -score(
                graph["people"].get(item[0], {}).get("popularity", 0),
                movie.get("popularity"),
                item[1],
            ),
        )
    ]
    if limit:
        people_ids = people_ids[:limit]
    return [graph["people"][person_id] for person_id in people_ids]


def movie_recommendations(graph, person, limit=None):
    movie_ids = [
        k
        for k, _ in sorted(
            graph["people_credits"].get(str(person["id"]), {}).items(),
            key=lambda item: -score(
                person.get("popularity", 0),
                graph["movies"].get(item[0], {}).get("popularity", 0),
                item[1],
            ),
        )
    ]
    if limit:
        movie_ids = movie_ids[:limit]
    return [graph["movies"][movie_id] for movie_id in movie_ids]


def main():
    graph = load_graph()
    trie = prefix_trie(graph)
    select_prompt = "Matches:"
    print("Type `\q` to quit.")
    search_input = None
    while search_input != "\q":
        search_input = input("\nMovie or person: ").strip()
        if search_input == "" or search_input == "\q":
            continue

        results = search(search_input, trie)

        if not results:
            print(f"No entries found matching `{search_input}`")
            continue
        options = [format(item) for item in results]
        if len(options) > 1:
            option, index = pick(options, select_prompt, indicator="❯")
            result = results[index]
        else:
            option = options[0]
            result = results[0]
        if result.get("item_type") == "movie":
            people = person_recommendations(graph, result, limit=5)
            movie_recs = {
                person.get("name", "Unknown"): movie_recommendations(
                    graph, person, limit=6
                )
                for person in people
            }
        elif result.get("item_type") == "person":
            movie_recs = {
                result.get("name", "Unknown"): movie_recommendations(
                    graph, result, limit=20
                )
            }
        print(f"Recommendations for {option}:")
        for name, movies in movie_recs.items():
            print(f"via {name}")
            for movie in movies:
                print(f"\t{format_movie(movie)}")

    print("Goodbye!")


if __name__ == "__main__":
    main()
