<script>
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	const dispatch = createEventDispatcher();

	// FUSE
	import Fuse from 'fuse.js';

	// icons
	import { search, clear } from './../../assets/icons';

	export let options;
	export let searchable;
	export let suggestions = [];

	let search_term;

	function clearSuggestions(e) {
		suggestions = [];
		search_term = '';
	}

	let fuse;
	$: if (searchable) {
		fuse = new Fuse(searchable, options);
	}

	// the current selcted item
	let selected_index = null;
	function handleKeyUp(event) {
		if ((search_term === '') | !search_term) {
			suggestions = [];
			return;
		}
		// get the suggestions
		suggestions = fuse.search(search_term).slice(0, 5);

		if (event.key === 'ArrowUp') {
			moveUp();
		}

		if (event.key === 'ArrowDown') {
			moveDown();
		}

		if (event.key === 'Enter') {
			goto_enter();
		}
	}

	function moveUp() {
		selected_index = Math.max(0, selected_index - 1);
	}

	function moveDown() {
		if (selected_index === null) {
			selected_index = 0;
			return;
		}
		selected_index = Math.min(suggestions.length - 1, selected_index + 1);
	}

	function goto_enter() {
		chooseSuggestion(selected_index);
	}
	function goto_click(i) {
		chooseSuggestion(i);
	}

	function chooseSuggestion(i) {
		dispatch('choose', suggestions[i]);
	}
</script>

<div class="search-container my-3 relative">
	<label for="tag-filter" style="display: block;">Filter articles for tags</label>
	<div
		class="flex relative h-12 rounded-lg overflow-hidden"
		style="box-shadow:0 0 15px 4px rgba(0,0,0,0.06); background-color: antiquewhite;"
	>
		<button class="absolute left-4" style="top: 50%; transform: translateY(-50%);"
			>{@html search}</button
		>
		<input
			bind:value={search_term}
			autocomplete="off"
			style="width: 100%;"
			class="px-12 py-2"
			id="tag-filter"
			placeholder="e.g. 'maps'"
			type="text"
			on:keyup={handleKeyUp}
		/>
		{#if search_term}
			<button
				on:click={clearSuggestions}
				class="absolute right-1"
				style="top: 50%; transform: translateY(-50%);">{@html clear}</button
			>
		{/if}
	</div>
	<ul transition:slide class="h-full suggestions-outer-container flex flex-col mt-1 relative">
		<div class="suggestions-inner-container absolute top-0">
			{#each suggestions as { item: suggestion }, i}
				<li
					on:click={() => goto_click(i)}
					class:selected={i === selected_index}
					transition:slide
					tabindex="0"
					style="width: 200px; margin: 5px auto; box-shadow:0 0 15px 4px rgba(0,0,0,0.06); background: rgba(255,255,255,.5)"
					class="suggestion py-2 rounded-md hover:cursor-pointer"
				>
					{suggestion.title}
				</li>
			{/each}
		</div>
	</ul>
</div>

<style>
	li.selected,
	li:hover {
		outline: 2px solid purple;
	}
</style>
