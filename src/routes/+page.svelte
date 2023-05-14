<script>
	import { landing_page_folders, title } from '$lib/config';
	import LandingPage from '../lib/landingPage.svelte';
</script>

<LandingPage
	title={'Robin Kohrs'}
	items={landing_page_folders}
	item_path_accessor="slug"
	item_title_accessor="name"
	route_folder={landing_page_folders.map((e) => e.slug)}
/>

<footer>&copy; RCE</footer>

<style lang="scss">
	h2 {
		color: var(--brand);
		margin-block: 2rem;
		text-align: center;
		margin-inline: auto;
	}

	.folder {
		padding-inline: 3rem;
		padding-block: 2rem;
		border: 1px solid #ccc;
		border-radius: 0.3rem;
		margin-block: 1rem;
		width: 100%;

		@media (prefers-color-scheme: dark) {
			border: 1px solid #a8a8a8;
		}
	}

	footer {
		margin-block-start: 2rem;
		text-align: center;
	}
</style>
