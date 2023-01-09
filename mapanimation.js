mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lueWVzMjgiLCJhIjoiY2xiazlmczh4MTNpdDNwbGNrZml2NWt0byJ9.7j4x_Q0UZQv3rJSSlJbTww'

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.101,42.365],
    zoom: 13.5
})

const busStops = [
    [-71.093729, 42.359244],
    [-71.094915, 42.360175],
    [-71.0958, 42.360698],
    [-71.099558, 42.362953],
    [-71.103476, 42.365248],
    [-71.106067, 42.366806],
    [-71.108717, 42.368355],
    [-71.110799, 42.369192],
    [-71.113095, 42.370218],
    [-71.115476, 42.372085],
    [-71.117585, 42.373016],
    [-71.118625, 42.374863],
];

var markerMIT = new mapboxgl.Marker({"color": "#FF5733"})
    .setLngLat ([-71.09,42.3601])
    .addTo (map);
            
var markerHarvard = new mapboxgl.Marker({"color": "#FF5733"})
    .setLngLat ([-71.1167,42.3770])
    .addTo (map);
            

            
function showBusStops() {
    for (let counter1 = 0; counter1 <= busStops.length; counter1++) {
        let marker = new mapboxgl.Marker()
        .setLngLat (busStops[counter1])
        .addTo (map);
    }   
};

async function trackBus(){   
    const locations = await getBusRealPosition();
    console.log(new Date());
    console.log(locations);
    var markerBus = new mapboxgl.Marker({"color": "#E333FF"})
    .setLngLat ([locations[0].attributes.longitude,locations[0].attributes.latitude])
    .addTo (map);
    setTimeout(trackBus, 20000);
};

async function getBusRealPosition(){
    const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    const response = await fetch(url);
    const json = await response.json();
    return json.data;
};