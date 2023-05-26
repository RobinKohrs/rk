---
title: Fahrradpumpen in Wien!
description: another description
date: '2023-5-21'
categories:
  - Vienna
  - Where
  - Are things
published: true
thumbnail: /images/posts/thumbnails/danube.JPG
bg_position: 50% 50%
---

<script>
  import  SimplePoints from "$lib/maps/simplePoints.svelte"

let data_paths = [
		{
			label: 'Fahrradpumpen',
			path: '/data/geo/fahrradpumpen/pumpen.geojson',
            style: {
                    "color": "#ff7800",
                    "weight": 5,
                    "opacity": 0.65
            }
		}
	];

</script>

<h1 style="text-align: center; font-size: 3rem;">
Because I need it wayyy to often...
</h1>
<SimplePoints {data_paths} selected={"Fahrradpumpen"} />
