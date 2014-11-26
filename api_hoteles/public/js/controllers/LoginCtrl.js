
controllers.controller('LoginCtrl', function($rootScope, $scope, $location, SessionService) {
	$scope.loginFormData = {};
	$scope.loginErrorMessage = null;

	$scope.doLogin = function(){
		var data = $scope.loginFormData;
		SessionService.login(data.username, data.password, true, function(error, result){
			if(error){
				console.log(error);
			} else {
				if(result.state === 'failure'){
					$scope.loginErrorMessage = 'Usuario ó password inválido.';
				} else {
					SessionService.authSuccess(result.user); 
					$location.path("/");	
				}				
			}
		});		
	};
	$scope.doLogout = function(){
		SessionService.logout(function(error, result){
			$location.path("/");
		});
	};

	$scope.getLoginForm = function(){
		$location.path("/loginForm");
	}

});
