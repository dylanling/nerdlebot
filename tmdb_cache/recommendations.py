import re

from graph import load_graph, prefix_trie, release_year, search_by_title
from pick import pick
from pprint import pprint
from itertools import chain


def sanitize_title(title):
    if title is None:
        return "__unknown_title__"
    return re.sub(r"[^a-z0-9 ]+", "", title.lower())


def person_recommendations(graph, movie, limit=7):
    credits = graph["movies"].get(str(movie.get("id"))).get("credits", {})
    links = [
        {**graph["people"].get(str(person_id), {}).get("info", {}), **data}
        for person_id, data in credits.items()
    ]
    return [
        person for person in sorted(links, key=lambda person: person.get("order", -1))
    ][:limit]


def movie_recommendations(graph, person, limit=7):
    credits = graph["people"].get(str(person.get("id"))).get("credits", {})
    return [
        graph["movies"].get(movie_id, {}).get("info", {})
        for movie_id, _ in sorted(
            credits.items(),
            key=lambda item: (
                item[1].get("order", 1000),
                -graph["movies"].get(item[0], {}).get("info", {}).get("popularity", 0),
            ),
        )
    ][:limit]


def as_search_result(movie_info):
    title = movie_info.get("title", "Unknown")
    year = release_year(movie_info.get("release_date"))
    movie_id = movie_info.get("id", "n/a")
    return f"{title} ({year}) - {movie_id}"


def main():
    graph = load_graph()
    trie = prefix_trie(graph)
    select_movie_prompt = "Matches:"
    print("Type `\q` to quit.")
    search_input = input("\nMovie: ").strip()
    while search_input != "\q":
        if search_input != "":
            search_results = search_by_title(graph, trie, search_input)
            if not search_results:
                print("No movies found")
            else:
                options = list(map(as_search_result, search_results))

                if len(options) > 1:
                    option, index = pick(options, select_movie_prompt, indicator="❯")
                    movie = search_results[index]
                else:
                    option = options[0]
                    movie = search_results[0]

                person_recs = person_recommendations(graph, movie)
                movie_recs = {
                    person.get("name", "Unknown"): movie_recommendations(graph, person)
                    for person in person_recs
                }

                print(f"Recommendations for {option}:")
                for person_name, movies in movie_recs.items():
                    for movie in movies:
                        print(f"\t{as_search_result(movie)} via {person_name}")
        search_input = input("\nMovie: ").strip()
    print("Goodbye!")


if __name__ == "__main__":
    main()
