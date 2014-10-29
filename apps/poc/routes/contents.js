var express = require('express');
var router = express.Router();

/* GET contents listing. */
router.get('/', function(req, res) {
  res.send('contenidos dinamicos');
});

module.exports = router;