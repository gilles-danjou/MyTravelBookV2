angular.module('mapCtrl', [])

.controller('mapController', ['$scope', 'Map', function($scope, Map) {

    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };



}])





// controller applied to map creation page
.controller('mapCreateController', function(Map) {
	var vm = this;
	vm.type = 'create';
	vm.saveMap = function() {
		vm.processing = true;
		vm.message = '';
		Map.create(vm.mapData).success(function(data) {
				vm.mapData = {};
				vm.message = data.message;
                vm.processing = false;
			});
	};	

})

// controller applied to map edit page
.controller('mapEditController', function($routeParams, Map) {

	var vm = this;
	vm.type = 'edit';

	Map.get($routeParams.map_id).success(function(data) { vm.mapData = data; });

	vm.saveMap = function() {
		vm.processing = true;
		vm.message = '';
		Map.update($routeParams.map_id, vm.mapData).success(function(data) {
				vm.processing = false;
				vm.mapData = {};
				vm.message = data.message;
			});
	};

});