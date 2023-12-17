import requests
import os
import json
import time

from dotenv import load_dotenv
from urllib.parse import urlencode
from pprint import pprint

load_dotenv()

API_FAILURES_LOG = "api_failures.json"
API_URL = "https://api.themoviedb.org/3"
API_TOKEN = os.environ.get("TMBD_API_TOKEN")
HEADERS = dict(
    {
        "accept": "application/json",
        "Authorization": f"Bearer {API_TOKEN}",
    },
)

# Load cache in memory
CACHE = {}
start = time.time()
for directory in ["./person", "./movie"]:
    for filename in os.listdir(directory):
        key = "/".join([directory.split("/")[1], filename.split(".")[0]])
        with open(f"{directory}/{filename}", "r") as f:
            CACHE[key] = json.load(f)
end = time.time()
print(f"Loaded cached API responses in {end - start}s")

with open(API_FAILURES_LOG, "r") as f:
    API_FAILURES = json.load(f)


def key_to_filepath(key):
    parts = key.split("/")
    directory = parts[0]
    rest = "_".join(parts[1:])
    return f"./{directory}/{rest}.json"


def fetch_and_cache(url_key):
    parts = url_key.split("/")
    cache_key = "/".join([parts[0], "_".join(parts[1:])])
    if url_key in API_FAILURES and API_FAILURES[url_key] >= 5:
        return None
    if cache_key in CACHE:
        print(f"Cache hit for {url_key}")
        return CACHE[cache_key]
    try:
        print(f"Cache miss for {url_key}")
        response = requests.get(f"{API_URL}/{url_key}", headers=HEADERS, timeout=5)
        data = json.loads(response.content)
        CACHE[cache_key] = data
        with open(key_to_filepath(url_key), "w") as f:
            json.dump(data, f)
        return data
    except:
        print(f"Failed fetching {url_key} from TMDB API")
        API_FAILURES[url_key] = API_FAILURES.get(url_key, 0) + 1


def search_title(title):
    qs = urlencode({"query": title})
    key = f"search/movie?{qs}"
    return fetch_and_cache(key)


def person_credits(id):
    return fetch_and_cache(f"person/{id}/movie_credits")


def movie_credits(id):
    return fetch_and_cache(f"movie/{id}/credits")


def find_director(crew):
    for item in crew:
        if item["department"] == "Directing" and item["job"] == "Director":
            return item


def parse_credits(credits, limit=None):
    if not credits:
        return []
    cast = credits.get("cast", [])
    director = find_director(credits.get("crew", []))
    results = [director] + cast
    if not limit:
        return list(filter(lambda item: item, results))
    return list(filter(lambda item: item, results))[:limit]


# List of people who directed or acted in movie
def cast_and_director(movie_id, limit=None):
    return parse_credits(movie_credits(movie_id), limit=limit)


# List of movies person directed or acted in
def acting_directing_credits(person_id, limit=None):
    return parse_credits(person_credits(person_id), limit=limit)


def crawl(movie_id=None, person_id=None, depth=1, limit=None):
    if depth < 1:
        return
    elif not movie_id and not person_id:
        print("crawl called without args")
        return
    elif movie_id:
        people = cast_and_director(movie_id, limit=limit)
        for person in people:
            crawl(person_id=person["id"], depth=depth - 1)
    elif person_id:
        movies = acting_directing_credits(person_id, limit=limit)
        for movie in movies:
            crawl(movie_id=movie["id"], depth=depth - 1)


# print("Uncomment line to scrape!")
crawl(person_id=2150101, depth=4, limit=5)

with open(API_FAILURES_LOG, "w") as f:
    json.dump(API_FAILURES, f)
