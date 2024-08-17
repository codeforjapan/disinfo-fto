<script lang="ts">
	export let post: Post;

	function formatDate(timestamp: number) {
		const date = new Date(timestamp);
		return date.toLocaleDateString();
	}

	function formatNumber(num: number) {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
</script>

<div class="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-lg">
	<div class="p-6">
		<div class="mb-4 flex items-center space-x-3">
			<img src={post.xUser.profileImage} alt={post.xUser.name} class="h-12 w-12 rounded-full" />
			<div>
				<h2 class="font-semibold text-gray-800">{post.xUser.name}</h2>
				<p class="text-sm text-gray-500">@{post.xUserId}</p>
			</div>
		</div>

		<p class="mb-4 text-gray-700 whitespace-pre-line">{post.text}</p>

		{#if post.mediaDetails && post.mediaDetails.length > 0}
			<div class="mb-4 grid grid-cols-2 gap-2">
				{#each post.mediaDetails as media, index}
					<img
						src={media}
						alt="Post media {index + 1}"
						class="h-40 w-full rounded-lg object-cover"
					/>
				{/each}
			</div>
		{/if}

		<div class="mb-4 flex items-center justify-between text-sm text-gray-500">
			<div class="flex items-center space-x-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
						clip-rule="evenodd"
					/>
				</svg>
				<span>{formatDate(post.createdAt)}</span>
			</div>
			<span>Post ID: {post.postId}</span>
		</div>

		<div class="flex justify-between text-sm font-medium">
			<span class="text-pink-600">♥ {formatNumber(post.likeCount)}</span>
			<span class="text-green-600">↻ {formatNumber(post.repostCount)}</span>
			<span class="text-blue-600">👁 {formatNumber(post.impressionCount)}</span>
		</div>
	</div>
</div>
