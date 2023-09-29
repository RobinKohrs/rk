<script>
	import { onMount, afterUpdate, onDestroy, beforeUpdate } from 'svelte';
	import { browser, building, dev, version } from '$app/environment';

	// d3
	import { scaleLinear } from 'd3';
	import { extent } from 'd3';
	const d3 = { scaleLinear, extent };

	// leaflet
	// import functions
	import { style } from '$lib/utils/mapUtils.js';

	export let selected;
	export let data_paths = [];

	// use the coordinates of vienna as default
	export let inital_extent = [
		[48.086121, 16.140317],
		[48.337325, 16.542004]
	];

	// initially donaustadtbrücke

	let map;
	onMount(async () => {
		const L = await import('leaflet');
		await import('leaflet/dist/leaflet.css');

		// Initialize the map
		map = L.map('map').fitBounds(inital_extent, { padding: [20, 20] });
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: 'Map data &copy; OpenStreetMap contributors'
		}).addTo(map);
	});

	let dataLoaded = false;
	let data = {};
	async function loadData(data_paths) {
		for (let d of data_paths) {
			let path = d.path;
			let filename = d.label;
			let data_raw = await fetch(path);
			let j = await data_raw.json();
			data[filename] = j;
		}
		dataLoaded = true;
	}

	$: if (data_paths && browser) {
		loadData(data_paths);
	}

	let data_options;
	let currentLayer;
	$: if (map && data_paths && browser && dataLoaded) {
		// currentLayer = L.geoJSON(data[selected], {
		// 	style: { color: '#ff7800', weight: 20, radius: 20, opacity: 1 },
		// 	onEachFeature: (f, layer) => createTooltip(f, layer)
		// });
		currentLayer = L.geoJSON(data[selected], {
			pointToLayer: function (feature, latlng) {
				return new L.CircleMarker(latlng, {
					radius: 10,
					fillOpacity: 0.85,
					opacity: 0.5,
					stroke: true,
					fill: false,
					color: 'purple',
					strokeWidth: 3
				});
			}
		}).on('click', handleFeatureClick);
		currentLayer.addTo(map);
	}

	let clickedCoordinates;
	let clickedInMap = false;
	$: if (map) {
		map.on('click', (e) => {
			let { lat, lng } = e.latlng;
			clickedCoordinates = [lng, lat];
			leafletPip.pointInLayer(clickedCoordinates, currentLayer, true).length > 0
				? (clickedInMap = true)
				: (clickedInMap = false);
		});
	}

	let tooltip;
	function handleFeatureClick(f) {
		console.log('f: ', f.layer);
	}

	function useOwnLocation() {
		map
			.locate({ setView: true, watch: true }) /* This will return map so you can do chaining */
			.on('locationfound', function (e) {
				var marker = L.marker([e.latitude, e.longitude]).bindPopup('Your are here :)');
				var circle = L.circle([e.latitude, e.longitude], e.accuracy / 2, {
					weight: 1,
					color: 'blue',
					fillColor: '#cacaca',
					fillOpacity: 0.2
				});
				map.addLayer(marker);
				map.addLayer(circle);
			})
			.on('locationerror', function (e) {
				console.log(e);
				alert('Location access denied.');
			});
	}

	function backToVienna() {
		// fit map to bounds of vienna, austria
		map.stopLocate();
		map.fitBounds(inital_extent, { padding: [20, 20] });
	}
</script>

<svelte:head>
	<script src="https://unpkg.com/@mapbox/leaflet-pip@latest/leaflet-pip.js"></script>
</svelte:head>

<div class="flex justify-center">
	<button class="p-4 bg-slate-400 m-2" on:click={useOwnLocation}>Use own location!</button>
	<button class="p-4 bg-slate-400 m-2" on:click={backToVienna}>Jump back to Vienna</button>
</div>
<div class="map-container">
	<div id="map" />
</div>

<style>
	#map {
		height: 600px;
		width: 100%;
		margin: 0 auto;
	}
</style>
