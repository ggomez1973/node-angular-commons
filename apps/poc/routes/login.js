var express = require('express');
var router = express.Router();

var passport = require('passport');

router.post('/login', passport.authenticate('local', 
	{ successRedirect: '/auth/success', 
	  failureRedirect: '/auth/failure', 
	  failureFlash: 'Usuario ó password inválidos.',
	  successFlash: 'Bienvenido!' })
);

router.get('/auth/success', function(req, res) {
	//req.flash('test', 'it worked');
	//res.redirect('/local/auth/failure')
	res.json({ state: 'success', user: req.user}); 
});

router.get('/auth/failure', function(req, res) {
	//res.send(JSON.stringify(req.flash('test')));
    res.json({ state: 'failure', user: null });
});

router.delete('/auth', function(req, res) {
    req.logout();
    res.writeHead(200);
    res.end();
});

module.exports = router;