<script lang="ts">
	import {
		Email,
		Facebook,
		X,
		Line
	} from 'svelte-share-buttons-component';

	export let url: string;
	export let title: string;
</script>

<Facebook class="share-button" quote={title} {url} />
<X
	class="share-button"
	text={title}
	{url}
	hashtags="birdxplorer"
	related="other,users"
/>
<Line class="share-button" {url} />
