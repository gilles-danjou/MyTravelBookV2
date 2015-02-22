angular.module('userService', [])

.factory('User', function($http) {
    var userFactory = {};

	userFactory.get     = function(id)           { return $http.get     ('/api/users/' + id);           };              // get a single user
	userFactory.all     = function()             { return $http.get     ('/api/v1/users' );               };              // get all users
	userFactory.create  = function(userData)     { return $http.post    ('/api/users/', userData);      };              // create a user
	userFactory.update  = function(id, userData) { return $http.put     ('/api/users/' + id, userData); };              // update a user
	userFactory.delete  = function(id)           { return $http.delete  ('/api/users/' + id);           };              // delete a user

    return userFactory;	                                                                                                // return our entire userFactory object
});