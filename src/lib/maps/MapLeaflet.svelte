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
	function handleFeatureClick(f, e) {
		tooltip = f;
	}

	// shitty solution
	function closeModal() {
		clickedCoordinates = undefined;
	}
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

	<div id="map" class="relative z-0">
		<div class="map-controls absolute inset-0">
			{#if clickedCoordinates}
				<div
					class="map-tooltip absolute bg-white p-2 rounded-b-md"
					style="left: 0; right: 0; top: 0; height: 5rem; z-index: 1000;"
				>
					{#if !clickedInMap}
						Please click in the Map
					{:else}
						{tooltip.properties.total} Minuten
					{/if}

					<div class="close-modal" on:click|stopPropagation={closeModal}>X</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	#map {
		height: 600px;
		width: 100%;
	}

	.map-tooltip {
		pointer-events: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 2rem;
		background: rgb(255, 255, 255);
		background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 1) 0%,
			rgba(255, 255, 255, 0.7637255585828081) 95%,
			rgba(255, 255, 255, 0) 100%
		);
	}

	.close-modal {
		position: absolute;
		right: 0;
		top: 0;
		cursor: pointer;
		font-size: 20px;
		line-height: 20px;
		padding: 5px 5px;
		background-color: hsla(0, 0%, 0%, 0.2);
		border-radius: 0 0 0 5px;
	}
</style>
