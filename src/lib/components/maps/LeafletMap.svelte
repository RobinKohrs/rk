<script>
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { browser } from '$app/environment';

	const dispatch = createEventDispatcher();

	let mapElement;
	let map;

	export let tile_layer_options = { ext: 'png', attribution: '' };
	export let tile_layer = {
		layer: 'https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.{ext}'
	};

	// map options
	export let set_view = [48.2183974, 16.3807465];
	export let zoom = 13;

	onMount(async () => {
		if (browser) {
			const L = await import('leaflet');
			map = L.map(mapElement, {
				preferCanvas: true
			}).setView(set_view, zoom);
			L.tileLayer(tile_layer.layer, tile_layer_options).addTo(map);

			L.Control.geocoder().addTo(map);
			dispatch('mapLoaded', map);
		}
	});

	onDestroy(async () => {
		if (map) {
			console.log('Unloading Leaflet map.');
			map.remove();
		}
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css"
	/>
	<script src="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"></script>
</svelte:head>

<div id="map" bind:this={mapElement} />

<style>
	@import 'leaflet/dist/leaflet.css';

	#map {
		width: 100%;
		height: 100%;
	}
</style>
