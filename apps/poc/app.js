var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');

var RedisStore = require('connect-redis')(session);


var routes = require('./routes/index');
var login = require('./routes/login');
var users = require('./routes/users');
var contents = require('./routes/contents');

var app = express();

// Redis para la gestión de la sesión del usuario
var redis = require("redis").createClient();
redis.auth('comoseralalaguna', function() {
    console.log('Cliente Redis conectado!');
});

var options = { 
    host: 'localhost', 
    port: 6379, 
    client: redis,
    ttl: 3600
};

var passport = require('passport');
require('./lib/passport_local')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    store: new RedisStore(options),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

/* application routes */
app.use('/', routes); // Index
app.use('/', login); // Estrategia local de autenticación.
app.use('/users', users); // Gestion de perfiles de usuarios.
app.use('/contents', contents); // Gestion de contenidos dinámicos.

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error.html', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.html', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
