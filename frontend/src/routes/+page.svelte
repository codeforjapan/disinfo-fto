<script lang="ts">
	export let form;
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Input URL</h2>
		</div>
		<form method="post" class="mt-8 space-y-6">
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
					送信
				</button>
			</div>
		</form>

		{#if form}
			{JSON.stringify(form)}
		{/if}
	</div>
</div>
