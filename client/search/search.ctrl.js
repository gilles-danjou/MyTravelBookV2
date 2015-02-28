
angular.module('searchCtrl', ['searchService'])

    .controller('searchController', ['$rootScope', '$scope', 'Search', function($rootScope, $scope, Search) {
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

            Search.create(vm.searchData).success(function(data) {
                vm.processing = false;

                if (data.message) {
                    alert ('err: ' + data.message)
                } else {
                    vm.message = data.message;
                    $scope.search.allSearches.push(data);
                }
                $rootScope.notify({message : 'success'})
            });
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