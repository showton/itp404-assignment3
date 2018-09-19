$("button").on("click", function(event) {
  event.preventDefault();
  //pop up ask user
  navigator.geolocation.getCurrentPosition(
    successHandler,
    errorHandler,
    options
  );
});

let successHandler = function(position) {
  let home = new google.maps.LatLng(
    position.coords.latitude,
    position.coords.longitude
  );
  let geocoder = new google.maps.Geocoder();
  let address = "";
  geocoder.geocode(
    {
      location: home
    },
    function(geocoderResults) {
      console.log(geocoderResults);
      address = geocoderResults[0].formatted_address;
      console.log(address);
      let infoWindow = new google.maps.InfoWindow({
        content: address,
        position: home
      });
      google.maps.event.addListener(homeMarker, "click", function(event) {
        infoWindow.open(map);
      });
    }
  );

  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: home
  });
  let homeMarker = new google.maps.Marker({
    map: map,
    position: home,
    animation: google.maps.Animation.DROP
  });
};

let errorHandler = function(error) {};
let options = {};
