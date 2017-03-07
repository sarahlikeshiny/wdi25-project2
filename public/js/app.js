'use strict';

/* global google */

$(function () {

  var $lat = $('[name=lat]');
  var $lng = $('[name=lng]');

  var $input = $('.autocomplete');

  var autocomplete = new google.maps.places.Autocomplete($input[0]);

  autocomplete.addListener('place_changed', function () {
    var place = autocomplete.getPlace();
    // const location = place.geometry.location.toJSON();
    console.log(location);
    // $lat.val(location.lat);//NOT returning A NUMBER!!
    $lat = place.geometry.location.lat();
    $lng = place.geometry.location.lng();
    // $lng.val(location.lng);//NOT returning A NUMBER!!
    console.log($lat);
  });

  console.log($lat);

  var map = null;

  initMap();
  //
  function initMap() {
    var latLng = { lat: 51.515113, lng: -0.072051 };
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 2,
      center: latLng,
      scrollwheel: false
    });
    addMarker();
  }
  function addMarker() {
    var latLng = { lat: $lat, lng: $lng };
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }
}); //jquery