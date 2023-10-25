<script context="module">
	import Post from './../Post.svelte';

	export let date = new Date('2023-10-11');
	export let title = 'Flexy Mini Tables';
	export let tags = ['css', 'c#', 'kidding'];
</script>

<script>
	// looks like data from a r dataframe
	// each observation one row
	let data = [
		{
			header: 'Votes in 2016',
			trump: 63,
			clinton: 65.8
		},
		{
			header: 'Votes in 2020',
			trump: 73,
			clinton: 78.5
		},
		{
			header: 'New Votes',
			trump: 10.1,
			clinton: 12.6
		}
	];

	// this is more managable
	let d1 = {
		year: ['Votes 2016', 'Votes 2020', 'new Votes'],
		trump: [63, 73, 78.5],
		other: [65.8, 78.5, 12.6]
	};
</script>

<Post>
	<div
		class="intro flex justify-center items-center text-white"
		style="aspect-ratio: 4/1; background-color: #00DBDE;
background-image: linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%);
letter-spacing: .2rem; text-transform: uppercase; font-size: clamp(1rem, 5vw, 10vw); text-align: center;
"
	>
		<span>Flexy Mini tables</span>
	</div>
	<h2>The issue</h2>
	<div class="example">
		<a href="https://www.nytimes.com/interactive/2020/11/16/us/politics/election-turnout.html"
			>This example</a
		>
		of the <span class="inline-block text-xl">New York Times</span> shows more or less that I want
		to do. Further down the page they have a little table which looks on my desktop like this:
		<img class="" src="/images/flexy_tables_1_dt.png" alt="" />
		<p>On mobile it looks like this:</p>
		<img class="" src="/images/flexy_tables_1_mb.png" alt="" />
		<p>Each of the rows on desktop is a flexbox. On mobile each of the columns is a flexbox:</p>
		<img class="" src="/images/flexy_tables_1_dev.png" alt="" />
	</div>
	<h2>The question</h2>
	<p class="cap-word">
		But how does it exactly work? How do they make sure that on desktop the width of the cells on
		each row keep aligned and on mobile the height of each cell across the columns keep aligned<span
			class="last-letter">?</span
		>
	</p>
	<h2>The data</h2>
	<div class="data">
		So this is the data we got:
		<pre>
			{JSON.stringify(data, undefined, 2)}
		</pre>
		This is how it would look if you would convert an<code>R</code>-dataframe to json with
		<code>jsonlite::toJSON(df)</code>. However, this is not ideal (at least in that usecase). This
		format would be easier to handle. IN THIS USECASE!
		<pre>
			{JSON.stringify(d1, undefined, 2)}
		</pre>
	</div>
	<h2
		style="
		color: white;
		border-radius: .25rem;
		padding: .5rem 0;
background-image: linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%);
	"
	>
		Enter Flexy Mini tables
	</h2>
	<div class="flexy-mini-tables">
		<h3>Lets just create a simple flexbox first</h3>
		<p>
			Here I just declare a flex container which changes its direction from row (on mobile) to col
			(after 750px) on the <span class="summary-box inline-block">container</span>. Also each
			<span class="row inline-block p-2">child</span> is a flex-box, which changes its direction from
			col (on mobile) to row (after 750px). But this does not do the job.
		</p>
		<div class="summary-box flex dt:flex-col my-2">
			{#each Object.keys(d1) as k}
				<div
					class="
				row {k === 'year' ? '_header' : k === 'trump' ? '_candTrump' : '_candBiden'}
				flex flex-col dt:flex-row
				"
				>
					{#each d1[k] as val}
						<div class="cell" contenteditable>{val}</div>
					{/each}
				</div>
			{/each}
		</div>
		<h2>Lets do this better</h2>
		<div
			class="summary-box flex dt:flex-col my-2
		"
			style="resize: both; overflow: auto;"
		>
			{#each Object.keys(d1) as k}
				<div
					class="
				row {k === 'year' ? '_header' : k === 'trump' ? '_candTrump' : '_candBiden'}
				flex flex-col dt:flex-row {k !== 'year' ? 'flex-1' : ''}
				"
				>
					{#each d1[k] as val}
						<div
							class="
							h-24
							cell
							{k === 'year' ? 'grid place-items-center' : ''}
							{k !== 'year' ? 'text-center' : ''}
							min-w-0
							dt:flex-1"
							contenteditable
						>
							<div
								class="color_{k}
							overflow-hidden
							overflow-ellipsis
							whitespace-nowrap
						"
								style:color={k === 'trump' ? '#cc3d41' : '#2982bd'}
								style="font-size: clamp(1.1rem, 1.5rem, 2rem);"
							>
								{#if k === 'year'}
									<span class=" text-gray-500 font-bold" style="font-size: 14px;">{val}</span>
								{:else}
									<strong class="block" style="font-size: 14px;">
										{k === 'trump' ? 'Trump' : k === 'other' ? 'Biden' : val}
									</strong>
									+ {val} <span class="text-sm block dt:inline">Million</span>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>

	<div class="my-10" />
</Post>

<style>
	.cap-word::first-letter {
		color: darkslategray;
		float: left;
		margin-right: 0.2rem;
		font-size: 4rem;
	}

	.summary-box {
		border: 1px solid rebeccapurple;
		padding: 0.5rem;
	}

	.row {
		border: 1px solid darkolivegreen;
	}

	ul {
		list-style: circle;
		margin-left: 1rem;
	}
	.cell {
		padding: 1rem;
	}
</style>
