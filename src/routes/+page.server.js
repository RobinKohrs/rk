export const load = async () => {
	const posts_paths = Object.keys(import.meta.glob('/src/routes/post/*/+page.svelte'));
	console.log('pp: ', posts_paths);

	const unsorted_posts = await Promise.all(
		posts_paths.map(async (path) => {
			const link = path.split('/').at(-2) ?? '';
			console.log('link: ', link);
			const component = await import(`../routes/post/${link}/+page.svelte`);
			console.log('comp: ', component);
			const { title, date } = component;
			return { link, title, date };
		})
	);

	console.log('posts: ', unsorted_posts[1].date);
	const posts = unsorted_posts.sort((p, q) => q.date.getTime() - p.date.getTime());

	return { posts };
};
