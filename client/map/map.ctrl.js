/*
angular.module('mapCtrl', ['uiGmapgoogle-maps'])

.controller('mapController', ['$scope', '$timeout', function ($scope, $timeout) {

    $scope.userLocation = { latitude: 48.8666666667, longitude: 2.33333333333 };


    $scope.getLocation = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition($scope.showPosition);
        } else {
            $scope.userLocation = "Geolocation is not supported by this browser.";
        }
    }

    $scope.showPosition = function(position) {
        this.location = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
        $scope.userLocation = { 'latitude': position.coords.longitude, longitude: position.coords.latitude };
        //$scope.map.dynamicMarkers.push($scope.userLocation);
    }

     angular.extend($scope, {
        map: {
            doCluster: true,
            dragZoom: {options: {}},
            center: $scope.userLocation,
            dynamicMarkers: [],
            pan: true,
            zoom: 3,
            refresh: false,
            visualRefresh: true,
            events: {},
            bounds: {}
        }
    });


    $scope.markersEvents = {
        click: function (gMarker, eventName, model) {
            if(model.$id){
                model = model.coords;//use scope portion then
            }
            console.log("Model: event:" + eventName + " " + JSON.stringify(model));
        }
    };

    var markerToClose = null;

    $scope.onMarkerClicked = function (marker) {
    //if (markerToClose) {
    //  markerToClose.showWindow = false;
    //}
        markerToClose = marker; // for next go around
        marker.showWindow = true;
        $scope.$apply();
        console.log("Marker: lat: " + marker.latitude + ", lon: " + marker.longitude + " clicked!!")
    };

    $timeout(function () {
        var dynamicMarkers = [
            {   id: 1,
                latitude: 46,
                longitude: -79
            },
            {
                id: 2,
                latitude: 33,
                longitude: -79
            }
        ];
        _.each(dynamicMarkers, function (marker) {
            marker.closeClick = function () {
                marker.showWindow = false;
                $scope.$apply();
            };
            marker.onClicked = function () {
                $scope.onMarkerClicked(marker);
            };
        });
        $scope.map.dynamicMarkers = dynamicMarkers;
    }, 2000);

    $scope.getLocation();

}]);
*/



function initCall() {
    console.log('Google maps api initialized.');
    angular.bootstrap(document.getElementById('map'), ['doc.ui-map']);
}

angular.module('mapCtrl', ['ui.map'])

.controller('mapController', ['$scope', '$timeout', function ($scope, $timeout) {

        $scope.userLocation = { latitude: 48.8666666667, longitude: 2.33333333333 };
        $scope.myMarkers = [];


        $scope.getLocation = function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition($scope.showPosition);
            } else {
                $scope.userLocation = "Geolocation is not supported by this browser.";
            }
        }

        $scope.showPosition = function(position) {
            this.location = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
            $scope.userLocation = { 'latitude': position.coords.longitude, longitude: position.coords.latitude };
            //$scope.map.dynamicMarkers.push($scope.userLocation);
            $scope.myMarkers.push(new google.maps.Marker({
                map: $scope.myMap,
                position: $params[0].latLng
            }));
        }


        $scope.mapOptions = {
            center: new google.maps.LatLng(35.784, -78.670),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.addMarker = function ($event, $params) {
            $scope.myMarkers.push(new google.maps.Marker({
                map: $scope.myMap,
                position: $params[0].latLng
            }));
        };

        $scope.setZoomMessage = function (zoom) {
            $scope.zoomMessage = 'You just zoomed to ' + zoom + '!';
            console.log(zoom, 'zoomed');
        };

        $scope.openMarkerInfo = function (marker) {
            $scope.currentMarker = marker;
            $scope.currentMarkerLat = marker.getPosition().lat();
            $scope.currentMarkerLng = marker.getPosition().lng();
            $scope.myInfoWindow.open($scope.myMap, marker);
        };

        $scope.setMarkerPosition = function (marker, lat, lng) {
            marker.setPosition(new google.maps.LatLng(lat, lng));
        };
}]);

