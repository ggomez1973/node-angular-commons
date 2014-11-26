/**
 * Mediador - Responsable del parseo del request/body e invocación 
 * sobre la implementación del datasource. Ademas, construye la respuesta.
 */
// Namespace para la libreria
var inventory_items_mediator = {};
 
// Definicion de la libreria
inventory_items_mediator = (function () {
	// Variables y propiedades privadas
	var datasource = require('../database/mysql_datasource_impl').mysql_datasource;
 
	// Métodos privados
  	function unMetodoPrivado() {
  	
  	} 
	//API Publico
	return {
		/**
		 * Obtiene una colección de items paginados.
		 * @param  {[type]}   request  [Pedido al servidor]
		 * @param  {Function} callback [Función de callback]
		 * @return {[type]}            [Array]
		 * 
		 * Ejemplos request:
		 *  /items Default (primera pagina del arreglo de items)
		 *  /items?offset=50&limit=25  Paginación
		 *  /items/search?q=alfajor+dulce Busqueda (scoped)
		 *  /items/count 
		 *
		 * {
		 * 	meta: {
		 * 		href: 'http://localhost:8080/v1/items',
		 * 		mediaType: 'application/json;version=2&schema=...'
		 * 	}
		 * 	offset:0,
		 * 	limit:25,
		 * 	first: {
		 * 		meta : {
		 * 			href: 'http://localhost:8080/v1/items?offset=0&limit=25',
		 * 			mediaType: 'application/json'
		 * 		}
		 * 	}
		 * 	previous: null,
		 * 	next: {
		 * 		meta: {
		 * 			href: 'http://localhost:8080/v1/items?offset=25&limit=25'
		 * 		}
		 * 	}
		 * 	last: ...
		 * 	items: [
		 * 		{	meta: {
		 * 				href: 'http://localhost:8080/v1/items/1212121',
		 * 				mediaType: 'application/json'
		 * 			}
		 * 			itemId: 1212121,
		 * 			itemCategory: {
		 * 				meta: {
		 * 					href: 'http://localhost:8080/v1/categories/32',
		 * 					mediaType: 'application/json'
		 * 				}
		 * 			},
		 * 			itemDescription: 'Alfajor Tatin Blanco',
		 * 			... otros detalles del item ...
		 * 			stockLevels: {
		 * 				meta: {
		 * 					href: 'http://localhost:8080/v1/items/222/stock_levels',
		 * 					mediaType: 'application/json'
		 * 				}
		 * 			}
		 * 		},
		 * 		... otros items ...
		 * 	],
		 * 	
		 * }
		 */
		getItems: function (request, callback) {
			var q = request.query;
			var limit = (q.limit)? q.limit : 25; // Sacar los defauls a config!!
			var offset = (q.offset)? q.offset : 0;
			try {
				limit = parseInt(limit);
				offset = parseInt(offset);
			} catch(e){
				console.log(e);
				limit = 25;
				offset = 0;
			}
			datasource.getItems(q.fields, offset, limit, q.orderBy, q.asc, function(error, result){
				if(error){
					return callback(error);
				}
				// Construir respuesta en formato propio + linking!
				var meta_href = request.headers.host + '/items'; // META
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
		 			// Items
		 			var items = [];
		 			var rows = result.rows;
		 			for (var i = 0; i < rows.length; i++) {
		 				// Sacar esto de aca y hacerlo funcion. 
		 				// Deberia ser la misma respuesta que da para un item en particular.
		 				var item = {
		 					meta : {
		 						href: meta_href + '/' + rows[i].id,
		 						mediaType: 'application/json'
		 					},
		 					itemId: rows[i].id,
		 					itemDescription: rows[i].description,
		 					itemCreationDate : rows[i].createdAt,
		 					stockLevels: {
				  				meta: {
				  					href: meta_href + '/' + rows[i].id + '/stock_levels',
				  					mediaType: 'application/json'
				  				}
				  			}
		 				};
		 				items.push(item);
		 			};
		 			reply.items = items;


		 					 		/*
			  			
					  	previous: null,
					  	
					  	last: {
					  		meta: {
					  			href: 'http://localhost:8080/v1/items?offset=25&limit=25',
					  			mediaType: 'application/json'
					  		}
					  	},
					  	items: [
					  		{	meta: {
					 				href: 'http://localhost:8080/v1/items/1212121',
					  				mediaType: 'application/json'
					  			}
					  			itemId: 1212121,
					  			itemDescription: 'Alfajor Tatin Blanco',
					  			... otros detalles del item ...
					  			stockLevels: {
					  				meta: {
					  					href: 'http://localhost:8080/v1/items/222/stock_levels',
					  					mediaType: 'application/json'
					  				}
					  			}
					  		}
					  	]
					}*/
				}
				return callback(null, reply);
			});
		},
		/**
		 * 
		 * @param  {[type]}   request  [description]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 *
		 * Ejemplos request:
		 * /items/123456?expand=itemCategory Retorna la categoria del item populada en lugar del ID.
		 * /items/123456?fields=itemDescription,..,itemCategory(categoryDescription) Contenido parcial
		 */
		getItem: function (request, callback) {
			var p = request.params; // De aca sale el ID
			var q = request.query; // De aca sale el expand y el fields

			var meta_href = request.headers.host + request.url; // META

			datasource.getItem(p.id, function(error, result){
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
			  			itemId: result.id,
			  			itemDescription: result.description,
					}
				}
				return callback(null, reply);
			});
		},
		/**
		 * [createItem description]
		 * @param  {[type]}   request  [description]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 *
		 * Ejemplos request:
		 * _body=false No retorna el item creado
		 * _method=DELETE Method Override (para el caso que el servidor no soporte DELETEs)
		 */
		createItem: function (request, callback){
			// obtengo datos
			// creo item
			// if(_body) retorno item creado ó no
			// retorno 201 (created) + Location: http://localhost:8080/items/1232
			var b = request.body;
			datasource.createItem(b.description, function(error, result){
				if(error){
					return callback(error);
				}
				// Aca deberia poner el href!!!
				return callback(null, result);
			});
		},
		/**
		 * [updateItem description]
		 * @param  {[type]}   request  [description]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 */
		updateItem: function (request, callback){
			return callback({
		  		msg: 'updateItem - Sin Implementar!'
		  	});
		},
		/**
		 * [deleteItem description]
		 * @param  {[type]}   request  [description]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 */
		deleteItem: function (request, callback){
			return callback({
		  		msg: 'deleteItem - Sin Implementar!'
		  	});
		},
		/**
		 * [getItemsCount description]
		 * @param  {[type]}   request  [description]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 */
		getItemsCount: function (request, callback){
			// request params podria tener "distinct"
			datasource.getItemsCount(function(error, result){
				if(error){
					return callback(error);
				}
				return callback(null, result);
			});
		},
		/**
		 * [searchItems description]
		 * @param  {[type]}   request  [description]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 */
		searchItems: function (request, callback){
			console.log(request.params);
			console.log(request.query);
			return callback({
		  		msg: 'searchItems - Sin Implementar!'
		  	});
		},
		/**
		 * [getItemStockLevels description]
		 * @param  {[type]}   request  [description]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 */
		getItemStockLevels : function (request, callback){
			var q = request.query;
			var p = request.params;
			datasource.getItemStockLevels(p.id, function(error, result){
				if(error){
					return callback(error);
				}
				return callback(null, result);
			});
		},
		createItemStockLevel : function (request, callback){
			var b = request.body;
			datasource.createItem(b.quantity_in_stock, function(error, result){
				if(error){
					return callback(error);
				}
				// Aca deberia poner el href!!!
				return callback(null, result);
			});
		}
	}
}());

module.exports.inventory_items_mediator = inventory_items_mediator;