angular.module('earthCtrl', ['earthService'])

.directive('earth', ['Earth', function(Earth)  {

    return {
        restrict: 'E',
        link: function() {

            $(function () {

                var userLocation = [47.19537, 8.524404];

                var x = document.getElementById("coordinates");

                function getLocation() {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(showPosition);
                    } else {
                        x.innerHTML = "Geolocation is not supported by this browser.";
                    }
                }

                function showPosition(position) {
                    x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
                    userLocation = [position.coords.longitude, position.coords.latitude];
                }

                getBounds = function () { console.log(earth.getBounds()) };

                go = function () { earth.setView(userLocation, 5); console.log(earth.getBounds()) };

                var countriesList = [],
                    locations = [],
                    markers = [],
                    legend = {},
                    rotation;



                var earth = new WE.map('earth_div', {
                    sky: true,
                    atmosphere: true,
                    zoom: 2.5,
                    center: userLocation,
                    tilting: false,
                    zooming: false
                });

                var marker = WE.marker([51.5, -0.09]).addTo(earth);
                marker.bindPopup("<b>Hello world!</b><br>I am a popup.<br /><span style='font-size:10px;color:#999'>Tip: Another popup is hidden in Cairo..</span>", {maxWidth: 150, closeButton: true}).openPopup();

                var marker2 = WE.marker([30.058056, 31.228889]).addTo(earth);
                marker2.bindPopup("<b>Cairo</b><br>Yay, you found me!", {maxWidth: 120, closeButton: false});

                Earth.countries().success(function(data) {
                    //vm.countries = data;
                    //vm.processing = false;

                    for (var marker in data){
                        var newMarker = WE.marker([data[marker].BGNc_latitude, data[marker].BGNc_longitude]).addTo(earth);
                        newMarker.bindPopup(data[marker].ISOen_name, {maxWidth: 120, closeButton: false});
                    }
                    //earth.setView([51.505, 0], 6);


                    //WE.tileLayer('http://data.webglearth.com/natural-earth-color/{z}/{x}/{y}.jpg', {
                    WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
                    //WE.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
                        //tileSize: 256,
                        //bounds: [[-85, -180], [85, 180]],
                        //minZoom: 0,
                        //maxZoom: 16,
                        //attribution: '© OpenStreetMap contributors'
                    }).addTo(earth);

                });
            });

        } //link
    }; // return
}])

.controller('earthController', ['$scope',  function($scope) {

    $scope.earth = { center: { latitude: 45, longitude: -73 }, zoom: 8 };



}]);