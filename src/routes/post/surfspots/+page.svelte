<script context="module">
	import Post from '../Post.svelte';
	export let date = new Date('2023-11-8');
	export let title = 'Global Surfspots';
	export let tags = ['r', 'geodata'];
</script>

<script>
	import { csv } from 'd3-fetch';
	import LeafletMap from '$lib/components/maps/LeafletMap.svelte';
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';

	// load surf spots
	let surf_spots;
	onMount(() => {
		csv('/data/surf_spots.csv').then((d) => {
			surf_spots = d;
		});
	});

	let map;
	function handleMap(event) {
		map = event.detail;
	}

	$: if (surf_spots && map) {
		surf_spots.forEach((s, i) => {
			let cm = L.circleMarker([s.y, s.x], { radius: 12, color: 'red' });
			let popup_text = `<div style="font-size: 2rem; font-weight: bold;">${s.name}</span>`;
			cm.bindTooltip(popup_text);
			cm.addTo(map);
		});
	}
</script>

<Post>
	<div class="full-width w-[100%] h-screen">
		<LeafletMap on:mapLoaded={handleMap} set_view={[-22.948787528229474, -43.239910128238364]} />
	</div>
</Post>

<style>
</style>
