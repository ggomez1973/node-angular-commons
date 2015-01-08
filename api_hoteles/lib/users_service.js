/**
 * Mediador - Responsable del parseo del request/body e invocación 
 * sobre la implementación del datasource. Ademas, construye la respuesta.
 */
// Namespace para la libreria
var users_mediator = {};
 
// Definicion de la libreria
users_mediator = (function () {
	// Variables y propiedades privadas
	var datasource = require('../datasource/mysql_datasource_impl').mysql_datasource;
 
	// Métodos privados
  	function make_passwd(n, a) {
  		var index = (Math.random() * (a.length - 1)).toFixed(0);
  		return n > 0 ? a[index] + make_passwd(n - 1, a) : '';
  	} 
	//API Publico
	return {

		createUser: function (request, callback){
			// obtengo datos
			// creo item
			// if(_body) retorno item creado ó no
			// retorno 201 (created) + Location: http://localhost:8080/items/1232
			var b = request.body;
			if(b.username && b.email){
				var nuevoUser = {
					username: b.username,
					password: make_passwd(13, 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890'),
					email: b.email,
					website: b.website,
					address: b.address,
					city: b.city,
					phone: b.phone,
					category: b.category,
					freetext: b.freetext,
					RoleId: 2 
				};
				datasource.createUser(nuevoUser, function(error, result){
					if(error){
						return callback(error);
					}
					// if(_body) retorno el usuario creado.
					// Retorno 201 CREATED!
					// Aca deberia poner el href!!!
					return callback(null, result);
				});
			} else {
				return callback('Username & Email son obligatorios');
			}
		},
		
		getUsers: function (request, callback) {
			var q = request.query;
			var limit = (q.limit)? q.limit : 25; // Sacar los defauls a config!!
			var offset = (q.offset)? q.offset : 0;
			var category = (q.category)? q.category : "hotel";
			try {
				limit = parseInt(limit);
				offset = parseInt(offset);
			} catch(e){
				console.log(e);
				limit = 25;
				offset = 0;
			}
			datasource.getUsersByCategory(q.fields, offset, limit, q.orderBy, q.asc, category, function(error, result){
				if(error){
					return callback(error);
				}
				// Construir respuesta en formato propio + linking!
				var meta_href = request.headers.host + '/users'; // META
				var reply = {};
				if(result){
					reply.meta = {
		  				href: request.headers.host + request.url,
		 				mediaType: 'application/json'
		  			};
		  			// Paginación
			  		reply.offset = q.offset;
		 			reply.limit = q.limit;
		 			reply.first = {
				  		meta : {
				  			href: meta_href+'?offset=0&limit='+limit,
				 			mediaType: 'application/json'
				  		}
				  	};
				  	if(result.count > (offset+limit)){
					  	reply.next = {
					  		meta: {
					  			href: meta_href+'?offset='+(offset+limit)+'&limit='+limit,
					  			mediaType: 'application/json'
					  		}
					  	};
				  	} else {
				  		reply.next = null;
				  	}
		 			var users = [];
		 			var rows = result.rows;
		 			for (var i = 0; i < rows.length; i++) {
		 				// Sacar esto de aca y hacerlo funcion. 
		 				// Deberia ser la misma respuesta que da para un item en particular.
		 				var user = {
		 					meta : {
		 						href: meta_href + '/' + rows[i].id,
		 						mediaType: 'application/json'
		 					},
		 					userId: rows[i].id,
		 					userName: rows[i].username,
		 					userWebSite: rows[i].website,
		 					userAddress: rows[i].address,
		 					userCity: rows[i].city,
		 					userPhone: rows[i].phone,
		 					userCategory: rows[i].category,
		 					userFreetext: rows[i].freetext,
		 					itemCreationDate : rows[i].createdAt
		 				};
		 				users.push(user);
		 			};
		 			reply.users = users;
				}
				return callback(null, reply);
			});
		},
		
		getUser: function (request, callback) {
			var p = request.params; // De aca sale el ID
			var q = request.query; // De aca sale el expand y el fields

			var meta_href = request.headers.host + request.url; // META

			datasource.getUser(p.id, function(error, result){
				if(error){
					return callback(error);
				}
				var reply = null;
				if(result){
					reply = {
						meta: {
			  				href: meta_href,
			 				mediaType: 'application/json'
			  			},
			  			userId: result.id,
			  			userName: result.username,
			  			userEmail: result.email
					}
				}
				return callback(null, reply);
			});
		},		
		
		updateUser: function (request, callback){
			var data = request.body;
			var id = data.id;
			delete data.id;
			delete data.password;
			delete data.createdAt;
  			delete data.updatedAt;
  			delete data.RoleId;
  			delete data.Role; 
			datasource.updateUser(id, data, function(error, result){
				if(error){
					return callback(error);
				}
				//console.log(result);
				return callback(null, result);
			});
		},
		
		deleteUser: function (request, callback){
			
		},
		
		getUsersCount: function (request, callback){
			
		},
		recoverPassword : function(request, callback){
			datasource.getUserbyEmail(request.params.id, function(error, result){
				if(error){
					return callback(error);
				}
				return callback(null, (result)? result.password: null);
			});
		},
		changePassword : function(request, callback){
			var values = {password: request.body.new_password};
			var options = {
				where : {username:request.params.id, password:request.body.password},
				limit : 1
			};
			datasource.updateUserByCriteria(values, options, function(error, result){
				if(error){
					return callback(error);
				}
				if(result[0] === 0){
					return callback(true); // No encontro nada que actualizar
				}
				return callback(null, result);
			});
		}
	}
}());

module.exports.users_mediator = users_mediator;