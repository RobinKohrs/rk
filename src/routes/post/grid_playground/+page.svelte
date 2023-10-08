<script context="module">
	import Post from '../Post.svelte';
	import GridOptions from './GridOptions.svelte';
	export let date = new Date('2023-10-06');
	export let title = 'Grid Playground';
</script>

<script>
	import { onMount } from 'svelte';
	let width;
	$: mobile = width < 750;
	let arr;
	$: if (number_of_items) {
		arr = Array.from({ length: number_of_items });
	}

	// show options
	let show_options = false;
	function toggleOptions() {
		show_options = !show_options;
	}

	let ro;
	let gc;
	onMount(() => {
		gc = document.querySelector('.grid-container.relative');
		ro = new ResizeObserver((entries) => {
			for (let entry of entries) {
				let cont = entry.target;
				let fe = cont.querySelector('.copy-grid > div:nth-child(1)');
				single_item_height = fe.clientHeight;
			}
		});
	});

	$: if (gc) {
		ro.observe(gc);
	}

	// options
	let number_of_items = 13;
	let item_height = '';
	let item_width = '';
	let gtc = 'repeat(auto-fit, minmax(100px, 1fr))';
	let gtr = '';
	let gar = '';
	let gap = '';
	let ac = '';
	let ai = '';
	let set_items_width;
	let set_items_height;

	// single item from the grid with no settings on the items themselfes
	let single_item_height;
</script>

<svelte:window bind:innerWidth={width} />

<Post {date} {title}>
	{#if arr}
		<div class="post-background fixed inset-0 bg-red-200">
			<div
				class="z-5 post-wrapper grid full-width fixed inset-0"
				style:grid-template-columns={mobile ? 'auto' : '30% auto'}
				style:grid-template-rows={mobile ? '30px 1fr' : '1fr'}
			>
				<div class="header" style:position={mobile ? '' : ''} style:top={mobile ? '' : '0'}>
					{#if mobile}
						<button on:click={toggleOptions}>Show Options</button>
						{#if show_options}
							<div class="fixed inset-0 z-10 bg-white opacity-95">
								<GridOptions
									{mobile}
									bind:show_options
									bind:gtc
									bind:gtr
									bind:gar
									bind:gap
									bind:item_width
									bind:number_of_items
									bind:set_items_height
									bind:set_items_width
								/>
							</div>
						{/if}
					{:else}
						<GridOptions
							{mobile}
							bind:show_options
							bind:gtc
							bind:gtr
							bind:gar
							bind:gap
							bind:number_of_items
							bind:ac
							bind:ai
							bind:set_items_height
							bind:set_items_width
							bind:item_height
							bind:item_width
							bind:single_item_height
						/>
					{/if}
				</div>
				<div class="grid-container relative" style="resize: both; overflow: auto; ">
					<!-- identical grid definition, items are not sizes by width and height! -->
					<div
						class="copy-grid absolute inset-0 grid"
						style:gap
						style:grid-template-columns={gtc}
						style:grid-template-rows={gtr}
						style:grid-auto-rows={gar}
						style:align-content={ac}
						style:align-items={ai}
					>
						{#each arr as gi, i}
							<div
								contenteditable
								class="bg-purple-100 opacity-50 border border-black grid place-items-center"
							>
								<span class="font-bold text-lg text-black">{i + 1}</span>
							</div>
						{/each}
					</div>

					<!-- same as above, but if setting width and height on items behaves differently -->
					<div
						class="real-grid grid absolute inset-0"
						style:gap
						style:grid-template-columns={gtc}
						style:grid-template-rows={gtr}
						style:grid-auto-rows={gar}
					>
						{#each arr as gi, i}
							<div
								contenteditable
								class="bg-purple-400 opacity-50 border border-black grid place-items-center"
								style:width={set_items_width ? `${item_width}` : 'auto'}
								style:height={set_items_height ? `${item_height}` : 'auto'}
							>
								<span class="font-bold text-lg text-black">{i + 1}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	{/if}
</Post>

<style>
	.copy-grid,
	.real-grid {
		transition: 500ms;
	}

	.grid > div {
		transition: 500ms;
	}
</style>
