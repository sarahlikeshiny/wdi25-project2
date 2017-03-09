'use strict';

/* global google */

$(function () {

  var $lat = $('[name=lat]');
  var $lng = $('[name=lng]');

  var $input = $('.autocomplete');

  var autocomplete = new google.maps.places.Autocomplete($input[0]);

  autocomplete.addListener('place_changed', function () {
    var place = autocomplete.getPlace();
    var location = place.geometry.location.toJSON();
    // $lat.val =(location.lat);;
    //  $lat = place.geometry.location.lat();
    //  $lng = place.geometry.location.lng();
    // $lng.val =(location.lng);
    var lat = location.lat;
    var lng = location.lng;

    $lat.val(lat);
    $lng.val(lng);
    console.log($lat.val(), $lng.val());
  });

  var map = null;

  var rockData = $('#map').data('rocks');
  console.log(rockData);

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
    var _loop = function _loop(i) {
      var lat = rockData[i].lat;
      var lng = rockData[i].lng;
      console.log(lat);
      var latLng = { lat: lat, lng: lng };
      var marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
      marker.addListener('click', function () {
        markerClick(marker, rockData[i]);
      });
    };

    for (var i = 0; i < rockData.length; i++) {
      _loop(i);
    }
  }
  var infowindow = null;

  function markerClick(marker, rockData) {
    // If there is an open infowindow on the map, close it
    if (infowindow) infowindow.close();

    // Update the infowindow variable to be a new Google InfoWindow
    infowindow = new google.maps.InfoWindow({
      content: '\n    <div class="infowindow">\n    <a href = "/rocks/' + rockData._id + '">\n      <h3>' + rockData.name + '</h3></a>\n      <img src = "https://s3-eu-west-1.amazonaws.com/wdi25project2/' + rockData.image.filename + '"\n    </div>\n    '
    });

    // Finally, open the new InfoWindow
    infowindow.open(map, marker);
  }
});