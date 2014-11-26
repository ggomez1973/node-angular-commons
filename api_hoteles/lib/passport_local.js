var AuthServ = require('./AAA_service').Service;

var LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {

	// Guarda todo el objeto en REDIS
	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(id, done) {
		done(null, id);
	});

	passport.use(new LocalStrategy(function(email_or_username, password, done) {
		AuthServ.getAuthenticatedUser(email_or_username, password, function(err, user, reason) {
			if (err) throw err;
			if (user) {
				return done(null, user);
			}
			return done(null, false, { message: reason });
		});
	}));
};