angular.module('userCtrl', ['userService'])


.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
})

.controller('userController', ['$scope', 'User', function($scope, User) {
	var vm = this;
	vm.processing = true;

    updatePageTitle('List of users');

    // grab all the users at page load
	User.all().success(function(data) { vm.users = data; vm.processing = false; });

    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
        var rowSelection = $('#demo-dt-selection').DataTable({
            "responsive": true,
            "language": {
                "paginate": {
                    "previous": '<i class="fa fa-angle-left"></i>',
                    "next": '<i class="fa fa-angle-right"></i>'
                }
            }
        });

        $('#demo-dt-selection').on( 'click', 'tr', function () {
            if ( $(this).hasClass('selected') ) {
                $(this).removeClass('selected');
            } else {
                rowSelection.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        } );
    });

	vm.deleteUser = function(id) {
		vm.processing = true;

		User.delete(id).success(function(data) {
            User.all().success(function(data) { vm.users = data; vm.processing = false; });
		});
	};



}])





// controller applied to user creation page
.controller('userCreateController', function(User) {
	var vm = this;
	vm.type = 'create';
	vm.saveUser = function() {
		vm.processing = true;
		vm.message = '';
		User.create(vm.userData).success(function(data) {
				vm.userData = {};
				vm.message = data.message;
                vm.processing = false;
			});
	};	

})

// controller applied to user edit page
.controller('userEditController', function($routeParams, User) {

	var vm = this;
	vm.type = 'edit';

	User.get($routeParams.user_id).success(function(data) { vm.userData = data; });

	vm.saveUser = function() {
		vm.processing = true;
		vm.message = '';
		User.update($routeParams.user_id, vm.userData).success(function(data) {
				vm.processing = false;
				vm.userData = {};
				vm.message = data.message;
			});
	};

});