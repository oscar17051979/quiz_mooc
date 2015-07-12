// IMPORTAR PAQUETES CON MIDDLEWARES

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// IMPORTAR EL PAQUETE DE EXPRESS-PARTIALS

var partials = require('express-partials');

// IMPORTAR ENRUTADORES

var routes = require('./routes/index');
// var users = require('./routes/users');

// CREAR APLICACIÓN

var app = express();

// view engine setup
// INSTALAR GENERADOR DE VISTAS EJS

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// INSTLACIÓN DEL MIDDLEWARE DE EXPRESS-PARTIALS

app.use(partials());

// uncomment after placing your favicon in /public

// FAVICON DE LA CABECERA

app.use(favicon(__dirname + '/public/favicon.ico'));

// INSTALAR MIDDLEWARES

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// INSTALAR ENRUTADORES

app.use('/', routes);
// app.use('/users', users);

// catch 404 and forward to error handler

// RESTO DE RUTAS: GENERA ERROR 404 DE HTTP

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace

// GESTIÓN DE ERRORES DURANTE EL DESARROLLO

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user

// GESTION DE ERRORES DE PRODUCCIÓN

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// EXPORTAR APP PARA COMANDO DE ARRANQUE

module.exports = app;
