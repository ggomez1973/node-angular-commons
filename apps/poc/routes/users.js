var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('gestion de perfiles de usuarios');
});

module.exports = router;
