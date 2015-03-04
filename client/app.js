'use strict';

 // Declare app level module which depends on views, and components
angular.module('myTravelBook', [
    'angular-growl',
    //'uiGmapgoogle-maps',
    'authService', 'app.routes',
    'appCtrl', 'homeCtrl',
    'userCtrl', 'articleCtrl', 'searchCtrl', 'earthCtrl', 'mapCtrl'

    //'btford.socket-io',
])

.config(function($httpProvider) {                                                                                       // application configuration to integrate token into requests
    $httpProvider.interceptors.push('AuthInterceptor');                                                                    // attach our auth interceptor to the http requests
})

.config(['growlProvider', function (growlProvider) {
    growlProvider.globalTimeToLive(10000);
}])


//.factory('mySocket', function (socketFactory) {
//        var myIoSocket = io.connect('/');
//
//        var  mySocket = socketFactory({
//            ioSocket: myIoSocket
//        });
//    return mySocket;
//});

//.config(['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
//    GoogleMapApiProvider.configure({
//        //    key: 'your api key',
//        v: '3.17',
//        libraries: 'weather,geometry,visualization'
//    });
//}]);
