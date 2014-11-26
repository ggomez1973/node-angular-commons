// Authentication & Authorization & Accounting service

var AAA_service = {};
 
// Definicion de la libreria
AAA_service = (function () {
	// Variables y propiedades privadas
	var datasource = require('../datasource/mysql_datasource_impl').mysql_datasource;
 
	// Métodos privados (Hash password aca!!!)
  	function unMetodoPrivado() {
  	
  	} 
	//API Publico
	return {
		/**
		 * [getAuthenticatedUser description]
		 * @param  {[type]}   username [description]
		 * @param  {[type]}   password [description]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 */
		getAuthenticatedUser: function (username, password, callback) {
			datasource.getAuthenticatedUser(username, password, function(err, res){
				if(err){
					return callback(err);
				} else {
					//console.log(res);
					if(res){
						return callback(null, res);
					} 
					return callback(null, false, "Usuario ó password inválido.");
				}
			});
		}
	}
}());

module.exports.Service = AAA_service;