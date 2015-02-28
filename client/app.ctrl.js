angular.module('appCtrl', ['authService'])

	.controller('appController', ['$rootScope', '$location', 'Auth', 'growl', function($rootScope, $location, Auth, growl) {
        var vm = this;
		vm.loggedIn = Auth.isLoggedIn();                                                                                	// get info if a person is logged in

        $rootScope.$on('$routeChangeStart', function() {                                                                    // check to see if a user is logged in on every request
			vm.loggedIn = Auth.isLoggedIn();
            //Auth.getUser().then(function(data) {
				// if (data) vm.me = data.me;
            //});                                                   // get user information on page load
		});


        vm.doLogin = function() {                                                                                           // function to handle login form
			vm.processing = true;
			vm.error = '';
            Auth.login(vm.loginData.username, vm.loginData.password).success(function(data) {
				vm.processing = false;
                vm.user = data.user;
                if (data.success) $location.path('/users');	                                                			// if a user successfully logs in, redirect to users page
				else vm.error = data.message
			})
		};

		vm.doLogout = function() { Auth.logout(); $location.path('/login'); };                                              // function to handle logging out

        vm.notify = function (options) {
			if (options.message) {
				var config = {};
				switch (options.type) {
					case "success":
						growl.success(options.message, config);
						break;
					case "info":
						growl.info(options.message, config);
						break;
					case "warning":
						growl.warning(options.message, config);
						console.log(options.message);
						break;
					default:
						growl.error(options.message, config);
				}
			}
		}


        vm.sendMessage = function(message) {
            mySocket.emit('message', 'data');

        };


	}]);