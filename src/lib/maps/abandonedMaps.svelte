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
	let slider;
	let currentImage = 0;
	$: if (slider) {
		slider.addEventListener('scroll', () => {
			const scrollPos = slider.scrollLeft;
			const imgWidth = slider.clientWidth - 10;
			currentImage = Math.floor(scrollPos / imgWidth);
		});
	}
</script>

<div class="slider-outer-container relative w-full flex items-center">
	<div class="slider-wrapper">
		<div class="slider" bind:this={slider}>
			{#each images as image, i}
				<img id={`slide-${i}`} src={image.path} alt={image.label} />
			{/each}
		</div>
		<div class="slider-nav">
			{#each images as _, i}
				<a
					href={`#slide-${i}`}
					style:background-color={currentImage === i ? 'var(--brand)' : 'white'}
				/>
			{/each}
		</div>
	</div>

	<!-- {#if modalOpen}
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
	{/if} -->
</div>

<style>
	h1 {
		color: var(--brand);
		text-align: center;
	}

	.slider-wrapper {
		position: relative;
		max-width: 48rem;
		margin: auto;
	}
	.slider {
		display: flex;
		aspect-ratio: 16/9;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		box-shadow: 0 1.5rem 3rem -0.75rem hsla(0, 0%, 0%, 0.25);
		border-radius: 0.25rem;
	}

	.slider img {
		flex: 1 0 100%;
		object-fit: cover;
		scroll-snap-align: start;
	}

	.slider-nav {
		display: flex;
		column-gap: 1rem;
		position: absolute;
		bottom: 1rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 1;
		background-color: hsla(0, 0%, 0%, 0.1);
		padding: 1rem;
		border-radius: 0.4rem;
	}
	.slider-nav a {
		width: 0.5rem;
		aspect-ratio: 1;
		border-radius: 50%;
		background-color: white;
	}
</style>
