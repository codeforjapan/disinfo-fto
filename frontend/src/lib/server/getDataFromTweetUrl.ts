/**
 * Fetch tweet content from Twitter oEmbed API and extract URLs inside the tweet.
 * External URLs are using t.co as host.
 *
 * @param tweetUrl - The URL of the tweet
 * @returns An array of URLs inside the tweet
 */
async function extractUrlsFromTweetUrl(tweetUrl: string): Promise<string[]> {
	const response = await fetch(`https://publish.twitter.com/oembed?url=${tweetUrl}`);
	const data = await response.json();
	const allUrls = [...(data.html as string).matchAll(/href="(https?:\/\/[^\s]+)"/g)];
	return allUrls.map((m) => m[1]).filter((url) => url.startsWith('https://t.co/'));
}

type Data = Array<{
	url: string;
	// TODO: Define the rest of the data structure
}>;

export default async function getDataFromTweetUrl(url: string): Promise<Data> {
	const urls = await extractUrlsFromTweetUrl(url);

	// TODO: invoke BirdXplorer API to get posts with these URLs

	return urls.map((url) => ({ url }));
}
