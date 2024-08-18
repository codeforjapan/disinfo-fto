<script lang="ts">
	import { dev } from '$app/environment';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import NoteCard from './NoteCard.svelte';
	import PostCard from './PostCard.svelte';

	export let form;
	let submitting = false;
	let url = '';
	let initialized = false;

	onMount(() => {
		const queryParams = new URLSearchParams(window.location.search);
		const initialUrl = queryParams.get('url');
		if (initialUrl) {
			url = initialUrl;
			// submit form
			const formElement = document.getElementById('checkPost');
			if (formElement) {
				formElement.dispatchEvent(new Event('submit', { cancelable: true }));
			}
		}
		initialized = true;
	});

	$: if (browser && initialized) {
		// set query parameter whenever url changes so that url can be shared
		const queryParams = new URLSearchParams(window.location.search);
		queryParams.set('url', url);
		const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
		window.history.replaceState({}, '', newUrl);
	}

	const validateUrl = (url: string): boolean => {
		const regex = /^https:\/\/(twitter|x)\.com\/[a-zA-Z0-9_]+\/status\/[0-9]+/;
		return regex.test(url);
	};
</script>

<div
	class="flex min-h-screen flex-col items-center justify-center space-y-3 bg-gray-100 px-4 py-12 sm:px-6 lg:px-8"
>
	<div class="w-full max-w-md space-y-8">
		<h1 class="text-center text-4xl font-extrabold text-gray-900">BirdXplorer</h1>
		<div>
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Input URL</h2>
		</div>
		<form
			id="checkPost"
			method="post"
			class="mt-8 space-y-6"
			use:enhance={({ formElement, formData, action, cancel, submitter }) => {
				submitting = true;
                // if url is not set, set it (especially when form is submitted automatically on mounted)
                if (!formData.get('url')) {
                    formData.set('url', url);
                }
				// https://kit.svelte.dev/docs/form-actions#progressive-enhancement-customising-use-enhance

				if (!validateUrl(String(formData.get('url')))) {
					if (!confirm('This URL may be invalid. Do you want to continue?')) {
						cancel();
						return;
					}
				}
				return async ({ result, update }) => {
					submitting = false;
					if (result.type === 'success') {
						update({
							// input url won't be cleared
							reset: false
						});
					} else if (result.type === 'error' || result.type === 'failure') {
						alert('error');
					}
				};
			}}
		>
			<div class="-space-y-px rounded-md shadow-sm">
				<div>
					<label for="url" class="sr-only">URL</label>
					<input
						id="url"
						name="url"
						type="text"
						required
						bind:value={url}
						class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						placeholder="https://twitter.com/<some-handler>/status/<id-number>"
					/>
				</div>
			</div>

			<div>
				<button
					type="submit"
					class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					Submit
				</button>
			</div>
		</form>
	</div>

	{#if submitting}
		<div class="flex justify-center" aria-label="loading">
			<div class="h-8 w-8 animate-spin rounded-xl bg-blue-300"></div>
		</div>
	{/if}

	{#if form}
		{#if form.success}
			{#if dev}
				<p class="mr-auto">JSON.stringify(form.data)</p>
				<div class="w-full border-2 border-gray-300 p-4">
					{JSON.stringify(form.data)}
				</div>
			{/if}
			<div class="flex flex-col space-x-3 sm:flex-row">
				{#if form.data?.length}
					<div class="flex w-full flex-col space-y-2">
						<h2 class="text-2xl font-semibold text-gray-800">Posts</h2>
						{#each form.data as postWithUrl}
							<PostCard post={postWithUrl.post} />
						{/each}
					</div>
				{:else}
					No posts found
				{/if}
			</div>
		{/if}
	{/if}
</div>
