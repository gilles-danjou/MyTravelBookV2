angular.module('earthService', [])

.factory('Earth', function($http) {
    var countryFactory = {};

	countryFactory.getCountry     = function(id)           { return $http.get     ('/api/countries/:' + id);           };              // get a single country
	countryFactory.countries               = function()            { return $http.get     ('/api/v1/countries' );               };              // get all countrys
	//countryFactory.create  = function(countryData)     { return $http.post    ('/api/countrys/', countryData);      };              // create a country
	//countryFactory.update  = function(id, countryData) { return $http.put     ('/api/countrys/' + id, countryData); };              // update a country
	//countryFactory.delete  = function(id)           { return $http.delete  ('/api/countrys/' + id);           };              // delete a country

    return countryFactory;	                                                                                                // return our entire countryFactory object
});