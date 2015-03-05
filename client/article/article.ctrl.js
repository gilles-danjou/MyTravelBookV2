angular.module('articleCtrl', ['articleService', 'masonryLayout', 'infinite-scroll'])

//
//.directive('onFinishRender', function ($timeout) {
//    return {
//        restrict: 'A',
//        link: function (scope, element, attr) {
//            if (scope.$last === true) {
//                $timeout(function () {
//                    scope.$emit('ngRepeatFinished');
//                });
//            }
//        }
//    }
//})

.controller('articleController', ['$scope', 'Article', function($scope, Article) {
	var vm = this;
	vm.processing = true;

    updatePageTitle('List of articles');

    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
        $('.weather').each(function() {
            if ($(this).text() != ''){
                a = $(this).text()
                $(this).html('<table>' + a  + '</table>' );
            }
        });
    });

    // grab all the articles at page load
	Article.all().success(function(data) { vm.articles = data; vm.processing = false; });

}])


.controller('articleMasonryController', ['$rootScope', '$scope', 'Search', 'Article', '$interval', '$timeout', function($rootScope, $scope, Search, Article, $interval, $timeout) {

    var vm = this;
    vm.processing = true;

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
        }
    };
}])
