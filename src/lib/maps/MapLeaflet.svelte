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

	export let data_paths = [];
	// use the coordinates of vienna as default
	export let inital_extent = [
		[48.086121, 16.140317],
		[48.337325, 16.542004]
	];

	// initially donaustadtbrücke
	let options = [
		{
			name: 'U2 Donaustadtbrücke',
			path: 'data/donaustadtbruecke.geojson',
			id: 'donaustadtbruecke'
		},
		{
			name: 'U1 Donauinsel',
			path: 'data/donauinsel.geojson',
			id: 'donauinsel'
		},
		{
			name: 'U1 alte Donau',
			path: 'data/donau.geojson',
			id: 'donau'
		}
	];

	let selected = 'donaustadtbruecke';
	$: if (filenames) {
		// options = Object.keys(filenames);
	}

	function get_extent(data, accessor) {
		let vals = Object.values(data);
		let vals_all = vals
			.map((v) => {
				let fs = v.features;
				let vals = fs.map((f) => {
					let val = eval(`f.${accessor}`);
					return val;
				});
				return vals;
			})
			.flat();
		let ext = d3.extent(vals_all);
		return ext;
	}

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

	let data_extent;
	let scale;
	let data = {};
	let filenames = {};
	async function loadData(data_paths) {
		for (let d of data_paths) {
			let filename = d.split('/').pop().split('.')[0];
			filenames[filename] = d;
			let data_raw = await fetch(d);
			let j = await data_raw.json();
			data[filename] = j;
		}

		data_extent = get_extent(data, 'properties.total');
		scale = d3.scaleLinear().domain(data_extent).range(['white', 'darkred']);
	}

	$: if (data_paths && browser) {
		loadData(data_paths);
	}

	let data_options;
	let currentLayer;
	$: if (map && data_paths && browser && data && scale) {
		data_options = {
			dataAccessor: 'properties.total',
			scale
		};

		currentLayer = L.geoJSON(data[selected], {
			style: (feature) => style(feature, data_options),
			onEachFeature: (f, layer) => createTooltip(f, layer)
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
	{#if options.length === data_paths.length}
		<div class="options-container flex flex-wrap gap-4 justify-center">
			{#each options as o}
				<!-- radio input -->
				<div>
					<label for={o.name}>{o.name}</label>
					<input type="radio" id={o.name} name="destination" value={o.id} bind:group={selected} />
				</div>
			{/each}
		</div>
	{/if}

	<div id="map" />
</div>

<style>
	#map {
		height: 600px;
		width: 100%;
	}
</style>
