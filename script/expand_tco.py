import requests
import re
import csv
from tqdm import tqdm

def get_redirect_url(short_url):
    """
    >>> get_redirect_url("https://t.co/Nkj305cUOb")
    https://twitter.com/YE9DL/status/1798672472696635856/photo/1
    """
    response = requests.head(short_url, allow_redirects=True)
    return response.url


cache = {}

rows = list(csv.reader(open("fto_birdxplorer_data/post.csv")))
print(len(rows))
for row in tqdm(rows[:30]):
    [post_id, user_id, text, created_at, like_count, repost_count, impression_count] = row
    # print(text)
    tco_urls = re.findall(r'https?://t\.co/[^\s]+', text)
    if tco_urls:
        print(post_id, tco_urls)

        for tco_url in tco_urls:
            if tco_url not in cache:
                cache[tco_url] = get_redirect_url(tco_url)
                print(cache[tco_url])
