var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {title:'POC Commons', user:(req.user)?req.user:null});
});

module.exports = router;
