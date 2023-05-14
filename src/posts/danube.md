---
title: How long to Donau?!
description: this is the description.
date: '2023-5-07'
categories:
  - donauinsel
  - surfing
  - SEO
published: true
thumbnail: /images/posts/thumbnails/danube.JPG
bg_position: 50% 50%
---

<script>
  import  MapLeaflet from "$lib/maps/MapLeaflet.svelte"
let data_paths = [
  "/data/geo/vienna_danube/donau.geojson",
  "/data/geo/vienna_danube/donaustadtbruecke.geojson",
  "/data/geo/vienna_danube/donauinsel.geojson"
]
</script>

### Problem:

People who do not live close to the ocean face <strong>tough decisions</strong>. Either move to the ocean or enjoy the city while always claiming that <strong>life at the ocean is simply better</strong> but not having the courage of actually changing things.

> Map of distance to Portugal

At least in Vienna there is water. The river that runs through the city is called <strong>Donau or Danube</strong>.

> map of donau

<img src="/images/posts/thin_lines.png"  srcset="/images/posts/thin_lines.png 900w, /images/posts/thin_lines_600.png 600w" loading="lazy">

<div class="item">
<MapLeaflet data_paths={data_paths} />
</div>

<style>
  .item {
    padding-block: 2rem;
  }

  p {
    padding-block: 1rem;
  }

h3 {
  text-align: center;
  font-size: 1.5rem;
  padding-block: 2rem;
}

</style>
