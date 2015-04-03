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
                    opts.callback.call(self, e);
                });
            },
            /**
             * Adds Marker to Map
             * @param {type} opts
             * @returns {mapster_L1.google.maps.Marker}
             */
            addMarker: function (opts) {
                var marker;
                opts.position = {
                    lat: opts.lat,
                    lng: opts.lng
                };
                marker = this._createMarker(opts);
                this.markers.add(marker);
                if (opts.event) {
                    this._on({
                        obj: marker,
                        event: opts.event.name,
                        callback: opts.event.callback
                    });
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
            _addMarker: function(marker){
                this.markers.add(marker);
            },
            findBy: function(callback){
                this.markers.find(callback);
            },
            removeBy: function(callback){
                this.markers.find(callback, function(markers) {
                    markers.forEach(function(marker){
                        marker.setMap(null);
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