import requests
import re
import csv
from tqdm import tqdm
from concurrent.futures import ThreadPoolExecutor, as_completed


def get_redirect_url(short_url):
    """
    >>> get_redirect_url("https://t.co/Nkj305cUOb")
    https://twitter.com/YE9DL/status/1798672472696635856/photo/1
    """
    try:
        response = requests.head(short_url, allow_redirects=True)
        return (short_url, response.url)
    except:
        return (short_url, "ERROR")


# load previous file if exists
cache = {}
try:
    with open('script/expanded_urls.csv', mode='r') as file:
        reader = csv.reader(file)
        next(reader)  # ヘッダーをスキップ
        for row in reader:
            tco_url, redirect_url = row
            if redirect_url == 'ERROR':  # 'None'を適切に処理
                continue
            cache[tco_url] = redirect_url
except FileNotFoundError:
    # ファイルが存在しない場合は、新しい辞書を作成
    cache = {}



rows = list(csv.reader(open("fto_birdxplorer_data/post.csv")))
print(len(rows))

from time import perf_counter
t = perf_counter()
with ThreadPoolExecutor(max_workers=None) as executor:  # スレッド数を調整可能
    futures = []
    for row in tqdm(rows):
        [post_id, user_id, text, created_at, like_count, repost_count, impression_count] = row
        tco_urls = re.findall(r'https?://t\.co/[^\s]+', text)
        if tco_urls:
            print(post_id, tco_urls)
            for tco_url in tco_urls:
                if tco_url not in cache:
                    futures.append(executor.submit(get_redirect_url, tco_url))
    to_do = len(futures)
    already_done = len(cache)

    for future in as_completed(futures):
        tco_url, redirect_url = future.result()
        cache[tco_url] = redirect_url
        print(tco_url, redirect_url)
        print(f"{len(cache) - already_done} / {to_do}  ({int(perf_counter() - t)} sec)")

print(perf_counter() - t)

with open('script/expanded_urls.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["tco_url", "redirect_url"])  # ヘッダーを書き込む
    for tco_url, redirect_url in sorted(cache.items()):
        writer.writerow([tco_url, redirect_url])