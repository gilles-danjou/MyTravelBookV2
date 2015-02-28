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

    var countriesList = [],
        locations = [],
        markers = [],
        legend = {},
        rotation;

    getBounds = function () {
        console.log(earth.getBounds())
    };

    go = function () {
        earth.setView(userLocation, 5);
        console.log(earth.getBounds())
    };


    var earth = new WE.map('earth_div', {
        sky: true,
        atmosphere: true,
        zoom: 3.0,
        center: userLocation
    });

    WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(earth);

//    markers.forEach(function (b) {
//        earth.removeMarker(b);
//    });
//
//    markers = [];
//
//    earth.panTo([countriesList[index]['latitude'], countriesList[index]['longitude']]);
//
//
////$('#earth_div').on('click touchstart touchend', function () { });
//locations.forEach(function (a) {
//    // Push the new markers to the markers[] array and add them to the globe, adding a popup too.
//    markers.push(WE.marker([a.latitude, a.longitude])
//        .addTo(earth)
//        .bindPopup("This user has logged in from <b>" + a.country + '</b>', {maxWidth: 150,maxHeight:100, closeButton: true}));
//    // Color the markers depending on the country they are in.
//    $(markers[markers.length-1].element.firstChild).css('background', legend[a.country]);
//});
//
//    earth.setZoom(1.8);

    /*
     // This line adds support for OpenStreetMap tiles



     // Start a rotation animation
     //rotation = setInterval(function() {
     //
     //	var c = earth.getPosition();
     //
     //	if(c[0] && c[1]){
     //		earth.setCenter([c[0], c[1] + 0.1]);
     //	}
     //
     //}, 30);


     // Opening and closing the side menu


     // Get data for the globe from /online
     // Once initially, and then every 30 sec

     getData();
     setInterval(getData, 1000*30);


     // This function sends an ajax get request to /online,
     // fetches a list of countries and coordinates
     // then renders the globe

     function getData() {
     $.ajax({
     url:    '/online',
     success: function(data) {
     countriesList = data.countriesList;
     locations = data.coordinates;
     render();
     }
     });
     }

     // This function handles everything related to updating the HTML
     // with the returned data from the AJAX call:

     function render() {

     var entry;

     if (!countriesList.length){

     // If there isn't anybody online
     // Show an appropriate message and empty the summary and the list section

     currentInfo.empty();
     $('#no-members').show();
     $('.summary').html('');

     }
     else {

     // If there are people online:
     // On every call clear the side-menu list and globe markers and fill them up with new info.

     currentInfo.empty();

     $('#no-members').hide();

     for (var i = 0; i < countriesList.length; i++) {

     // Assign the country's name a color.

     generateColorPalette(countriesList[i]['countryName']);

     // Populate the side-menu with the countries ordered by members online (12 entries tops).

     if (i < 12) {

     currentInfo.append($('<li id="country' + (i + 1) + '" class="entry"></li>'));

     entry = $('#country' + (i + 1));

     entry.append($('<span class="color-effect"></span>').css('background-color', legend[countriesList[i]['countryName']]));
     entry.append($('<div class="countryName">' + countriesList[i]['countryName'] + '</div>'));
     entry.append($('<span class="count">' + countriesList[i]['usersOnline'] + '</span>'));

     }

     }

     // Summary information

     $('.summary').html(locations.length + ' online <span>/</span> ' + countriesList.length + ' countries');

     }


     // Calculate number of side-menu entries depending on screen size.

     showEntries();

     $( window ).resize(showEntries);


     // Adding the markers to the globe.

     // First remove all existing markers from the globe and clear the array they are stored in.
     markers.forEach(function (b) {
     earth.removeMarker(b);
     });

     markers = [];


     // For each ip location create a new marker
     locations.forEach(function (a) {

     // Push the new markers to the markers[] array and add them to the globe, adding a popup too.
     markers.push(WE.marker([a.latitude, a.longitude]).addTo(earth).bindPopup("This user has logged in from <b>" + a.country + '</b>', {maxWidth: 150,maxHeight:100, closeButton: true}));

     // Color the markers depending on the country they are in.
     $(markers[markers.length-1].element.firstChild).css('background', legend[a.country]);

     });


     // Rotate the globe to the desired country from the list

     $('.entry').on('click', function () {

     if($(window).width()<800){
     body.removeClass('open');
     }

     clearInterval(rotation);

     var index = $(this).attr('id').split('country')[1] - 1;

     earth.panTo([countriesList[index]['latitude'], countriesList[index]['longitude']]);

     });

     }


     $('#earth_div').on('click touchstart touchend', function () {

     // Stop the rotation when the earth is clicked or touched
     clearInterval(rotation);


     // If the screen is small close the side menu as well.
     if($(window).width()<800){
     body.removeClass('open');
     }

     });


     // Shows only a part of the entries depending on the screen size

     function showEntries() {

     var screenHeight = $(window).height(),
     sideMenuEntriesSpace = screenHeight - 250, // Exclude the title and the summary height
     numberOfEntries = Math.round(sideMenuEntriesSpace/55); // 55 is the height of an entry in pixels

     // The list of countries on the sidebar
     var countries = $('#side-menu .entry');

     // Hide all countries
     countries.hide();

     // Show only as many countries as would fit on the window

     countries.slice(0, numberOfEntries).show();

     }


     var j=0;

     var arrayOfColors = [
     '#25c19e','#c354f6','#7a54f6','#2593c1','#f68954','#5cc151',
     '#db3095','#c52a82','#d7c834','#e24912','#e3c44a','#d630ae'
     ];


     function generateColorPalette(name) {

     // Fill up a legend object with the key a country name
     // and the value a color taken from colors[]

     if(!legend[name]){
     legend[name] = arrayOfColors[j];
     }

     j++;

     if (j >= arrayOfColors.length) {
     j = 0;
     }
     }


     // Open the side menu on start up if the app is running on a big screen.

     if($(window).width()>800){
     body.addClass('open');
     }
     else {
     earth.setZoom(1.8);
     }
     */

});