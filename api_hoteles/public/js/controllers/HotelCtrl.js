
controllers.controller('HotelCtrl', ['$window','$location', '$scope', 'MailService', 'HotelService', 'SessionService',
function($window, $location, $scope, MailService, HotelService, SessionService) {
	$scope.hotelFormData = {};
	$scope.hotelFormUpdateData = SessionService.currentUser;
	$scope.updateMessage = null;

	$scope.getNewHotelForm = function(){
		$location.path("/hotelForm");
	}

	$scope.createHotel = function(){
		var data = $scope.hotelFormData;
		// Validation!! @TODO
		console.log(data);
		HotelService.createNewHotel(data, function(error, result){
			if(error){
				console.log(error);
				// Mostrar error
			} else {
				// Show WAIT!!
				// console.log(result);
				var data = {
					to: result.email,
					user: result.username,
					pass: result.password
				};
				MailService.sendNewHotelEmail(data, function(error, result){
					if(error){
						console.log(error);
					} else {
						// Display alert mensaje enviado!
					}
				});
				$location.path('/');	
			}
		});
	}

	$scope.updateHotel = function(){
		var data = $scope.hotelFormUpdateData;
		// Validation!! @TODO
		HotelService.updateHotel(data, function(error, result){
			if(error){
				console.log(error);
			} else {
				$scope.updateMessage = "Sus datos fueron actualizados correctamente."
				$location.path('/');	
			}
		});
	}    		
}]);
