<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	// import the slides
	async function get_slides() {
		let slides = [];
		const path_object = import.meta.glob('/src/lib/presentation/*/*.svelte');
		const paths = Object.keys(path_object);

		for (let p of paths) {
			let import_function = path_object[p];
			let component = await import_function();

			if (component.default) {
				slides.push(component.default);
			}
		}

		return slides;
	}

	$: if (browser) {
		currentSlide = Object.fromEntries($page.url.searchParams).slide ?? 0;
	}

	let container;
	let currentSlide = 0;
	let slides_fetched = false;
	let slides_promise = get_slides().then((s) => {
		slides_fetched = true;
		return s;
	});

	$: if (currentSlide !== 0 && container && browser && slides_fetched) {
		document.getElementById(`slide-${currentSlide}`).scrollIntoView({ behavior: 'smooth' });
		// console.log(document.getElementById(`slide-${currentSlide}`));
	}
</script>

{#await slides_promise}
	waiting
{:then slides}
	<div class="container" bind:this={container}>
		<div class="input z-10 bg-slate-400 fixed top-0 h-12">
			<button on:click={() => (currentSlide = slides.length - 1)}>Go to last slide</button>
		</div>
		{#each slides as slide, i}
			<div id={`slide-${i}`} class="slide grid place-items-center">
				<svelte:component this={slide} />
			</div>
		{/each}
	</div>
{/await}

<style lang="scss">
	.container {
		position: fixed;
		inset: 0;
		max-width: 100vw !important;
		overflow: scroll;
		scroll-snap-type: y mandatory;

		& .slide {
			border: 4px solid purple;
			display: grid;
			place-items: center;
			width: 100vw;
			height: 100vh;
			font-size: 4rem;
			scroll-snap-align: start;
		}
	}
</style>
