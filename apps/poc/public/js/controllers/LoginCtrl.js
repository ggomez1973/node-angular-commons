
controllers.controller('LoginCtrl', ['$scope', '$location', 'LoginService', 'SessionService', function($scope, $location, LoginService, SessionService) {
	$scope.loginFormData = {};

	$scope.doLogin = function(){
		var data = $scope.loginFormData;
		LoginService.login(data.username, data.password, function(error, result){
			if(error){
				$scope.loginFormData.loginErrorMessage = error;
			} else {
				SessionService.authSuccess(result.user);
				$location.path("/");	
			}
		});		
	};
	$scope.doLogout = function(){
		LoginService.logout(function(error, result){
			$location.path("/");
		});
	};
	$scope.loginForm = function(){
		$location.path("/loginForm");
	};
	$scope.signUpForm = function(){
		$location.path("/signUpForm");
	};
	$scope.cancel = function(){
		$location.path("/");
	};
	$scope.isUserLogged = function(){
		console.log(SessionService.isUserLoggedIn());
		return SessionService.isUserLoggedIn();
	};
}]);
