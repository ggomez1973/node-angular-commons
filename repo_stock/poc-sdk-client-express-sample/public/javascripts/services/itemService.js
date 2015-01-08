// Items Services

services.service('ItemsService', ['$http', function($http) {
	this.getItems = function(config, callback) {
		var query = (config)? 'href='+config : '';
		var token = '123456789';
		//$http.get('/articulos?'+query)
		$http.get('http://localhost:8080/items?access_token=123456789&'+query)
		//$http({method: 'GET', url: 'http://localhost:8080/items?access_token='+token, headers: {'Authorization': 'Bearer '+token}})
		.success(function(res) {
			return callback(false, res);
		})
		.error(function(err) {
			return callback(err);
		});		
	};
}]);