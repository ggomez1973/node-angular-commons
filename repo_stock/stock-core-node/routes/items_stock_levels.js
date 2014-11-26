var express = require('express');
var router = express.Router();

var mediator = require('../mediator/inventory_items_mediator').inventory_items_mediator;
var config = require('../conf/properties'); // @TODO Sacar de aca el /API/

/* GET stock_levels listing for an item. */
router.get('/items/:id/stock_levels', function(req, res) {
	mediator.getItemStockLevels(req, function(error, result){
		if(error){
			res.statusCode = config.INTERNAL_SERVER_ERROR;
            return res.send(error);
		}
		return res.json(result);
	});
});

module.exports = router;