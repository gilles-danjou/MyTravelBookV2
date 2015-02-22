angular.module('articleCtrl', ['articleService'])

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

}]);



