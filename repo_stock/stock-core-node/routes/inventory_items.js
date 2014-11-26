/**
 * Inventory Items Router
 * Solo ruteo y gestión de códigos de error HTTP
 * y respuesta JSON
 */
var express = require('express');
var router = express.Router();

var mediator = require('../mediator/inventory_items_mediator').inventory_items_mediator;
var config = require('../conf/properties');

/**
 * Multiples rutas para el mismo path
 */
router.route('/items')
	.get(function(req, res) {
		mediator.getItems(req, function(error, result){
			if(error){
				res.statusCode = config.INTERNAL_SERVER_ERROR;
	            return res.send(error);
			}
			return res.json(result);
		});
	})
	.post(function(req, res) {
		mediator.createItem(req, function(error, result){
			if(error){
				res.statusCode = config.INTERNAL_SERVER_ERROR;
	            return res.send(error);
			}
			return res.json(result);
		});
	});

/**
 * [description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 *
 * Ejemplos:
 * 	/items/232
 * 	/items/count Cantidad de items
 *	/items/search Busqueda por query -> /items/search?q=bla+ble
 */
router.get('/items/:id', function(req, res) {
	if(req.params.id === 'count'){
		mediator.getItemsCount(req, function(error, result){
			if(error){
				res.statusCode = config.INTERNAL_SERVER_ERROR;
	            return res.send(error);
			}
			return res.json(result);
		});
	} else {
		if(req.params.id === 'search'){
			mediator.searchItems(req, function(error, result){
				if(error){
					res.statusCode = config.INTERNAL_SERVER_ERROR;
		            return res.send(error);
				}
				// res.statusCode implicitamente = 200 (no hace falta setearlo)
				return res.json(result);
			});
		} else {
			mediator.getItem(req, function(error, result){
				if(error){
					res.statusCode = config.INTERNAL_SERVER_ERROR;
		            return res.send(error);
				}
				if(result){
					// res.statusCode implicitamente = 200 (no hace falta setearlo)
					return res.json(result);
				} else {
					res.statusCode = config.NOT_FOUND;
		            return res.send(error);
				}
			});
		}
	}
});

module.exports = router;