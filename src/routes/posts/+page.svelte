<script>
	export let data;
</script>

{#if data}
	this is the posts landing page
	<div>there are {data.posts.length} posts</div>
{/if}
