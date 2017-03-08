/* global google */

$(() => {



  const $lat = $('[name=lat]');
  const $lng = $('[name=lng]');


  const $input = $('.autocomplete');

  const autocomplete = new google.maps.places.Autocomplete($input[0]);

  autocomplete.addListener('place_changed', function() {
    const place = autocomplete.getPlace();
    const location = place.geometry.location.toJSON();
    // $lat.val =(location.lat);;
    //  $lat = place.geometry.location.lat();
    //  $lng = place.geometry.location.lng();
    // $lng.val =(location.lng);
    const lat = location.lat;
    const lng = location.lng;

    $lat.val(lat);
    $lng.val(lng);
    console.log($lat.val(), $lng.val());


  });


  let map = null;


  const rockData= $('#map').data('rocks');
  console.log(rockData[2].id);



  initMap();

  //
  function initMap() {
    const latLng = {lat: 51.515113, lng: -0.072051};
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 2,
      center: latLng,
      scrollwheel: false
    });
    addMarker();
  }
  function addMarker() {
    for (let i = 0; i < rockData.length; i++) {
      const lat = rockData[i].lat;
      const lng = rockData[i].lng;
      console.log(lat);
      const latLng = { lat: lat, lng: lng };
      const marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
      marker.addListener('click', () => {
        markerClick(marker, rockData[i]);
      });
    }
  }
  let infowindow = null;

  function markerClick(marker, rockData) {
    // If there is an open infowindow on the map, close it
    if(infowindow) infowindow.close();


    // Update the infowindow variable to be a new Google InfoWindow
    infowindow = new google.maps.InfoWindow({
      content: `
    <div class="infowindow">
    <a href = "/rocks/${rockData._id}">
      <h3>${rockData.name}</h3></a>
    </div>
    `
    });

    // Finally, open the new InfoWindow
    infowindow.open(map, marker);

  }


});
