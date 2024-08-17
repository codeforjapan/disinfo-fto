<script lang="ts">
	import type { Note } from '$lib/types';

	export let note: Note;

	function formatDate(timestamp: number) {
		const date = new Date(timestamp);
		return date.toLocaleDateString();
	}
</script>

<div class="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-lg">
	<div class="p-6">
		<div class="mb-4 flex items-center justify-between">
			<div class="flex items-center space-x-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 text-blue-500"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
						clip-rule="evenodd"
					/>
				</svg>
				<span class="text-sm font-medium text-gray-600">{note.language.toUpperCase()}</span>
			</div>
			<div class="flex items-center space-x-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 text-gray-400"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
						clip-rule="evenodd"
					/>
				</svg>
				<span class="text-sm text-gray-500">{formatDate(note.createdAt)}</span>
			</div>
		</div>

		<p class="mb-4 whitespace-pre-line text-gray-700">{note.summary}</p>

		<div class="mb-4">
			<h3 class="mb-2 text-sm font-semibold text-gray-600">Topic</h3>
			<div class="flex flex-wrap gap-2">
				{#each note.topics as topic (topic.topicId)}
					<span
						class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mr-1 h-3 w-3"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z"
								clip-rule="evenodd"
							/>
						</svg>
						{topic.label[Object.keys(topic.label)[0]]}
					</span>
				{/each}
			</div>
		</div>

		<div class="flex justify-between text-sm text-gray-500">
			<span>Note ID: {note.noteId}</span>
			<span>Post ID: {note.postId}</span>
		</div>
	</div>
</div>
