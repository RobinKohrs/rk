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
		min-height: 100%;
		position: relative;
		max-width: min(100%, 900px);
		margin-inline: auto;
	}
</style>
