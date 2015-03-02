angular.module('mapCtrl', ['uiGmapgoogle-maps'])

.controller('mapController', ['$scope', "uiGmapLogger", "uiGmapGoogleMapApi", function ($scope, $log, GoogleMapApi) {

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

    $scope.map = {
        doCluster: true,
        dragZoom: {options: {}},
        center: $scope.userLocation,
        pan: true,
        zoom: 3,
        refresh: false,
        visualRefresh: true,
        events: {},
        bounds: {}
    };

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
$scope.getLocation();
}]);