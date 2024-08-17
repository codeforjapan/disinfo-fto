const BIRDXPLORER_API_URL = 'https://birdxplorer.onrender.com';
const POST_PATH = '/api/v1/data/posts';

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

type PostWithUrl = {
	url: string;
	/** The post that contains the url */
	post: any;
};

export default async function getDataFromTweetUrl(url: string): Promise<PostWithUrl[]> {
	const urls = await extractUrlsFromTweetUrl(url);

	return Promise.all(
		urls.map(async (url) => {
			const payload = {
				search_text: url
			};
			const posts = await (await fetch(
				`${BIRDXPLORER_API_URL}${POST_PATH}?${new URLSearchParams(payload)}`,
				{
					method: 'GET'
				}
			)).json();
			return posts.map((post) => ({ url, post }));
		})
	);
}
