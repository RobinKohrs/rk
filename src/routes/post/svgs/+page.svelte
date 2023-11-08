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
	<div
		class="post-wrapper h-screen gap-2"
		style="grid-template-rows: minmax(0,1fr), 50px, minmax(0,1fr);"
	>
		<div class="border-2 border-red-400" style=" overflow: hidden;">
			<SVG
				bind:viewbox_x
				bind:viewbox_y
				bind:viewbox_height
				bind:viewbox_width
				bind:svg_height
				bind:svg_width
			/>
		</div>

		<div class="legend flex justify-center gap-4">
			<span class=" text-red-400 break-words">SVG-Div-container</span>
			<span class=" text-black break-words">SVG-Container</span>
		</div>
		<div class="options-container overflow-scroll">
			<!-- <div class="options" style="width: 90%; margin: 0 auto;"> -->
			<Input bind:value={svg_height} placeholder={'100%'} label={'SVG Height'} />
			<Input bind:value={svg_width} placeholder={'100%'} label={'SVG Width'} />
			<fieldset class="input-container flex flex-wrap gap-2 justify-center">
				<legend> Viewport </legend>
				<div class="flex flex-col justify-between">
					<label for="viewbox_x">Viewbox x </label>
					<div>{viewbox_x}</div>
					<input
						autocomplete="off"
						id="viewbox_x"
						type="range"
						min="0"
						max="200"
						bind:value={viewbox_x}
					/>
				</div>
				<div class="flex flex-col justify-between">
					<label for="viewbox_y">Viewbox y</label>
					<div>{viewbox_y}</div>
					<input autocomplete="off" id="viewbox_y" type="range" bind:value={viewbox_y} />
				</div>
				<div class="flex flex-col justify-between">
					<label for="viewbox_width">Viewbox width</label>
					<div>{viewbox_width}</div>
					<input autocomplete="off" id="viewbox_width" type="range" bind:value={viewbox_width} />
				</div>
				<div class="flex flex-col justify-between">
					<label for="viewbox_height">Viewbox height</label>
					<div>{viewbox_height}</div>
					<input autocomplete="off" id="viewbox_height" type="range" bind:value={viewbox_height} />
				</div>
			</fieldset>
			<!-- </div> -->
		</div>
	</div>
</Post>

<style>
	.input-container {
		margin: 1rem 0;
		border: 2px solid black;
	}
	input {
		text-align: center;
		height: 2.15rem;
		border: 1px solid black;
		background: transparent;
		border-radius: 0.25rem;
		padding: 0.5rem 1rem;
		width: 100%;
	}

	input:focus {
		outline: none;
	}
</style>
