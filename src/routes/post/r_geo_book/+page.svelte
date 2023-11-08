<script context="module">
	import Post from '../Post.svelte';
	export let date = new Date('2023-10-18');
	export let title = 'notes on R';
	export let tags = ['r', 'geodata'];
</script>

<div class="h-full grid place-items-center content-center gap-2">
	The link:
	<a
		class="rounded-md px-8 py-4 bg-white shadow-lg"
		href="https://livrosrk.github.io/Rbook/"
		target="_blank">Some things I frequently need in R</a
	>
</div>
