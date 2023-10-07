<script context="module">
	import Post from '../Post.svelte';
	export let date = new Date('2023-10-06');
	export let title = 'Grid Playground';
</script>

<script>
	let arr = Array.from({ length: 13 });

	// show options
	let show_options = false;
	function toggleOptions() {
		show_options = !show_options;
	}

	// options
	let item_width = 50;
	let item_height = 50;
	let gtc = 'repeat(auto-fit, minmax(0, 1fr))';
	let gtr = 'repeat(auto-fit, minmax(0, 1fr))';
	let set_height_items = false;
	let set_width_items = false;
</script>

<Post {date} {title}>
	<div class="post-background fixed inset-0 bg-red-200">
		<div
			class="post-wrapper full-width grid fixed inset-0 m-12 border-2 border-black"
			style="resize: both; overflow: auto; gap: .2rem;"
			style:grid-template-columns={gtc}
			style:grid-template-rows={gtr}
		>
			<button class="toggle-options fixed top-0 left-0 m-4" on:click={toggleOptions}>Options</button
			>
			{#if show_options}
				<form class="options-container fixed bg-white opacity-95 inset-0 z-10">
					<div class="options header flex justify-around">
						<h2>Options for the grid</h2>
						<button on:click={toggleOptions}>X</button>
					</div>
					<fieldset class="options-grid-container">
						<legend>Options for the grid container</legend>
						<label>
							<span>grid-template-columns</span>
							<input type="text" placeholder={gtc} bind:value={gtc} />
						</label>
						<label>
							<span>grid-template-rows</span>
							<input type="text" placeholder={gtr} bind:value={gtr} />
						</label>
					</fieldset>
					<fieldset class="options-all-childs">
						<legend>Options for childs</legend>
						<label>
							<div class="flex justify-around">
								<span> Set Height for each items in Pixel? </span>
								<button
									on:click={() => (set_height_items = !set_height_items)}
									style="width: 20px; height: 20px; border-radius: 50%; display: inline-block; border: 1px solid black;"
									style:background-color={set_height_items ? 'black' : 'transparent'}
								/>
							</div>
							{#if set_height_items}
								<input type="range" name="" id="" />
							{/if}
						</label>
					</fieldset>
				</form>
			{/if}
			{#each arr as gi, i}
				<div
					contenteditable
					class="bg-purple-300 opacity-50 border border-black"
					style:width={`${item_width}px`}
					style:height={`${item_height}px`}
				>
					{i}
				</div>
			{/each}
		</div>
	</div>
</Post>

<style>
	label,
	input {
		display: block;
		width: 100%;
		text-align: center;
	}

	input {
		padding: 0.5rem 1rem;
	}
	label > span {
		font-size: 1.2rem;
		font-weight: 500;
		background-color: rgba(50, 50, 50, 0.1);
		display: inline-block;
		padding: 0.1rem 0.2rem;
		border-radius: 0.1rem;
	}

	form {
		& h2 {
			font-size: 1.5rem;
			text-decoration: underline;
		}
		& fieldset {
			& > * {
				margin: 0.4rem 0;
			}
			& legend {
				font-weight: 900;
				font-size: 1.3rem;
				letter-spacing: 0.2rem;
			}
			border: 2px solid #acacac;
			margin: 1rem 0;
		}
	}
</style>
