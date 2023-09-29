<script>
	// from the api
	export let data;

	// custom compontents
	import LandingPage from '$lib/landingPage.svelte';
</script>

{#if data}
	<LandingPage
		title="Posts"
		description="A collection of posts"
		items={data.posts}
		item_title_accessor={'title'}
		item_description_accessor={'title'}
		item_path_accessor={'slug'}
		item_photo_path_accessor={'thumbnail'}
		background_image_position_accessor={'bg_position'}
		bg_color={'purple'}
		link_bg_color={'rgba(0,0,0,.2)'}
		route_folder={data.posts.map((p) => `posts/${p.slug}`)}
	/>
{/if}
