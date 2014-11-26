'use strict';

controllers.controller('ItemsMasterCtrl', ['$scope', '$location', 'ItemsService', function($scope, $location, ItemsService) {
	
	$scope.data = {};

	// Paginacion
	if($location.search().proxima){ 
		$scope.href = 'http://localhost:8080/items?offset=50&limit=25';
	}
	if($location.search().previa){ 
		$scope.href = 'http://localhost:8080/items?offset=25&limit=25';
	}
	if($location.search().anterior){ 
		$scope.href = 'http://localhost:8080/items?offset=0&limit=25';
	}
	// Si no hay proxima, ni previa, ni anterior -> default ($scope.href = undefinided)
	ItemsService.getItems($scope.href, function(error, result){
		$scope.data.message = ($scope.href)? $scope.href : 'Pagina inicial (default)';
		if(error){
			$scope.data.error = error;
		} else {
			$scope.data.items = result;
		}
	});
}]);