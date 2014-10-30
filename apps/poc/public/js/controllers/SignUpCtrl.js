
controllers.controller('SignUpCtrl', ['$scope', '$location', 'SessionService', function($scope, $location, SessionService) {
	$scope.signUpFormData = {};

	$scope.signUp = function(){
		console.log($scope.signUpFormData);
	};
	$scope.cancel = function(){
		$location.path("/");
	};
/*
	SessionService.login($scope.signUpFormData, function(error, result){
		if(error){
			$scope.signUpFormData.error = error;
		} else {
			//$scope.signUpFormData.email = result;
		}
	});
*/
}]);
