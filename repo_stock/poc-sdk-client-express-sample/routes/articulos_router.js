// articulos_router

var express = require('express');
var router = express.Router();

var stocksdk = require('stock-sdk');

var apiKey = new stocksdk.ApiKey(
	process.env['STOCK_API_KEY_ID'],
	process.env['STOCK_API_KEY_SECRET']
);

var stockClient = new stocksdk.Client({ apiKey: apiKey });

router.get('/articulos', function(req, res) { 
	stockClient.getApplication(process.env['STOCK_APP_HREF'], function(err, app) {
		
		app.getItems(req.query.href, function(error, result){
			if(error){
				console.log(error);
				res.statusCode = 500;// ver esto!!!
				return res.send(error);
			}
			return res.json(result);
		});
		
	});
});

router.get('/articulos/:id', function(req, res) {
	
});

module.exports = router;