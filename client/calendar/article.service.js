angular.module('articleService', [])

.factory('Article', function($http) {
    var articleFactory = {};

	articleFactory.get     = function(id)           { return $http.get     ('/api/articles/:' + id);           };              // get a single article
	articleFactory.all     = function()             { return $http.get     ('/api/v1/articles' );               };              // get all articles
	//articleFactory.create  = function(articleData)     { return $http.post    ('/api/articles/', articleData);      };              // create a article
	//articleFactory.update  = function(id, articleData) { return $http.put     ('/api/articles/' + id, articleData); };              // update a article
	//articleFactory.delete  = function(id)           { return $http.delete  ('/api/articles/' + id);           };              // delete a article

    return articleFactory;	                                                                                                // return our entire articleFactory object
});