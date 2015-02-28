angular.module('authService', [])

// ===================================================
// auth factory to login and get information
// inject $http for communicating with the API
// inject $q to return promise objects
// inject AuthToken to manage tokens
// ===================================================
.factory('Auth', function($rootScope, $http, $q, AuthToken) {

	var authFactory = {};

	authFactory.login = function(username, password) {	// log a user in
		return $http.post('/authenticate', { username: username,  password: password}).success(function(data) {     // return the promise object and its data
            AuthToken.setToken(data.token);
            token = data.token;
            $rootScope.me = data.user;
       		return data;
		});
	};

	authFactory.logout = function() { AuthToken.setToken(); };	                                                        // log a user out by clearing the token - // clear the token

    authFactory.isLoggedIn = function() {	                                                                            // check if a user is logged in -checks if there is a local token
        if (AuthToken.getToken()) return true;
		else return false;
	};

	authFactory.getUser = function() {	                                                                                // get the logged in user
        if (AuthToken.getToken()) {
            return $rootScope.me;
            //$http.get('api/users/me', { cache: true });
        } else {
            return $q.reject({message: 'User has no token.'});
        }
	};

	return authFactory;                                                                                                 // return auth factory object
})

// ===================================================
// factory for handling tokens
// inject $window to store token client-side
// ===================================================
.factory('AuthToken', function($window) {

	var authTokenFactory = {};

	authTokenFactory.getToken = function() { return $window.localStorage.getItem('token'); };                           // get the token out of local storage

	authTokenFactory.setToken = function(token) {                                                                       // function to set token or clear token if a token is passed, set the token - if there is no token, clear it from local storage
		if (token) $window.localStorage.setItem('token', token);
	 	else $window.localStorage.removeItem('token');
	};

	return authTokenFactory;
})

// ===================================================
// application configuration to integrate token into requests
// ===================================================
.factory('AuthInterceptor', function($q, $location, AuthToken) {

	var interceptorFactory = {};

	interceptorFactory.request = function(config) {	                                                                    // this will happen on all HTTP requests
        var token = AuthToken.getToken();                                                                               // grab the token
		if (token) config.headers['x-access-token'] = token;                                                            // if the token exists, add it to the header as x-access-token
        return config;
	};

	interceptorFactory.responseError = function(response) {                                                             // happens on response errors
		if (response.status == 403) {                                                                                   // if our server returns a 403 forbidden response
            AuthToken.setToken();
			$location.path('/login');
		}
		return $q.reject(response);                                                                                     // return the errors from the server as a promise
    };

	return interceptorFactory;
});