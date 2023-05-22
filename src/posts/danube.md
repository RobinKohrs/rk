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

People who do not live close to the ocean face <strong>tough times</strong>. They say life is just better at the beach. Unfortunately Vienna is a little far from the Ocean.

<img src="/images/posts/danube/viennaSagres.png"   loading="lazy">

At least in Vienna there is water. The river that runs through the city is called <strong>Donau or Danube</strong>.

<img src="/images/posts/danube/danube.png"   loading="lazy">

So the most important aspect when living in Vienna is to live close to the river. Or at least somwhere, where public transport brings you quickly there. I figured there are three main stations right next to the Donau. <strong>U1 Neue Donau</strong>, <strong>U1 Donauinsel</strong> and <strong>U2 Donaustradtbrücke</strong>

So I took 1000 Points and the HERE-Public tansport API to simluate how long it takes me to get to each of them if I leave my house on the 27th of May in 2023 at 12 (noon). These are the points and you can see the three stations.

<img src="/images/posts/danube/thin_lines.png"  srcset="/images/posts/danube/thin_lines.png 900w, /images/posts/danube/thin_lines_600.png 600w" loading="lazy">

This probably does not make any sense, but here you go!

<div class="item">
<MapLeaflet data_paths={data_paths} />
</div>

<div style="text-align: center">
  Very important thread here!
</div>
<img src="/images/posts/danube/rainbow_vienna.png"   loading="lazy">

<style>
  img {
    margin-block: 2rem;
  }
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
