angular.module('appCtrl', ['authService'])

	.controller('appController', ['$rootScope', '$location', 'Auth', 'growl', function($rootScope, $location, Auth, growl) {
        var vm = this;
		$rootScope.loggedIn = Auth.isLoggedIn();                                                                                	// get info if a person is logged in

		$rootScope.$on('$routeChangeStart', function() {                                                                    // check to see if a user is logged in on every request
			$rootScope.loggedIn = Auth.isLoggedIn();
            //Auth.getUser().then(function(data) {
				// if (data) $rootScope.me = data.me;
            //});                                                   // get user information on page load
		});


		$rootScope.doLogin = function() {                                                                                           // function to handle login form
			$rootScope.processing = true;
			$rootScope.error = '';
            Auth.login($rootScope.loginData.username, $rootScope.loginData.password).success(function(data) {
				$rootScope.processing = false;
                $rootScope.user = data.user;
                if (data.success) $location.path('/users');	                                                			// if a user successfully logs in, redirect to users page
				else $rootScope.error = data.message
			})
		};

		$rootScope.doLogout = function() { Auth.logout(); $location.path('/login'); };                                              // function to handle logging out

        $rootScope.notify = function (options) {
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