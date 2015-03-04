angular.module('homeCtrl', ['mgo-angular-wizard'])

// our controller for the form
// =============================================================================
    .controller('formController', function($scope) {

        // we will store all of our form data in this object
        $scope.formData = {};

        // function to process the form
        $scope.processForm = function() {
            alert('awesome!');
        };

    });