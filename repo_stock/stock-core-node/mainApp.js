var express = require('express');
var routes = require('./routes');
var items = require('./routes/inventory_items');
var items_stock_levels = require('./routes/items_stock_levels');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');

var db = require('./models');

var config = require('./conf/properties');

var app = express();

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

