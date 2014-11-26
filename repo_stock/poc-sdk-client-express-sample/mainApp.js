var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var http = require('http');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var items = require('./routes/articulos_router');
var items_stock_levels = require('./routes/movimientos_router');

// Importante para SAAS, nombre de la aplicación cliente que accede al sistema.
process.env.STOCK_APP_HREF = 'http://localhost:8080/apps/1';
process.env.STOCK_API_KEY_ID = 'tuhermanaentanga';
process.env.STOCK_API_KEY_SECRET = 'comoseralalaguna';

var app = express();

app.use('/views', express['static'](path.join(__dirname, '/views')));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'html');
app.engine('html', function (path, options, fn) {
  if ('function' == typeof options) {
    fn = options, options = {};
  }
  fs.readFile(path, 'utf8', fn);
});

/* application routes */
app.get(/^\/(index.html)?$/i, function (request, response) {
    response.render('index.html', { layout: null });
});
// API expuesto al cliente Angular (prodia tener otra forma según el contexto)
app.use('/', items); // Coleccion paginada de items (articulos)
app.use('/', items_stock_levels); // Movimientos de un item en particular

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  logger('Express server listening on port ' + server.address().port);
});
