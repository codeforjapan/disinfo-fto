<script lang="ts">
	import { enhance } from '$app/forms';
	import NoteCard from './NoteCard.svelte';
	import PostCard from './PostCard.svelte';

	export let form;

	const validateUrl = (url: string): boolean => {
        const regex = /^https:\/\/(twitter|x)\.com\/[a-zA-Z0-9_]+\/status\/[0-9]+/;
		return regex.test(url);
	};
</script>

<div class="flex flex-col space-y-3 min-h-screen items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
        <h1 class="text-4xl font-extrabold text-gray-900 text-center">
            BirdXplorer
        </h1>
		<div>
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Input URL</h2>
		</div>
		<form
			method="post"
			class="mt-8 space-y-6"
			use:enhance={({ formElement, formData, action, cancel, submitter }) => {
                // https://kit.svelte.dev/docs/form-actions#progressive-enhancement-customising-use-enhance

				if (!validateUrl(String(formData.get('url')))) {
                    if (!confirm('This URL may be invalid. Do you want to continue?')) {
                        cancel();
                        return;
                    }
				}
				return async ({ result, update }) => {
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

    {#if form}
        {#if form.success}
            <p class="mr-auto">JSON.stringify(form.data)</p>
            <div class="border-2 border-gray-300 p-4 w-full">
                {JSON.stringify(form.data)}
            </div>
            <div class="flex space-x-3 flex-col sm:flex-row">
                <div class="flex flex-col space-y-2 w-full sm:w-1/2">
                    <h2 class="text-2xl font-semibold text-gray-800">Posts</h2>
                    {#each form.posts as post}
                        <PostCard {post} />
                    {/each}
                </div>
                <div class="flex flex-col space-y-2 w-full sm:w-1/2">
                    <h2 class="text-2xl font-semibold text-gray-800">Notes</h2>
                    {#each form.notes as note}
                        <NoteCard {note} />
                    {/each}
                </div>
            </div>
        {/if}
    {/if}
</div>
