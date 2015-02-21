'use strict';

// Declare app level module which depends on views, and components
angular.module('myTravelBook', [
    'btford.socket-io', 'angular-growl',
    'authService', 'app.routes',
    'appCtrl', 'userCtrl',
    'searchCtrl'

])

.config(function($httpProvider) {                                                                                       // application configuration to integrate token into requests
    $httpProvider.interceptors.push('AuthInterceptor');                                                                    // attach our auth interceptor to the http requests
})

.config(['growlProvider', function (growlProvider) {
    growlProvider.globalTimeToLive(10000);
}])

.factory('socket', function (socketFactory) {
    return socketFactory();
});