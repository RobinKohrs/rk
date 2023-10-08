<script>
	import { fly, slide } from 'svelte/transition';

	export let mobile;

	//  options
	export let show_options;
	export let number_of_items;
	export let gtc;
	export let gtr;
	export let gar;
	export let gap;
	export let ac;
	export let ai;
	export let set_items_width;
	export let set_items_height;

	// on the items themselfes
	export let item_height;
	export let item_width;

	// accept possible item height
	export let single_item_height;

	// show menus
	let show_grid_container_options;
	let show_items_options;
	let show_item_count;
</script>

<!-- <button class="toggle-options fixed top-0 left-0 m-4" on:click={toggleOptions}
					>Options</button
				> -->
<div class="options-container px-2 max-h-screen overflow-scroll">
	<form action="" class="options-form max-w-md mx-auto">
		<div class="header flex justify-around">
			<h2>Grid Options</h2>
			{#if mobile}
				<button on:click={() => (show_options = false)}>X</button>
			{/if}
		</div>
		<fieldset class="options-count-items">
			<legend on:click={() => (show_item_count = !show_item_count)}>
				<span>Number of items</span>
				<span
					class="open-indicator"
					style:transform={show_item_count ? 'rotate(90deg)' : 'rotate(270deg)'}>&gt;</span
				>
			</legend>
			{#if show_item_count}
				<div class="fieldset-content" transition:slide>
					<div class="text-center text-lg">{number_of_items}</div>
					<label>
						<input
							type="range"
							placeholder={number_of_items}
							bind:value={number_of_items}
							min="0"
							max="30"
						/>
					</label>
				</div>
			{/if}
		</fieldset>
		<fieldset class="options-grid-container">
			<legend on:click={() => (show_grid_container_options = !show_grid_container_options)}
				><span>Grid container</span>
				<span
					class="open-indicator"
					style:transform={show_grid_container_options ? 'rotate(90deg)' : 'rotate(270deg)'}
					>&gt;</span
				></legend
			>
			{#if show_grid_container_options}
				<div class="fieldset-content" transition:slide>
					<label>
						<span>grid-template-columns</span>
						<input type="text" bind:value={gtc} />
					</label>
					<label>
						<span>grid-template-rows</span>
						<input type="text" placeholder="1fr 1fr" bind:value={gtr} />
					</label>
					<label>
						<span>grid-auto-rows</span>
						<input type="text" placeholder="1fr" bind:value={gar} />
					</label>
					<label>
						<span>gap</span>
						<input type="text" placeholder="1rem" bind:value={gap} />
					</label>
					<label>
						<span>align-content</span>
						<input type="text" placeholder="center" bind:value={ac} />
					</label>
					<label>
						<span>align-items</span>
						<input type="text" placeholder="center" bind:value={ai} />
					</label>
				</div>
			{/if}
		</fieldset>
		<fieldset class="options-all-childs">
			<legend on:click={() => (show_items_options = !show_items_options)}>
				<span>Options for childs</span>
				<span
					class="open-indicator"
					style:transform={show_items_options ? 'rotate(90deg)' : 'rotate(270deg)'}>&gt;</span
				>
			</legend>
			{#if show_items_options}
				<div class="fieldset-content" transition:slide>
					<label>
						<div class="flex justify-around">
							<span> Set Height for each items in Pixel? </span>
							<button
								on:click={() => (set_items_height = !set_items_height)}
								style="width: 20px; height: 20px; border-radius: 50%; display: inline-block; border: 1px solid black;"
								style:background-color={set_items_height ? 'black' : 'transparent'}
							/>
						</div>
						{#if set_items_height}
							<input transition:slide type="text" placeholder="50px" bind:value={item_height} />
						{/if}
					</label>
					<label>
						<div class="flex justify-around">
							<span> Set Width for each items in Pixel? </span>
							<button
								on:click={() => (set_items_width = !set_items_width)}
								style="width: 20px; height: 20px; border-radius: 50%; display: inline-block; border: 1px solid black;"
								style:background-color={set_items_width ? 'black' : 'transparent'}
							/>
						</div>
						{#if set_items_width}
							<input transition:slide type="text" placeholder="50px" bind:value={item_width} />
						{/if}
					</label>
				</div>
			{/if}
		</fieldset>
	</form>
</div>

<style>
	label,
	input {
		display: block;
		width: 100%;
		text-align: center;
		margin-block-end: 1rem;
	}

	input {
		padding: 0.5rem 1rem;
		width: 95%;
		margin-inline: auto;
	}
	label > span {
		font-size: 1.2rem;
		font-weight: 500;
		background-color: rgba(50, 50, 50, 0.1);
		display: inline-block;
		padding: 0.1rem 0.2rem;
		border-radius: 0.1rem;
	}

	h2 {
		font-size: 2rem;
		text-decoration: underline;
		margin: 2rem 0;
	}
	fieldset {
		border: 2px solid #acacac;
		margin-block: 1rem;
		padding-block: 1rem;
	}

	fieldset:hover {
		cursor: pointer;
	}

	legend {
		width: 90%;
		padding-inline: 1rem;
		font-weight: 900;
		font-size: 1.3rem;
		letter-spacing: 0.2rem;
		display: flex;
		justify-content: space-between;

		& .open-indicator {
			transition: 0.5s;
		}
	}
</style>
