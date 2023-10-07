<script context="module">
	import Post from '../Post.svelte';
	import GridOptions from './GridOptions.svelte';
	export let date = new Date('2023-10-06');
	export let title = 'Grid Playground';
</script>

<script>
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

	// options
	let item_width = 50;
	let number_of_items = 13;
	let item_height = 50;
	let gtc = 'repeat(auto-fit, minmax(400, 1fr))';
	let gtr = 'repeat(10, 400px)';
	let gar = '100px';
	let gap = '.5rem';
	let set_items_width;
	let set_items_height = true;
</script>

<svelte:window bind:innerWidth={width} />

<Post {date} {title}>
	{#if arr}
		<div class="post-background fixed inset-0 bg-red-200">
			<div
				class="z-5 post-wrapper grid full-width fixed inset-0"
				style="resize: both; overflow: auto; "
				style:grid-template-columns={mobile ? 'auto' : '30% auto'}
				style:grid-template-rows={mobile ? '30px 1fr' : '1fr'}
			>
				<div class="header" style:position={mobile ? '' : 'sticky'} style:top={mobile ? '' : '0'}>
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
							bind:item_width
							bind:number_of_items
							bind:set_items_height
							bind:set_items_width
						/>
					{/if}
				</div>
				<div class="grid-container relative" style="">
					<!-- identical grid definition, items are not sizes by width and height! -->
					<div
						class="copy-grid absolute inset-0 grid"
						style:gap
						style:grid-template-columns={gtc}
						style:grid-template-rows={gtr}
						style:grid-auto-rows={gar}
					>
						{#each arr as gi, i}
							<div class="bg-purple-100 opacity-50 border border-black" />
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
								class="bg-purple-300 opacity-50 border border-black grid place-items-center"
								style:width={set_items_width ? `${item_width}px` : 'auto'}
								style:height={set_items_height ? `${item_height}px` : 'auto'}
							>
								<span class="font-bold text-lg text-black">{i}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	{/if}
</Post>

<style>
</style>
