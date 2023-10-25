<script context="module">
	import SVG from './SVG.svelte';
	import Post from '../Post.svelte';
	export let date = new Date('2023-10-25');
	export let title = 'SVGs on the Web';
	export let tags = ['svg', 'css'];
	import Input from '$lib/components/Input.svelte';
</script>

<script>
	let svg_width;
	let svg_height;
	let viewbox_x;
	let viewbox_y;
	let viewbox_width;
	let viewbox_height;
</script>

<Post>
	<div class="post-wrapper grid grid-rows-2 h-screen gap-2">
		<div class="border-2 border-red-400" style=" overflow: hidden;">
			<span class="absolute top-0 right-0 inline-block p-2 text-red-400 break-words"
				>SVG-div-container</span
			>
			<SVG {svg_height} />
		</div>
		<div class="options-container overflow-scroll">
			<div class="options" style="width: 90%; margin: 0 auto;">
				<Input bind:value={svg_height} placeholder={'100%'} label={'SVG Height'} />
			</div>
		</div>
	</div>
</Post>
