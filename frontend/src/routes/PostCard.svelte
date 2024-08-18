<script lang="ts">
	import type { Note, Post } from "$lib/types";
    import { Accordion } from "bits-ui";
	import { slide } from "svelte/transition";
	import NoteCard from "./NoteCard.svelte";

	export let post: Post;
    let notes: Note[] | null = null;

    async function fetchNotes(postId: string) {
        const res = await fetch(`/api/posts/${postId}/notes`);
        notes = (await res.json()).notes;
        return notes as Note[];
    }

    async function onValueChange(value: string | string[] | undefined) {
        if (value == 'main' && !notes) {
            notes = await fetchNotes(post.postId);
        }
    }

	function formatDate(timestamp: number) {
		const date = new Date(timestamp);
		return date.toLocaleDateString();
	}

	function formatNumber(num: number) {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
</script>

<div class="max-w-xs sm:max-w-md overflow-hidden rounded-lg bg-white shadow-lg">
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
    <Accordion.Root class="w-full" {onValueChange}>
        <Accordion.Item value="main" class="group border-b border-dark-10 px-1.5">
        <Accordion.Header>
            <Accordion.Trigger
                class="flex w-full flex-1 items-center justify-between pl-2 py-5 text-[15px] font-medium transition-all [&[data-state=open]>span>svg]:rotate-180 "
            >
                Show Notes
            <span
                class="inline-flex size-8 items-center justify-center rounded-[7px] bg-transparent transition-all hover:bg-dark-10"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
            </span>
            </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content
            transition={slide}
            transitionConfig={{ duration: 200 }}
            class="pb-[25px] text-sm tracking-[-0.01em]"
        >
            {#if !notes}
                <div class="flex justify-center" aria-label="loading">
                    <div class="animate-spin h-8 w-8 bg-blue-300 rounded-xl"></div>
                </div>
            {:else if !notes.length}
                No notes found
            {:else}
                {#each notes as note}
                    <NoteCard {note} />
                {/each}
            {/if}
        </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
</div>
