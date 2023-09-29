<script context="module">
	import Post from '../Post.svelte';
	export let title = 'Understanding Grid';
	export let date = new Date('2023-09-29');

	// an array for the grid
	let arr = Array.from({ length: 11 });
</script>

<Post {title} {date}>
	<h2>The Problem</h2>
	<p spellcheck="true">I do not understand grid. I mean I kind of understand it, but not really</p>
</Post>

<style>
	h2 {
		font-weight: bold;
		font-size: 1.5rem;
		text-decoration: underline;
		margin: 1rem 0;
	}
</style>
