<script>
	// test array
	export let data;
	// const { posts } = data;
	let posts = Array.from({ length: 11 }).map((e) => {
		return {
			date: new Date(),
			link: '/post/understanding_grid/',
			title: 'TEST'
		};
	});
</script>

<section class="frontside-container">
	<div class="info-container">
		<div class="info-content">
			<div>Robin Kohrs</div>
			<div>Trying yet another website</div>
		</div>
	</div>
	<div class="articles-container">
		{#each posts as post, i}
			<a class="article" href="/post/{post.link}">
				<h2>
					{post.title}
				</h2>
				<span
					>{post.date.toLocaleString('de', {
						weekday: 'short',
						year: 'numeric',
						month: 'short',
						day: 'numeric'
					})}</span
				>
			</a>
		{/each}
	</div>
</section>

<style>
	/* the default for mobile */
	/* info on top, articles below */
	/* two rows, one column */
	.frontside-container {
		--border-width: 1px;
	}

	.info-container {
		--info-padding: 0;
		height: 300px;
		padding: var(--info-padding);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		padding: 3rem;
		overflow: scroll;
	}

	.articles-container {
		position: relative;
		display: grid;
		gap: var(--border-width);
		border: var(--border-width) solid var(--color-text);
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		grid-auto-rows: minmax(300px, 400px);
		background-color: var(--color-text);

		& .article {
			background-color: var(--color-bg);
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		& .article:hover {
			border: 2px solid var(--color-text);
		}
	}

	/* small desktop */
	@media screen and (min-width: 700px) {
		/* make it a grid of two columns */
		.frontside-container {
			display: grid;
			grid-template-columns: minmax(20%, 400px) 1fr;
		}

		/* make left colum sticky to the top */
		.info-container {
			position: sticky;
			top: 0;
			height: 100vh;
			padding: 1rem;
		}
	}
</style>
