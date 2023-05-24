<script>
	import { onMount } from 'svelte';

	let images;
	onMount(async () => {
		images = await fetch('/api/images').then((res) => res.json());
	});
	$: console.log('images', images);
</script>

I'm abandoned
