angular.module('searchService', [])

.factory('Search', function($http) {
    var searchFactory = {};

	searchFactory.get     = function(id)                { return $http.get     ('/api/searches/' + id);             };
	searchFactory.all     = function()                  { return $http.get     ('/api/searches/');                 };
	searchFactory.mine     = function()                 { return $http.get     ('/api/searches/mine');             };
	searchFactory.create  = function(searchData)        { return $http.post    ('/api/searches/', searchData);      };
	searchFactory.update  = function(id, searchData)    { return $http.put     ('/api/searches/' + id, searchData); };
	searchFactory.delete  = function(id)                { return $http.delete  ('/api/searches/' + id);             };

    return searchFactory;
});
