<script>
	export let data;
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="">
	<h2 style="color: var(--brand)">{data.meta.title}</h2>

	<!-- <div class="tags flex justify-center gap-4">
		{#each data.meta.categories as category}
			<span class="surface-4 p-2 rounded-md">&num;{category}</span>
		{/each}
	</div> -->

	<div class="post relative">
		<svelte:component this={data.content} />
	</div>
</article>

<style>
	article {
		min-height: 100vh;
		height: 100vh;
		display: grid;
		grid-template-rows: 100px 1fr;
		align-items: center;
		widows: 100%;
	}

	h2 {
		font-size: 2rem;
		text-align: center;
	}
</style>
