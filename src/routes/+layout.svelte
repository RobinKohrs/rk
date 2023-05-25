<script>
	import '../app.css';
	import 'open-props/style';
	// import 'open-props/normalize';
	import 'open-props/buttons';
</script>

<div class="app-container">
	<slot />
</div>

<style lang="scss">
	.app-container {
		height: 100%;
		min-height: 100%;
		position: relative;
		max-width: min(100%, 900px);
		margin-inline: auto;
		// padding-inline: 1rem;
	}
</style>
