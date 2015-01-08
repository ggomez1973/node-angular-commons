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
 	var Sequelize = require('sequelize');
	// Métodos privados
  	function unMetodoPrivado() {
  	
  	} 
	//API Publico
	return {
		getAuthenticatedUser: function (username, password, callback){
			db.User.find({ include:[db.Role], 
				where: Sequelize.and(
					{password:password},
					Sequelize.or(
						{username: username},
						{email:username}
					))
				}).success(function(user){
					//console.log(user);
					return callback(null, (user)? user.dataValues : null);
				});
		},
		createUser: function (data, callback){
			// 'data' viene validado desde el mediador,si falla a esta 
			// altura es por un contraint de la db
			var new_item = db.User.build(data);
			new_item.save().complete(function(err) {
				if (!!err) {
				  return callback(err);
				} else {
				  return callback(null, new_item);
				}
			});
		},
		updateUser: function(id, data, callback){
			var values = data;
			var options = {
				where : { id: id},
				limit : 1
			};
			db.User.update(values, options).success(function(result){
				return callback(null, result);
			});
		},
		updateUserByCriteria: function(values, options, callback){
			db.User.update(values, options).success(function(result){
				return callback(null, result);
			});
		},
		// Incluye al administrador!
		getAllUsers: function (fields, offset, limit, orderBy, asc, callback) {
			var os = (offset)? offset : 0;
			var lm = (limit)? limit : 25;
			// {include: [ db.ItemsStockLevels ]}  <-- Join (!= expand)!
			db.User.findAndCountAll({
				offset : os,
				limit : lm
			}).success(function(items){
				return callback(null, items);
			});
		},
		// Todos menos los administradores
		getUsers: function (fields, offset, limit, orderBy, asc, callback) {
			var os = (offset)? offset : 0;
			var lm = (limit)? limit : 25;
			// {include: [ db.ItemsStockLevels ]}  <-- Join (!= expand)!
			db.User.findAndCountAll({
				offset : os,
				limit : lm,
				where: { RoleId:2} 
			}).success(function(items){
				return callback(null, items);
			});
		},
		getUsersByCategory: function (fields, offset, limit, orderBy, asc, category, callback) {
			var os = (offset)? offset : 0;
			var lm = (limit)? limit : 25;
			// {include: [ db.ItemsStockLevels ]}  <-- Join (!= expand)!
			db.User.findAndCountAll({
				offset : os,
				limit : lm,
				where: { RoleId:2, category:category} 
			}).success(function(items){
				return callback(null, items);
			});
		},
		getUser: function (id, callback) {
			db.User.find({where: {id:id}}).success(function(item){
				return callback(null, item);
			});
		},
		getUserbyEmail: function (email, callback) {
			db.User.find({where: {email:email}}).success(function(item){
				return callback(null, item);
			});
		}
	}
}());

module.exports.mysql_datasource = mysql_datasource;