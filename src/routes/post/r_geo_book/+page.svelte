<script context="module">
	import Post from '../Post.svelte';
	export let date = new Date('2023-10-18');
	export let title = 'notes on R';
	export let tags = ['r', 'geodata'];
</script>

<script>
</script>

<div class="h-full grid place-items-center content-center gap-2">
	<button class="text-3xl font-bold text-black">Click here</button>
	<a
		class="
	text-white
	bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600
		text-4xl rounded-md px-8 py-4"
		href="https://livrosrk.github.io/Rbook/"
		target="_blank"
		>Some things I frequently need in <span style="color: darkblue; font-weight: bold;">R</span></a
	>
</div>

<style>
	a {
		box-shadow: 0 0 5px 5px inset #f2f2f2;
		background: cornflowerblue;
		position: relative;
	}

	a::before {
		content: '';
		position: absolute;
		inset: -20px;
		transform: translate(10px, 8px);
		z-index: -2;
		filter: blur(20px);
		background: cornflowerblue;
		transition: background 500ms;
	}

	a:hover::before {
		background: darkblue;
	}
</style>
