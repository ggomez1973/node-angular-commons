
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
	};

	$scope.doChangePassword = function(){
		var data = $scope.loginFormData;
		// Validacion
		var id = SessionService.currentUser.username;
		SessionService.changePassword(id, data.old_password, data.new_password1, function(error, result){
			if(error){
				console.log(error);
			} else {
				if(result.state === 'failure'){
					$scope.loginErrorMessage = 'No se pudo cambiar su password.';
				} else {
					// Exito! Ver a donde redirigir bien 
					$location.path("/");	
				}				
			}
		});
	};

	$scope.doRecoverPassword = function(){
		var data = $scope.loginFormData.username;
		// validacion
		SessionService.recoverPassword(data, function(error, result){
			if(error){
				console.log(error);
			} else {
				if(result.state === 'failure'){
					$scope.loginErrorMessage = 'No se pudo recuperar su password.';
				} else {
					// Exito! Ver a donde redirigir bien 
					$location.path("/");	
				}				
			}
		});
	};
});
