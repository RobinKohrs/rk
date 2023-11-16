import Nominatim from "nominatim-geocoder";
let gc = new Nominatim()

export async function GET(event) {
  gc.search( { q: 'Berlin, Germany' }, {}, function(error, response) {
  console.log(error, response)
  })
  return new Response(JSON.stringify(event.url.query))
}
