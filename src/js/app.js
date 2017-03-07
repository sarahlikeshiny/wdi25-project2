/* global google */

$(() => {



  let $lat = $('[name=lat]');
  let $lng = $('[name=lng]');

  const $input = $('.autocomplete');

  const autocomplete = new google.maps.places.Autocomplete($input[0]);

  autocomplete.addListener('place_changed', function() {
    const place = autocomplete.getPlace();
    // const location = place.geometry.location.toJSON();
    console.log(location);
    // $lat.val(location.lat);//NOT returning A NUMBER!!
     $lat = place.geometry.location.lat();
     $lng = place.geometry.location.lng();
    // $lng.val(location.lng);//NOT returning A NUMBER!!
    console.log($lat);
  });

  console.log($lat);

  let map = null;

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
    const latLng = { lat: $lat, lng: $lng };
    const marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }



});//jquery
