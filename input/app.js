// Module dependencies.

var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var io = require('socket.io-client');

var routes = require('./routes/index');
var app = module.exports = express();

app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/// error handlers

// development error handler
// will print stacktrace
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
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



var server = app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var socket = io.connect('https://socket-io-redis-sample-miguel-herrero.c9.io/input', {
  port: 8080
});

socket.on('welcome', function (data) {
  console.log("Hub socket connected.");
  console.log(data);
});

app.use('/', routes.index);
