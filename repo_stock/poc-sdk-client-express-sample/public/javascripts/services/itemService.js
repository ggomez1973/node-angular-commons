// Items Services

services.service('ItemsService', ['$http', function($http) {
	this.getItems = function(config, callback) {
		var query = (config)? 'href='+config : '';
		$http.get('/articulos?'+query)
		.success(function(res) {
			return callback(false, res);
		})
		.error(function(err) {
			return callback(err);
		});		
	};
}]);