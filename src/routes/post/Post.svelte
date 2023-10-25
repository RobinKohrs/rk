<script>
	export let title;
	export let date;
	export let tags;
	import SizeDetector from '$lib/components/SizeDetector.svelte';

	let page_width;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="wrapper">
	<!-- render the post -->
	<slot {page_width} />
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-columns:
			[full-start] 1fr [wrapper-start]
			minmax(0, 40rem) [wrapper-end] 1fr [full-end];

		/* Optional gap */
		column-gap: var(--pad, 1rem);
	}

	.wrapper :global(> *) {
		grid-column: wrapper;
	}

	.wrapper :global(> .full-width) {
		grid-column: full;
	}

	.wrapper :global(h2) {
		font-size: 1.5rem;
		letter-spacing: 0.1rem;
		text-align: center;
		margin: 1rem 0;
		text-decoration: underline;
	}
	.wrapper :global(h3) {
		font-size: 1.4rem;
		letter-spacing: 0.1rem;
		text-align: center;
		margin: 1rem 0;
		text-decoration: underline;
	}
</style>
