<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let currentSlide = 0;
	$: if (browser) {
		currentSlide = Object.fromEntries($page.url.searchParams).slide ?? 0;
	}

	let container;
	$: if (currentSlide !== 0 && container && browser) {
		document.getElementById(`slide-${currentSlide}`).scrollIntoView({ behavior: 'smooth' });
	}
</script>

<div
	class="container fixed inset-0 bg-slate-300 grid place-items-center overflow-scroll"
	bind:this={container}
>
	{#each Array(10) as slide, i}
		<div id={`slide-${i}`} class="slide grid place-items-center">
			slide {i}
		</div>
	{/each}
</div>

<style lang="scss">
	.container {
		max-width: 100vw !important;

		& .slide {
			width: 100vw;
			height: 100vh;
		}
	}
</style>
