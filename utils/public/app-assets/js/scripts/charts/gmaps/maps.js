/*=========================================================================================
    File Name: maps.js
    Description: google maps
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

// Gmaps Maps
// ------------------------------

$(window).on("load", function(){

    // Basic Map
    // ------------------------------

    map = new GMaps({
        div: '#basic-map',
        lat: 22.307858,
        lng: 70.767400,
        zoom: 7
    });
    map.addMarker({
        lat: 22.307858,
        lng: 70.767400,
        title: 'Marker1',
        draggable: true,
    });

    // Info Window
    // ------------------------------

    map = new GMaps({
        div: '#info-window',
        lat: 22.307858,
        lng: 70.767400,
        zoom: 6
    });
    map.addMarker({
        lat: 22.307858,
        lng: 70.767400,
        title: 'Marker1',
        infoWindow: {
            content: '<p>Marker1</p>'
        }
    });
    map.addMarker({
        lat: 23.021212,
        lng: 72.572104,
        title: 'Marker2',
        infoWindow: {
            content: '<p>Marker2</p>'
        }
    });
    map.addMarker({
        lat: 23.263522,
        lng: 77.412043,
        title: 'Marker3',
        infoWindow: {
            content: '<p>Marker3</p>'
        }
    });

    // Street View Markers
    // ------------------------------

    map = GMaps.createPanorama({
      el: '#street-view',
      lat : 52.201272,
      lng: 0.118720,
    });

    // Random Value for street heading

    $(".street-heading").on("click", function(){
      map = GMaps.createPanorama({
        el: '#street-view',
        lat : 52.201272,
        lng: 0.118720,
        pov: { heading: Math.random() * 360, pitch: 5 }
      });
    });

    // Random Value for street Pitch

    $(".street-pitch").on("click", function(){
      map = GMaps.createPanorama({
        el: '#street-view',
        lat : 52.201272,
        lng: 0.118720,
        pov: { heading: 20, pitch: Math.random() * 180 - 90 }
      });
    });

    // Random Value for both street heading and street pitch

    $(".street-both").on("click", function(){
      map = GMaps.createPanorama({
        el: '#street-view',
        lat : 52.201272,
        lng: 0.118720,
        pov: { heading: Math.random() * 360, pitch: Math.random() * 180 - 90 }
      });
    });

});

