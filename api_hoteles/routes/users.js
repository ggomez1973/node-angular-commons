var express = require('express');
var router = express.Router();
var mediator = require('../lib/users_service').users_mediator;
var config = require('../config/properties.js');

router.route('/users')
	.get(function(req, res) {
		mediator.getUsers(req, function(error, result){
			if(error){
				res.statusCode = config.INTERNAL_SERVER_ERROR;
	            return res.send(error);
			}
			return res.json(result);
		});
	})
	.post(function(req, res) {
		mediator.createUser(req, function(error, result){
			if(error){
				res.statusCode = config.INTERNAL_SERVER_ERROR;
	            return res.send(error);
			}
			return res.json(result);
		});
	});
router.route('/users/:id')
	.get(function(req, res){
		mediator.getUser(req, function(error, result){
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
	})
	.post(function(req, res) {
		mediator.updateUser(req, function(error, result){
			if(error){
				res.statusCode = config.INTERNAL_SERVER_ERROR;
	            return res.send(error);
			}
			// Actualizo los datos de la session en Redis
			req.user.username = req.body.username;
			req.user.email = req.body.email;
			req.user.website = req.body.website;
			req.user.address = req.body.address;
			req.user.city = req.body.city;
			req.user.phone = req.body.phone;
			req.user.isAvailable = req.body.isAvailable;
			return res.json(result);
		});
	});
	

module.exports = router;
