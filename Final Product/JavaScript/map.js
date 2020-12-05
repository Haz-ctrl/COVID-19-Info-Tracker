// Set the width of the side navigation to 250px. 60% Opacity
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.6)";

  }
  
// Set the width of the side navigation to 0. Return background color to normal
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.body.style.backgroundColor = "#222";
    document.getElementById("menu").src = "sidenav1.jpg"; 
}

async function mapInit() {

  //GeoJSON source for pulling longitude and latitude for each country
  //A secondary source will be pulled from for data sets.
  var url = 'https://www.trackcorona.live/api/countries';
  const response = await fetch(url);
  const data = await response.json()

  //Mapbox Credentials
  mapboxgl.accessToken = 'pk.eyJ1IjoiaGF6LWN0cmwiLCJhIjoiY2tnbW9jeXpzMG02aTJxcnhob2ZrYTg2MyJ9.rM4dp2SRD-QTUmCtm8ZyLw';

  //Create a new map with dark them, 0, 40 center, and zoomed out to level 1.2.
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [0, 40],
    zoom: 1.2
  });

  //This loops for the number of countries in the json.
  for (i = 0; i < 230; i++) {

    //Convert to strings so that the numbers are easier to read.
    const cases = (data.data[i].confirmed).toLocaleString('en')
    const deaths = (data.data[i].dead).toLocaleString('en')
    const recoveries = (data.data[i].recovered).toLocaleString('en')

    //Popup will contain the country name, cases, deaths and recoveries. 
    var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h5>${data.data[i].location}</h5> <br>
      Cases: ${cases} <br>
      Deaths: ${deaths} <br>
      Recoveries: ${recoveries}` 
    );

    //Apply the ID marker. This will ensure style rules for the arker are applied.
    var el = document.createElement('div');
    el.id = 'marker';

    //Finally, add the marker to the map, with the longitude and latitude taken from the data.
    new mapboxgl.Marker(el)
      .setLngLat([data.data[i].longitude, data.data[i].latitude])
      .setPopup(popup) // sets a popup on this marker
      .addTo(map);
  }

}