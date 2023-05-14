<script>
	let inPresentation = false;
</script>

<button class="p-4 m-4 block mx-auto" on:click={() => (inPresentation = !inPresentation)}
	>Comecar a Apresentacao</button
>

{#if inPresentation}
	<div class="container fixed inset-0 bg-slate-300 grid place-items-center overflow-scroll">
		{#each Array(2) as slide, i}
			<div class="slide grid place-items-center">
				slide {i}
			</div>
		{/each}
	</div>
{/if}

<style lang="scss">
	.container {
		max-width: 100vw !important;

		& .slide {
			width: 100vw;
			height: 100vh;
		}
	}
</style>
