(function (window, mapster) {

    //map options
    var options = mapster.MAP_OPTIONS,
            element = document.getElementById('map-canvas');
    //map
    map = mapster.create(element, options);

    map.addMarker({
        lat : 37.791350,
        lng : 122.435883,
        visible : true,
        draggable : true,
        id : 1
    });

}(window, window.Mapster || (window.Mapster = {})));