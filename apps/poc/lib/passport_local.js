// var Login = require('../mediator/mediador_login');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {

	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(id, done) {
		done(null, id);
	});

	passport.use(new LocalStrategy(function(email, password, done) {
		//Login.getAuthenticatedUser(email, password, function(err, user, reason) {
		//	if (err) throw err;
		//	if (user) {
		//	
		//console.log(email);
		return done(null, {username: 'Cacho'});
		//	}
		//	return done(null, false, { message: reason });
		//});
	}
	));
};