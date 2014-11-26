
controllers.controller('LoginCtrl', ['$scope', '$location', 'SessionService', function($scope, $location, SessionService) {
	$scope.loginFormData = {};

	$scope.$watch( SessionService.isUserLoggedIn, function ( isLoggedIn ) {
    	$scope.isLoggedIn = isLoggedIn;
    	$scope.currentUser = SessionService.getAuthenticatedUser();
  	});

	$scope.doLogin = function(){
		var data = $scope.loginFormData;
		SessionService.login(data.username, data.password, true, function(error, result){
			if(error){
				console.log(error);
			} else {
				$scope.currentUser = result.user;
			}
			$location.path("/");
		});		
	};
	$scope.doLogout = function(){
		SessionService.logout(function(error, result){
			$location.path("/");
		});
	};

}]);
