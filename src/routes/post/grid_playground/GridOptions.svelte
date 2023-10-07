<script>
	export let mobile;

	//  options
	export let show_options;
	export let number_of_items;
	export let gtc;
	export let gtr;
	export let gar;
	export let set_items_width;
	export let set_items_height;
</script>

<!-- <button class="toggle-options fixed top-0 left-0 m-4" on:click={toggleOptions}
					>Options</button
				> -->
<div class="options-container px-2">
	<form action="" class="options-form max-w-md mx-auto">
		<div class="header flex justify-around">
			<h2>Grid Options</h2>
			{#if mobile}
				<button on:click={() => (show_options = false)}>X</button>
			{/if}
		</div>
		<fieldset class="options-count-items">
			<legend>
				<span>Number of items</span>
			</legend>
			<label>
				<input
					type="range"
					placeholder={number_of_items}
					bind:value={number_of_items}
					min="0"
					max="30"
				/>
			</label>
		</fieldset>
		<fieldset class="options-grid-container">
			<legend>Grid container</legend>
			<label>
				<span>grid-template-columns</span>
				<input type="text" placeholder={gtc} bind:value={gtc} />
			</label>
			<label>
				<span>grid-template-rows</span>
				<input type="text" placeholder={gtr} bind:value={gtr} />
			</label>
			<label for="">
				<span>grid-auto-rows</span>
				<input type="text" placeholder={gar} bind:value={gar} />
			</label>
		</fieldset>
		<fieldset class="options-all-childs">
			<legend>Options for childs</legend>
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
					<input type="range" name="" id="" />
				{/if}
			</label>
		</fieldset>
	</form>
</div>

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
			font-size: 2rem;
			text-decoration: underline;
			margin: 2rem 0;
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
