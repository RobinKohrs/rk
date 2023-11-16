<script>
	// transitions
	import { slide } from 'svelte/transition';

	// route programatically
	import { goto } from '$app/navigation';

	// icons
	import { search } from '../assets/icons';

	// posts
	export let data;
	const { posts } = data;

	let searchable;
	$: if (posts) {
		searchable = posts.map((p) => {
			let s = {
				search: [...p.tags, p.title],
				title: p.title,
				link: p.link
			};
			return s;
		});
	}

	import { navigating } from '$app/stores';
	import { onMount } from 'svelte';
	import Search from '../lib/components/Search.svelte';

	let animate = !$navigating;
	let loaded = false;
	onMount(() => (loaded = true));

	// suggestions to search for
	let suggestions;
	function route(link) {
		goto(`/post/${link}`);
	}
</script>

<section class="frontside-container">
	<div class="info-container">
		<div class="info-content">
			<div class="text-center underline my-5">Robin Kohrs</div>
			<ul class="services-container px-4 flex flex-col">
				<li><a href="">Articles</a></li>
				<li><a href="">Maps</a></li>
				<li><a href="">Vizualisations</a></li>
				<li><a href="">Contact</a></li>
			</ul>
			<!-- <Search
				{searchable}
				bind:suggestions
				options={{ keys: ['search'] }}
				on:choose={({ detail }) => route(detail.item.link)}
			/> -->
		</div>
	</div>
	<div class="articles-container">
		{#each posts as post, i}
			{#if animate}
				{#if loaded}
					<a transition:slide={{ delay: i * 100 }} class="article" href="/post/{post.link}">
						<h2 class="article-title text-center" style="width: 70%; ">
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
						<div class="tags-container flex gap-2 mx-4 w-[90%] overflow-scroll py-2">
							{#each post.tags as tag}
								<span class="text-sm inline-block py-1 px-3 border border-gray-500 rounded-sm"
									>{tag}</span
								>
							{/each}
						</div>
					</a>
				{/if}
				<!-- YOU HAVE TO COPY IT -->
			{:else}
				<a transition:slide={{ delay: i * 100 }} class="article" href="/post/{post.link}">
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
					<div class="tags-container flex gap-2 mx-4 w-[90%] overflow-scroll">
						{#each post.tags as tag}
							<span class="text-sm inline-block py-1 px-3 border border-gray-500 rounded-sm"
								>{tag}</span
							>
						{/each}
					</div>
				</a>
			{/if}
		{/each}
	</div>
</section>

<style>
	/* the default for mobile */
	/* info on top, articles below */
	/* two rows, one column */
	.frontside-container {
		--border-width: 1px;
		letter-spacing: 0.1rem;
	}

	.info-container {
		height: 300px;
		padding: 1rem;
		overflow: scroll;
	}

	.articles-container {
		position: relative;
		display: grid;
		gap: var(--border-width);
		border: var(--border-width) solid var(--color-text);
		/* grid-template-columns: repeat(auto-fit, minmax(150px, 300px)); */
		grid-template-columns: repeat(2, minmax(0, 1fr));
		grid-auto-rows: minmax(100px, 250px);
		background-color: var(--color-text);

		& h2 {
			text-decoration: underline 0.15em rgba(0, 0, 0, 0);
			text-underline-offset: 1em;
			transition: text-decoration-color 300ms, text-underline-offset 300ms;
		}

		& .article {
			background-color: var(--color-bg);
			display: flex;
			padding: 2rem 0;
			flex-direction: column;
			gap: 1rem;
			align-items: center;
			justify-content: space-between;
			transition: all 200ms;
		}
		& .article:hover {
			/* border: 2px solid var(--color-text); */

			& h2 {
				text-decoration-color: rgba(0, 0, 0, 1);
				text-underline-offset: 0.1em;
			}
		}
	}

	li:focus,
	li:active {
		outline: 2px solid var(--color-text);
	}

	.articles-container:hover .article:not(:hover) {
		filter: blur(0.5px) brightness(0.95);
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

	@media screen and (min-width: 1200px) {
		.articles-container {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	.services-container {
		font-size: clamp(16px, calc(1vw + 1rem), 20px);
	}
</style>
