<script>
	// test array
	export let data;
	const { posts } = data;
	$: console.log('posts: ', posts);
</script>

<section class="frontside-container">
	<div class="sidebar personal-info">
		<div class="sidebar-content">
			<div>Robin Kohrs</div>
			<div>Trying yet another website</div>
		</div>
	</div>
	<div class="articles-container">
		{#each posts as post, i}
			<a
				class="article aspect-square flex flex-col justify-center items-center"
				href="/posts/{post.link}"
			>
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

<style lang="scss">
	// mobile first
	.frontside-container {
		--border-width: 1px;
		padding: 0 10px 0 0;
		display: grid;
		grid-template-rows: 300px 1fr;
		height: 100%; // full height of page as direct children of body which has height 100% (of html)
	}

	.sidebar {
		--sidebar-padding: 0;
		padding: var(--sidebar-padding);

		& .sidebar-content {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 1rem;
			padding: 3rem;
		}
	}

	// the articles
	.articles-container {
		position: relative;
		display: grid;
		gap: var(--border-width);
		border: var(--border-width) solid var(--color-text);
		grid-template-columns: 1fr 1fr;
		background-color: var(--color-text);

		& .article:hover {
			border: 2px solid var(--color-text);
		}
	}

	@media screen and (min-width: 650px) {
		.frontside-container {
			grid-template-rows: 1fr;
			grid-template-columns: 300px 1fr;
		}

		.sidebar-content {
			position: sticky;
			top: var(--sidebar-padding);
			height: 100vh;
			max-height: 100vh;
		}

		.articles-container {
			grid-template-columns: 1fr;
		}
	}

	// wider
	@media screen and (min-width: 750px) {
		.frontside-container {
			grid-template-columns: 400px 1fr;
		}
		.articles-container {
			grid-template-columns: 1fr 1fr;
		}
	}

	// super wide
	@media screen and (min-width: 1200px) {
		.articles-container {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}

	.article {
		background-color: var(--color-bg);
	}
</style>
