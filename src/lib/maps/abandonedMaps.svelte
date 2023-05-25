<script>
	let images = [
		{
			path: '/images/random/bozen.png',
			label: 'The nothern side of the city of Bolzano'
		},
		{
			path: '/images/random/cafécount.png',
			label: 'A count of the coffees in Italy'
		},
		{
			path: '/images/random/copperbelt.png',
			label: 'Where the stuff for our electronic devices comes from...'
		},
		{
			path: '/images/random/ibk.png',
			label: 'Innsbruck viewed from South to North'
		},
		{
			path: '/images/random/legoandes.png',
			label: 'The andes in lego'
		},
		{
			path: '/images/random/wien.png',
			label: 'All streets in Vienna'
		}
	];

	let modalOpen = false;
	let highlightImage;
	$: console.log('highlightImage', highlightImage);
	function openModal(i) {
		highlightImage = i;
		modalOpen = true;
	}
</script>

<div class="relative w-full flex flex-col gap-4 items-center">
	{#each images as image, i}
		<div class="image-container" on:click={() => openModal(i)}>
			<img src={image.path} alt="" />
			<footer class="text-sm text-center italic">{image.label}</footer>
		</div>
	{/each}

	{#if modalOpen}
		<div
			class="highlightedImage fixed inset-0"
			style:background-color="rgba(0,0,0,0.8)"
			on:click|preventDefault={() => (modalOpen = !modalOpen)}
		>
			<img
				class="absolute w-full h-full object-contain opacity-100"
				src={images[highlightImage].path}
			/>
		</div>
	{/if}
</div>

<style>
	h1 {
		color: var(--brand);
		text-align: center;
	}

	.image-container {
		cursor: pointer;
	}

	.highlightedImage {
		cursor: zoom-out;
	}
</style>
