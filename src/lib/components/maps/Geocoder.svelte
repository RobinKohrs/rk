<script>
	import Geocoder from './Geocoder.svelte';
	import * as maptilersdk from '@maptiler/sdk';
	import { GeocodingControl } from '@maptiler/geocoding-control/maptilersdk';
	import '@maptiler/sdk/dist/maptiler-sdk.css';
	import '@maptiler/geocoding-control/style.css';

	maptilersdk.config.apiKey = '';
</script>

Geocoder
