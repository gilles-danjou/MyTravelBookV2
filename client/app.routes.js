angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider
		.when('/',                      {templateUrl: '/home/home.html'})
        .when('/login',                 {templateUrl: '/user/login.html', controller  : 'appController', controllerAs: 'user'})
        .when('/earth',                 {templateUrl: '/earth/earth.html'})
        .when('/map',                   {templateUrl: '/map/map.html'})
        .when('/users-list',            {templateUrl: '/user/users.html',        controller: 'userController',           controllerAs: 'user'})
        .when('/searches-list',         {templateUrl: '/search/searches-list.html'})
        .when('/articles-list',         {templateUrl: '/article/articles-list.html'})
        .when('/articles',              {templateUrl: '/article/articles.html'})
        .when('/calendar',              {templateUrl: '/calendar/calendar.html'})

        //.when('/users/create',          {templateUrl: 'app/views/pages/users/single.html',     controller: 'userCreateController',     controllerAs: 'user'})
        //.when('/users/:user_id',        {templateUrl: 'app/views/pages/users/single.html',     controller: 'userEditController',       controllerAs: 'user'})
        //
        //.when('/searches/mine',        {templateUrl: 'app/views/searches-list.html',           controller: 'searchController',         controllerAs: 'search'})
        //.when('/searches/all',         {templateUrl: 'app/views/search-list.html',             controller: 'searchController',         controllerAs: 'search'})
        //.when('/searches/create',      {templateUrl: 'app/views/pages/searches/single.html',   controller: 'searchCreateController',   controllerAs: 'search'})
        //.when('/searches/:search_id',  {templateUrl: 'app/views/pages/searches/single.html',   controller: 'searchEditController',     controllerAs: 'search'})
        //
        //.when('/test',                 {templateUrl: 'app/views/test.html',                    controller: 'testController',           controllerAs: 'test'})
        //
        //.when('/chat',                 {templateUrl: 'app/views/chat.html'})
        //.when('/vote',                 {templateUrl: 'app/views/vote.html'});

		$locationProvider.html5Mode(true);

});
