<script>
	export let title;
	export let date;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="wrapper">
	<div
		class="full-width article-info text-center py-4 my-4"
		style:border-bottom={'1px solid var(--color-text)'}
	>
		<p class="text-3xl">{title}</p>
		<span class="date"
			>{date.toLocaleDateString('de-DE', {
				weekday: 'short',
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			})}</span
		>
	</div>
	<slot />
	<p class="full-width text-center py-4 my-4" style:border-top={'1px solid var(--color-text)'}>
		<a href="/">All Articles</a>
	</p>
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-columns:
			[full-start] 1fr [wrapper-start]
			minmax(0, 30rem) [wrapper-end] 1fr [full-end];

		/* Optional gap */
		column-gap: var(--pad, 1rem);
	}

	.wrapper :global(> *) {
		grid-column: wrapper;
	}

	.wrapper :global(> .full-width) {
		grid-column: full;
	}
</style>
