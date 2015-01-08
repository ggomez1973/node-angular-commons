
controllers.controller('LoginCtrl', function($rootScope, $scope, $location, SessionService, MailService) {
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
		if(data.old_password && (data.new_password1 === data.new_password2)){
			var id = SessionService.currentUser.username;
			SessionService.changePassword(id, data.old_password, data.new_password1, function(error, result){
				if(error){
					$scope.loginErrorMessage = 'No se pudo cambiar su password.';
				} else {
					if(result.state === 'failure'){
						$scope.loginErrorMessage = 'No se pudo cambiar su password.';
					} else {
						// Exito! Ver a donde redirigir bien 
						$location.path("/");	
					}				
				}
			});
		} else {
			$scope.loginErrorMessage = 'Verifique los datos ingresados.';
		}		
	};

	$scope.doRecoverPassword = function(){
		var email = $scope.loginFormData.username;
		// validacion
		SessionService.recoverPassword(email, function(error, result){
			if(error){
				console.log(error);
			} else {
				if(result.state === 'failure'){
					$scope.loginErrorMessage = 'No se pudo recuperar su password.';
				} else {
					var data = {
						to: email,
						pass: result
					};
					MailService.sendPasswordRecoveryMail(data, function(error, result){
						if(error){
							console.log(error);
						}
						$location.path("/");
					});		
				}				
			}
		});
	};
});
