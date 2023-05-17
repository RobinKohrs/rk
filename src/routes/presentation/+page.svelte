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

	let currentSlide = 0;
	$: if (browser) {
		currentSlide = Object.fromEntries($page.url.searchParams).slide ?? 0;
	}

	let container;
	$: if (currentSlide !== 0 && container && browser) {
		document.getElementById(`slide-${currentSlide}`).scrollIntoView({ behavior: 'smooth' });
	}
</script>

{#await get_slides()}
	waiting
{:then slides}
	<div class="container">
		{#each slides as slide}
			<div class="slide">
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
