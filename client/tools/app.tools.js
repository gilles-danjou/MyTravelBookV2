/**
 * Created by GDanjou on 12/02/15.
 */

updatePageTitle = function(pageTitle){
    var scope = angular.element(document.querySelector('#page-title')).scope();
    scope.app.pageTitle = pageTitle;
}

