import csv


cache = {}
with open('expanded_urls.csv', mode='r') as file:
    reader = csv.reader(file)
    next(reader)  # ヘッダーをスキップ
    for row in reader:
        tco_url, redirect_url = row
        if redirect_url == 'ERROR':  # 'None'を適切に処理
            continue

        # skip internal links
        if redirect_url.startswith("https://twitter.com/"):
            continue
        if redirect_url.startswith("https://x.com/"):
            continue
        
        cache[tco_url] = redirect_url

reverse_map = {}
for k, v in cache.items():
    reverse_map[v] = k

with open('reverse_map.csv', mode='w') as file:
    writer = csv.writer(file)
    writer.writerow(["redirect_url", "tco_url"])  # ヘッダーを書き込む
    for k, v in sorted(reverse_map.items()):
        writer.writerow([k, v])

