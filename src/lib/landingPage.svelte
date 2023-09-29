<script>
	import { browser } from '$app/environment';

	// the liknks
	export let link_bg_color = 'rgba(255,255,255,.7)';

	export let title;
	export let description;
	export let items;
	export let item_path_accessor;
	export let item_title_accessor;
	export let item_photo_path_accessor;
	export let background_image_position_accessor;
	export let route_folder = [];
</script>

<section class="landing-page flex flex-col min-h-screen p-4">
	<h2 class="text-[2rem] text-center text-white">{title}</h2>

	<div class="flex flex-col gap-6 mx-auto min-w-[200px] px-1 my-auto">
		{#each items as item, i}
			{@const href = `${route_folder.length === 1 ? route_folder[0] : route_folder[i]}`}
			<a
				{href}
				class="relative rounded-lg h-16 dt:h-24 grid place-items-center hover:border-8 hover:border-purple-500"
				style:background-color={link_bg_color}
			>
				<button class="folder inset-0">
					<span class="p-2 rounded-md font-bold">
						{item[item_title_accessor]}
					</span>
				</button>
			</a>
		{/each}
	</div>
</section>

<style lang="scss">
</style>
