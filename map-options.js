(function (window, google, mapster) {

    mapster.MAP_OPTIONS = {
        center: {
            lat: 37.79135,
            lng: -122.435
        },
        zoom: 10,
        disableDefaultUI: true,
        draggable: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_LEFT,
            style: google.maps.ZoomControlStyle.DEFAULT
        },
        panControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_LEFT
        },
        cluster: true,
        geocode: true
    };

}(window, google, window.Mapster || (window.Mapster = {})))