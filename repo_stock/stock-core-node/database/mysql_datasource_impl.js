// Namespace para la libreria
var mysql_datasource = {};
 
// Definicion de la libreria
mysql_datasource = (function () {
	// Variables y propiedades privadas
	var default_offset = 0  // 'Pagina'
	var default_limit = 25; // Items por página
	var default_orderBy = null;
	var default_asc = true;
	var default_fields = "*";

	var db = require('../models');
 
	// Métodos privados
  	function unMetodoPrivado() {
  	
  	} 
	//API Publico
	return {
		getItems: function (fields, offset, limit, orderBy, asc, callback) {
			var os = (offset)? offset : 0;
			var lm = (limit)? limit : 25;
			// {include: [ db.ItemsStockLevels ]}  <-- Join (!= expand)!
			db.Item.findAndCountAll({
				offset : os,
				limit : lm
			}).success(function(items){
				return callback(null, items);
			});
		},
		
		getItem: function (id, callback) {
			db.Item.find({where: {id:id}}).success(function(item){
				return callback(null, item);
			});
		},
		
		createItem: function (description, callback){
			var new_item = db.Item.build({
				description: description
			});
			new_item.save().complete(function(err) {
				if (!!err) {
				  return callback(err);
				} else {
				  return callback(null, new_item);
				}
			});
		},
		
		updateItem: function (request, callback){
			return callback({
		  		msg: 'mysql_datasource - updateItem - Sin Implementar!'
		  	});
		},
		
		deleteItem: function (request, callback){
			return callback({
		  		msg: 'mysql_datasource - deleteItem - Sin Implementar!'
		  	});
		},
		
		getItemsCount: function (callback){
			db.Item.count().success(function(count){
				return callback(null, count);
			});
		},
		
		searchItems: function (request, callback){
			return callback({
		  		msg: 'mysql_datasource - searchItems - Sin Implementar!'
		  	});
		},
		
		getItemStockLevels : function(id, callback){
			db.ItemStockLevel.findAll({where: {id:id}}).success(function(result){
				return callback(null, result);
			});
		},
		createItemStockLevel : function(quantity, itemId, callback){
			var new_item_stock_levels = db.ItemStockLevel.build({
				quantity_in_stock: quantity,
				ItemId : itemId
			});
			new_item_stock_levels.save().complete(function(err) {
				if (!!err) {
				  return callback(err);
				} else {
				  return callback(null, new_item_stock_levels);
				}
			});
		}
	}
}());

module.exports.mysql_datasource = mysql_datasource;