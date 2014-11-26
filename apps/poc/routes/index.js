var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	console.log("Porque se pierde la primera vez?");
	console.log(req.user);
	res.render('index', {title:'POC Commons', user:(req.user)?req.user:null});
});

module.exports = router;
