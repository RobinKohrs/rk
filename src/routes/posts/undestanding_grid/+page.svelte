<script context="module">
	import { dictionary } from './../../../../.svelte-kit/generated/client/app.js';
	import Post from '../Post.svelte';
	export let title = 'Understanding Grid';
	export let date = new Date('2023-09-29');
	export let tags = ['css'];

	// an array for the grid
	let arr = Array.from({ length: 4 });
</script>

<Post {title} {date}>
	<h2>The Problem</h2>
	<p spellcheck="true">
		I do not understand grid. I mean I kind of understand it, but not really. It seems that the more
		I think about it, the less I understand. Some questions I have are:
	</p>
	<ul class="list-disc pl-6">
		<li class="">
			How does the grid definition of the number of explicit rows and tracks is related to the
			actual markup?
		</li>
		<li class="">How is the size of the grid-elements determined?</li>
	</ul>

	<h2>Basic Grid</h2>
	<p>Only putting grid on a parent does not change that much..</p>
	<div class="gc">
		{#each arr as gi, i}
			<div class="gi">{i}</div>
		{/each}
	</div>
	<h2>Grid Template columns</h2>
	<h3><pre>repeat(auto-fit, minmax(20px, 1fr))</pre></h3>
	<div class="gc auto-fit">
		{#each arr as gi, i}
			<div class="gi">{i}</div>
		{/each}
	</div>
	<h3><pre>repeat(auto-fill, minmax(20px, 1fr))</pre></h3>
	<div>
		If you drag the container really wide, the items will actually shrink again. This is (to my
		understanding) because another item of 20px would theoretically fit inside. As there is none
		there is just blank space. In <pre style="display: inline;">auto-fit</pre>
		the items would just continue to stretch!
	</div>
	<div class="gc auto-fill">
		{#each arr as gi, i}
			<div class="gi">{i}</div>
		{/each}
	</div>
	<h3>What if one of them has a loooot of content?</h3>
	<p>
		Let's see what happens to the grid with the repeat(auto-fit, minmax(0, 1fr)); definition . You
		can edit the cell directly!
	</p>
	<div class="gc auto-fit">
		{#each arr as gi, i}
			<div contenteditable class="gi">
				{i === 2 ? 'a whole lot of unneccessary(??) content' : i}
			</div>
		{/each}
	</div>
	<div>
		hmmm, maybe break the words to split the word 'unneccessary'? Just setting
		<pre>hypens: auto</pre>
		changes this. However,
		<pre>hypen: auto;</pre>
		might bot be very safe and depends on each language! Better look into
		<pre>word-break</pre>
		and
		<pre>white-space</pre>
		properties.
	</div>
	<div class="gc auto-fit">
		{#each arr as gi, i}
			<div contenteditable class="gi" style="hyphens: auto;">
				{i === 2 ? 'a whole lot of unneccessary(??) content' : i}
			</div>
		{/each}
	</div>
	<h2>Overlapping Stuff</h2>
	<div>
		Just setting <pre>grid-column: 2/4</pre>
		on the second items does not seem to work...
	</div>
	<div class="gc auto-fit">
		{#each arr as gi, i}
			<div
				contenteditable
				class="gi"
				style="hyphens: auto; "
				style:grid-column={i === 2 ? '2/4' : 'auto'}
			>
				{i === 2 ? 'a whole lot of unneccessary(??) content' : i}
			</div>
		{/each}
	</div>
	<div>
		I think there are several problems First lets define a 3x3 grid. So not auto-fit or fill...
		Instead hardcode the amount of cols and rows. Still... Only assigning <pre>grid-column: 2/4</pre>
		to the second items does no change anything
	</div>
	<div class="grid grid-cols-3 grid-rows-3 h-[200px] gap-1">
		{#each Array(9) as gi, i}
			<div
				class="border-2 border-purple-600 rounded-md grid place-items-center"
				style:grid-column={i === 2 ? '2/4' : 'auto'}
			>
				{i}
			</div>
		{/each}
	</div>
	<div>
		There are a couple more options. E.g. setting <pre>grid-auto-flow: dense</pre>
	</div>
	<div class="grid grid-cols-3 grid-rows-3 h-[200px] gap-1 grid-flow-dense">
		{#each Array(9) as gi, i}
			<div
				class="border-2 border-purple-600 rounded-md grid place-items-center"
				style:grid-column={i === 2 ? '2/4' : 'auto'}
			>
				{i}
			</div>
		{/each}
	</div>
	<div>We have to explicitly set grid-row and grid-col for all elements!</div>
	<div class="grid grid-cols-3 grid-rows-3 h-[200px] gap-1">
		<div style="grid-column: 2/4; grid-row: 1/2; opacity: .5; border: 1px solid purple;" />
		<div style="grid-column: 2/3; grid-row: 1/4; opacity: .5; border: 1px solid purple;" />
	</div>
</Post>

<style>
	h1 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		margin-top: 1.5rem;
		text-decoration: underline;
	}
	h2 {
		font-size: 1.2rem;
		margin-bottom: 1rem;
		margin-top: 1.2rem;
		text-decoration: underline;
	}
	h3 {
		font-size: 1.1rem;
		margin-bottom: 1rem;
		margin-top: 1.1rem;
		text-decoration: underline;
	}

	pre {
		display: inline;
		white-space: break-spaces;
		word-wrap: break-word;
	}

	div,
	p {
		line-height: 1.7;
		margin: 1rem 0;
	}

	/* the divs in the grids */
	div > div {
		margin: 0;
		background-color: pink;
	}

	/* grid container */
	.gc {
		display: grid;
		border-radius: 0.25rem;
		padding: 0.5rem;
		background-color: var(--color-text);
		gap: 0.5rem;
		resize: both;
		overflow: auto;
	}

	/* grid item */
	.gi {
		display: grid;
		place-items: center;
		color: var(--color-text);
		border-radius: 0.5rem;
		padding: 0.5rem;
	}

	.auto-fit {
		grid-template-columns: repeat(auto-fit, minmax(20px, 1fr));
	}

	.auto-fill {
		grid-template-columns: repeat(auto-fill, minmax(20px, 1fr));
	}
</style>
