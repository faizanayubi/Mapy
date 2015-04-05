(function (window, google, List) {

    var Mapster = (function () {
        /**
         * Initiates the Javascript Class
         * @param {type} element
         * @param {type} opts
         * @returns {mapster_L3.Mapster}
         */
        function Mapster(element, opts) {
            this.gMap = new google.maps.Map(element, opts);
            this.markers = List.create();
            if(opts.cluster){
                this.markerClusterer = new MarkerClusterer(this.gMap, [], opts.clusterer);
            }
            if(opts.geocoder){
                this.geocoder = new google.maps.Geocoder();
            }
        }

        /**
         * Defines Methods in Javascript
         */
        Mapster.prototype = {
            /**
             * Returns Zoom level of map or sets it with level parameter
             * @param {type} level
             * @returns {mapster_L3.Mapster.prototype@pro;gMap@call;setZoom}
             */
            zoom: function (level) {
                if (level) {
                    this.gMap.setZoom(level);
                } else {
                    return this.gMap.setZoom(level);
                }
                ;
            },
            /**
             * Defines event and Callback on Map
             * @param {type} opts
             * @returns {undefined}
             */
            _on: function (opts) {
                var self = this;
                google.maps.event.addListener(opts.obj, opts.event, function (e) {
                    opts.callback.call(self, e, opts.obj);
                });
            },
            
            geocode: function(opts){
                this.geocoder.geocode({
                    address: opts.address
                }, function(results, status) {
                    if(status === google.maps.GeocoderStatus.OK) {
                        opts.success.call(this, results, status);
                    } else {
                        opts.error.call(this, status);
                    }
                });
            },
            
            setPano: function(element, opts){
                var panorama = new google.maps.StreetViewPanorama(element, opts);
                if(opts.events){
                    this._attachEvents(panorama, opts.events);
                }
                this.gMap.setStreetView(panorama);
            },
            
            /**
             * Adds Marker to Map
             * @param {type} opts
             * @returns {mapster_L1.google.maps.Marker}
             */
            addMarker: function (opts) {
                var marker,
                    self = this;
                opts.position = {
                    lat: opts.lat,
                    lng: opts.lng
                };
                marker = this._createMarker(opts);
                if(this.markerClusterer) {
                    this.markerClusterer.addMarker(marker);
                }
                this.markers.add(marker);
                if (opts.events) {
                    this._attachEvents(marker, opts.events);
                };
                if (opts.content) {
                    this._on({
                        obj: marker,
                        event: 'click',
                        callback: function () {
                            var infoWindow = new google.maps.InfoWindow({
                                content: opts.content
                            });

                            infoWindow.open(this.gMap, marker);
                        }
                    });
                }
                return marker;
            },
            _attachEvents: function(obj, events){
                var self = this;
                events.forEach(function(event) {
                        self._on({
                            obj: obj,
                            event: event.name,
                            callback: event.callback
                        });
                    });
            },
            _addMarker: function(marker){
                this.markers.add(marker);
            },
            findBy: function(callback){
                this.markers.find(callback);
            },
            removeBy: function(callback){
                var self = this;
                this.markers.find(callback, function(markers) {
                    markers.forEach(function(marker){
                        if(self.markerClusterer){
                            self.markerClusterer.removeMarker(marker);
                        }else{
                            marker.setMap(null);
                        }
                    });
                });
            },
            /**
             * Creates Marker on map
             * @param {type} opts
             * @returns {mapster_L1.google.maps.Marker}
             */
            _createMarker: function (opts) {
                opts.map = this.gMap;
                return new google.maps.Marker(opts);
            }
        };
        return Mapster;
    }());

    Mapster.create = function (element, opts) {
        return new Mapster(element, opts);
    };

    window.Mapster = Mapster;
}(window, google, List));