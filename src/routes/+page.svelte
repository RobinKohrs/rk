<script>
	import { landing_page_folders, title } from '$lib/config';
</script>

<h2>{title}</h2>
{#each landing_page_folders as { name, slug }, i}
	<a href={`${slug}`}>
		<button class="folder">
			{name}
		</button>
	</a>
{/each}

<footer>&copy; RCE</footer>

<style lang="scss">
	h2 {
		color: var(--brand);
		margin-block: 2rem;
		text-align: center;
	}

	.folder {
		padding-inline: 3rem;
		padding-block: 2rem;
		border: 1px solid #ccc;
		border-radius: 0.3rem;
		margin-block: 1rem;
		width: 100%;

		@media (prefers-color-scheme: dark) {
			border: 1px solid #a8a8a8;
		}
	}

	footer {
		margin-block-start: 2rem;
		text-align: center;
	}
</style>
