<script lang="ts">
	// custom compontents
	import LandingPage from '$lib/landingPage.svelte';

	let maps: string[] = [];

	function calculate_posts() {
		const path_object = import.meta.glob('/src/routes/maps/*/*.svelte');
		const paths = Object.keys(path_object);

		maps = paths.map((path) => path.split('/').at(-2) ?? '').filter((name) => name.length > 0);
	}

	calculate_posts();
</script>

<svelte:head>
	<title>Maps</title>
</svelte:head>

<div class="maps-lading-container">
	<ul>
		{#each maps as map}
			<li>
				<a href="/maps/{map}">{map}</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	.maps-lading-container {
		min-height: 100%;
		display: grid;
		/* place-items: center; */
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li {
		padding: 0.5rem;
		margin: 0.5rem;
		border: 5px solid blueviolet;
		height: 100px;
		border-radius: 1vw;
		display: grid;
		place-items: center;
	}

	li:hover {
		background-color: hsla(265, 100%, 86%, 1);
		color: white;
	}
	a {
		color: black;
	}
</style>
