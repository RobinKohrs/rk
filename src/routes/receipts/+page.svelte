<script>
	let image_placeholders = [
		{
			path: '/images/receipts/placeholder/1.jpeg'
		},
		{
			path: '/images/receipts/placeholder/2.jpeg'
		},
		{
			path: '/images/receipts/placeholder/3.jpeg'
		},
		{
			path: '/images/receipts/placeholder/4.jpeg'
		}
	];
</script>

<div class="fixed inset-0 image-container h-full w-full">
	{#each image_placeholders as image, i}
		<img
			class="croissant"
			src={image.path}
			alt=""
			style="width: 100%; height: 100%; border-radius;"
		/>
	{/each}

	<div
		class="absolute text-center"
		style="padding: 1rem; background-color: hsla(0, 100%, 100%, .8); border-radius: .5rem; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 2rem; color: var(--brand);"
	>
		Eventually there really will be receipts for the croissants!
	</div>
</div>

<style>
	.image-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
	}

	@media screen and (max-width: 768px) {
		.image-container {
			grid-template-columns: repeat(1, 1fr);
			grid-auto-rows: 200px;
		}
	}

	img {
		object-fit: cover;
	}
</style>
