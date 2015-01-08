var express = require('express');
var routes = require('./routes');
var items = require('./routes/inventory_items');
var items_stock_levels = require('./routes/items_stock_levels');
var path = require('path');
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;

var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');
var cors = require('cors');

var db = require('./models');

var config = require('./conf/properties');

var app = express();

// OAUTH 2
// BORRAR!!
var users = [
    { id: 1, username: 'bob', token: '123456789', email: 'bob@example.com' }
  , { id: 2, username: 'joe', token: 'abcdefghi', email: 'joe@example.com' }
];

function findByToken(token, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.token === token) {
      return fn(null, user);
    }
  }
  return fn(null, null);
};

passport.use(new BearerStrategy({
  },
  function(token, done) {
    // asynchronous validation, for effect...
    process.nextTick(function () {
      // Find the user by token.  If there is no user with the given token, set
      // the user to `false` to indicate failure.  Otherwise, return the
      // authenticated `user`.  Note that in a production-ready application, one
      // would want to validate the token for authenticity.
      findByToken(token, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user);
      })
    });
  }
));
// Fin 

// all environments
app.set('port', config.APPLICATION_PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride()); // Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer()); // multipart/form-data
app.use(passport.initialize());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

// Routers
app.use('/', routes); // Default index (listado de los servicios disponibles)
app.use('/', items); // Router de items (articulos)
app.use('/', items_stock_levels); // Router de Movimientos de un item en particular

//.sync({ force: true }) // Drop!
db.sequelize.sync().complete(function(err) {
	if (err) {
		throw err
	} else {
		app.listen(app.get('port'), function(){
			console.log('Express server listening on port ' + app.get('port'));
		});
	}
});

