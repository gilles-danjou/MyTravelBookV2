
angular.module('searchCtrl', ['searchService', 'articleService', 'masonryLayout', 'infinite-scroll'])

.directive('myCustomer', function() {
    return {
        link: function (scope, element) {
            scope.fetchNext();
            debugger
        }
    };
})

.controller('searchController', ['$rootScope', '$scope', 'Search', 'Article', '$interval', '$timeout', function($rootScope, $scope, Search, Article, $interval, $timeout) {

        var busy = false,
            heights = [254, 300, 192, 450, 350, 200, 360, 420, 270, 400, 200],
            cats = ['abstract', 'animals', 'business', 'cats', 'city', 'food', 'nightlife', 'fashion', 'people', 'nature', 'sports', 'transport'],
            stop;

        $scope.images = [];

        $scope.refresh = function() {
            $scope.images.length = 0;

            $timeout(function() { $scope.fetchNext(); }, 1000);
        };

        $scope.fetchNext = function() {
            var i=0;

            if(!busy) {
                console.log('Fetching next')
                busy = true;
                Article.all().success(function(articles) { vm.processing = false; vm.allArticles = articles;

                    _.each(articles, function(article) {
                        $scope.images.push({
                            src: '250/' + heights[i % heights.length] + '/' + cats[Math.floor(Math.random() * cats.length)],
                            title: article.info.imageTitle
                        });
                    });
                    busy = false;

                });

                //for(var i=0; i<30; i++) {
                //    $scope.images.push({
                //        src: '250/' + heights[i % heights.length] + '/' + cats[Math.floor(Math.random() * cats.length )]
                //    });
                //}

                //busy = false;

            }

        };



        var vm = this;
        vm.type = 'create';
        updatePageTitle('Find a destination');

        Search.all().success(function(data) { vm.processing = false; vm.allSearches = data; });

        //$scope.$on('runCarousel', function(runCarouselEvent) {
        //
        //    $('.carousel').carousel({interval: 2000});
        //});
        //socket.on('newArticle', function (oneArticle) {
        //    vm.allSearches += oneArticle;
        //    alert('e');
        //});

        vm.saveSearch = function() {
            vm.processing = true;
            vm.error = '';


            console.log('save search and scraping deactivated...')
            //Search.create(vm.searchData).success(function(data) {
            //    vm.processing = false;
            //
            //    if (data.message) {
            //        alert ('err: ' + data.message)
            //    } else {
            //        vm.message = data.message;
            //        $scope.search.allSearches.push(data);
            //    }
            //    $rootScope.notify({message : 'success'})
            //});
        };

        vm.deleteSearch = function(id) {
            vm.deleteteProcessing = true;
            Search.delete(id).success(function(data) {
                Search.mine().success(function(data) { vm.mySearches = data; vm.deleteteProcessing = false; });
            });
        };


    }])

    .controller('searchCreateController', function(Search) {
        var vm = this;
        vm.type = 'create';
        vm.saveSearch = function() {
            vm.processing = true;
            vm.message = '';
            Search.create(vm.searchData).success(function(data) {
                vm.searchData = {};
                vm.message = data.message;
                vm.processing = false;
            });
        };

    })

    .controller('searchEditController', ['$routeParams', '$location', 'Search', function($routeParams, $location, Search) {

        var vm = this;
        vm.type = 'edit';

        Search.get($routeParams.search_id).success(function(data) { vm.searchData = data; });

        vm.saveSearch = function() {
            vm.processing = true;
            vm.message = '';
            Search.update($routeParams.search_id, vm.searchData).success(function(data) {
                vm.processing = false;
                vm.searchData = {};
                vm.message = data.message;
                $location.url('/searches-list');
            });
        };
    }]);
