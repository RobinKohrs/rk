<script>
	export let placeholder = 'placeholder';
	let _placeholder = placeholder;
	export let label = 'label';
	export let id = 'id';
	export let value;
</script>

<fieldset class="input-container flex-wrap p-2">
	<legend>
		<label for={id}>{label}</label>
	</legend>
	<input
		autocomplete="off"
		{id}
		type="text"
		{placeholder}
		on:blur={() => (placeholder = _placeholder)}
		on:focus={() => (placeholder = '')}
		bind:value
	/>
</fieldset>

<style>
	.input-container {
		margin: 1rem 0;
		border: 2px solid black;
	}
	input {
		text-align: center;
		height: 2.15rem;
		background: transparent;
		border-radius: 0.25rem;
		padding: 0.5rem 1rem;
		width: 100%;
	}

	input:focus {
		outline: none;
	}
</style>
