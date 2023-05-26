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

	function handleClick(direction, i) {
		const imgWidth = slider.clientWidth - 10;
		if (direction === 'left') {
			slider.scrollLeft = imgWidth * (i - 1);
		} else {
			slider.scrollLeft = imgWidth * (i + 1);
		}
	}
</script>

<div class="slider-outer-container fixed inset-0 w-full flex justify-center items-center">
	<div class="slider-wrapper">
		<div class="slider" bind:this={slider}>
			{#each images as image, i}
				<div class="relative">
					<img id={`slide-${i}`} src={image.path} alt={image.label} />
					<div on:click={() => handleClick('left', i)} class="arrow left">&larr;</div>
					<div on:click={() => handleClick('right', i)} class="arrow right">&rarr;</div>
				</div>
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
		max-width: min(900px, 90vw);
		margin: auto;
		overflow-x: hidden;
		border-radius: 1rem;
	}
	.slider {
		display: flex;
		aspect-ratio: 16/9;
		overflow-x: scroll;
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		box-shadow: 0 1.5rem 3rem -0.75rem hsla(0, 0%, 0%, 0.25);
	}

	@media screen and (max-width: 900px) {
		.slider {
			aspect-ratio: 1;
		}
	}

	.slider > * {
		flex: 1 0 100%;
		object-fit: cover;
		scroll-snap-align: start;
	}

	.arrow {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 20%;
		color: white;
		opacity: 0;
		background-color: hsla(0, 0%, 0%, 0.5);
		transition: opacity 0.1s linear;
		display: grid;
		place-items: center;
		font-size: 2rem;
	}

	.arrow:hover {
		opacity: 1;
		cursor: pointer;
	}

	.arrow.left {
		left: 0;
	}
	.arrow.right {
		right: 0;
	}

	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}

	.slider img:hover {
		cursor: pointer;
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
