---
title: Where in Vienna?
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

<SimplePoints {data_paths} selected={"Fahrradpumpen"} />
