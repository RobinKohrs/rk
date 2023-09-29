export const load = async () => {
	const posts_paths = Object.keys(import.meta.glob('/src/routes/posts/*/+page.svelte'));

	const unsorted_posts = await Promise.all(
		posts_paths.map(async (path) => {
			const link = path.split('/').at(-2) ?? '';
			const path_to_component = `../routes/posts/${link}/+page.svelte`;
			const component = await import(path_to_component);
			console.log('component: ', component);
			const { title, date } = component;
			return { link, title, date };
		})
	);

	const posts = unsorted_posts.sort((p, q) => q.date.getTime() - p.date.getTime());

	return { posts };
};
