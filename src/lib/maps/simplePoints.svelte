<script>
	import { onMount, afterUpdate, onDestroy, beforeUpdate } from 'svelte';
	import { browser, building, dev, version } from '$app/environment';

	// d3
	import { scaleLinear } from 'd3-scale';
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
		console.log('pointToLayer', L.pointToLayer);
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
		});
		currentLayer.addTo(map);
	}

	function createTooltip(f, layer) {
		layer.on('click', (e) => {
			handleFeatureClick(f, e);
		});

		layer.on('mouseover', function () {
			this.setStyle({
				fillColor: 'black'
			});
		});

		layer.on('mouseout', function () {
			let acc = `f.${data_options.dataAccessor}`;
			let color = scale(eval(acc));
			this.setStyle({
				fillColor: color
			});
		});
	}

	let clickedCoordinates;
	let clickedInMap = false;
	$: if (map && leafletPip) {
		map.on('click', (e) => {
			let { lat, lng } = e.latlng;
			clickedCoordinates = [lng, lat];
			leafletPip.pointInLayer(clickedCoordinates, currentLayer, true).length > 0
				? (clickedInMap = true)
				: (clickedInMap = false);
		});
	}

	let tooltip;
	function handleFeatureClick() {}
</script>

<svelte:head>
	<script src="https://unpkg.com/@mapbox/leaflet-pip@latest/leaflet-pip.js"></script>
</svelte:head>

<div class="container">
	<div id="map" />
</div>

<style>
	#map {
		height: 600px;
		width: 100%;
	}
</style>
