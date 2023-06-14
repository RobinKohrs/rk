<script>
	import { cartoColors } from '$lib/config';
	import { browser } from '$app/environment';

	let palette;
	if (browser) {
		palette = cartoColors.Temps['7'];
		// let {
		// 	Temps: { '7': palette }
		// } = cartoColors;
	}

	export let title;
	export let description;
	export let items;
	export let item_path_accessor;
	export let item_title_accessor;
	export let item_photo_path_accessor;
	export let background_image_position_accessor;
	export let route_folder = [];

	import { slugify } from '$lib/utils';
</script>

<h2 class="text-[2rem]">{title}</h2>

<div class="landing-container grid place-items-center" style="max-height: 100%;">
	{#if palette}
		{#each items as item, i}
			{@const href = `${route_folder.length === 1 ? route_folder[0] : route_folder[i]}`}
			{@const bgImage = item[item_photo_path_accessor]}
			<a {href}>
				<button
					class="folder"
					style:background={palette[
						(i * Math.floor(Math.random() * palette.length)) % palette.length
					]}
					style:background-position={item[background_image_position_accessor]}
				>
					<span class="title p-2 rounded-md font-bold">
						{item[item_title_accessor]}
					</span>
				</button>
			</a>
		{/each}
	{/if}
</div>

<style lang="scss">
	h2 {
		color: var(--brand);
		padding-block: 2rem;
		text-align: center;
		margin-inline: auto;
	}

	a {
		min-width: 450px;
	}

	.folder {
		padding-inline: 3rem;
		padding-block: 3rem;
		border: 1px solid #ccc;
		border-radius: 0.3rem;
		margin-block: 1rem;
		margin-inline: auto;
		width: 100%;

		@media (prefers-color-scheme: dark) {
			border: 1px solid #a8a8a8;
		}

		& .title {
			background-color: var(--background);
		}
	}

	footer {
		margin-block-start: 2rem;
		text-align: center;
	}
</style>
