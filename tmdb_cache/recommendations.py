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


def movie_prefix_trie(graph):
    start = time.time()
    trie = CharTrie()
    for movie in graph["movies"].values():
        title = sanitize_title_for_trie(movie.get("title"))
        trie[title] = movie
        for prefix in ["the ", "a ", "an "]:
            if title.startswith(prefix):
                trie[title.lstrip(prefix)] = movie

    end = time.time()
    print(f"Constructed search index from graph in {end - start}s")

    return trie


def release_year(movie):
    return movie.get("release_date", "Unknown").split("-")[0]


def search_movie(prefix, trie, year=None):
    prefix = re.sub(r"[^a-z0-9 ]+", "", prefix.lower())
    try:
        matches = trie.values(prefix)
    except:
        matches = []

    movies = [
        movie for movie in matches if year is None or str(year) == release_year(movie)
    ]
    return sorted(movies, key=lambda movie: -movie.get("popularity", 0))


def format_movie(movie, with_id=False):
    title = movie.get("title", "???")
    year = release_year(movie)
    movie_id = movie.get("id", "?")
    movie_id_debug = f", id: {movie_id}" if with_id else ""
    return f"{title} - ({year}){movie_id_debug}"


def person_recommendations(graph, movie, limit=None):
    people_ids = [
        k
        for k, _ in sorted(
            graph["movie_credits"].get(str(movie["id"]), {}).items(),
            key=lambda item: item[1],
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
            key=lambda item: (
                item[1],
                -graph["movies"].get(item[0], {}).get("popularity", 0),
            ),
        )
    ]
    if limit:
        movie_ids = movie_ids[:limit]
    return [graph["movies"][movie_id] for movie_id in movie_ids]


def main():
    graph = load_graph()
    trie = movie_prefix_trie(graph)
    select_movie_prompt = "Matches:"
    print("Type `\q` to quit.")
    search_input = None
    while search_input != "\q":
        search_input = input("\nMovie: ").strip()
        if search_input == "" or search_input == "\q":
            continue
        movies = search_movie(search_input, trie)
        if not movies:
            print(f"No movies found matching `{search_input}`")
            continue
        options = [format_movie(movie) for movie in movies]
        if len(options) > 1:
            option, index = pick(options, select_movie_prompt, indicator="❯")
            movie = movies[index]
        else:
            option = options[0]
            movie = movies[0]
        people = person_recommendations(graph, movie, limit=5)
        movie_recs = {
            person.get("name", "Unknown"): movie_recommendations(graph, person, limit=6)
            for person in people
        }
        print(f"Recommendations for {option}:")
        for name, movies in movie_recs.items():
            print(f"via {name}")
            for movie in movies:
                print(f"\t{format_movie(movie)}")

    print("Goodbye!")


if __name__ == "__main__":
    main()
