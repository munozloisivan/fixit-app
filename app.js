'use strinct';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var router = express.Router();

var mongoose = require('mongoose');

var usuario = require('./routes/usuario');
var gestor = require('./routes/gestor');
var categoria = require('./routes/categoria');
var aviso = require('./routes/aviso');
var logro = require('./routes/logro');
var mailroutes = require('./routes/mail');
var app = express();

mongoose.Promise = global.Promise;
var options = {
  useMongoClient: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};

mongoose.connect('mongodb://147.83.7.158:27017/fixitest', options, function(err, res) {
  if(err) throw err;
  console.log('Connected to Fixitest');
});


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  /*var allowedOrigins = ['http://127.0.0.1:8100', 'http://localhost:8100'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }*/
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

app.use(router);

app.use('/aviso', aviso);
app.use('/usuario', usuario);
app.use('/gestor', gestor);
app.use('/categoria', categoria);
app.use('/logro', logro);
app.use('/mail', mailroutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log("ERROR -->" + err.message);
  console.log('PROMISE -->' + err.promise);
  console.log('TASK -->' + err.task);
  console.log('source url -->' +err.sourceUrl);
  console.log('type -->' + err.type);
  console.log('rejection' + err.rejection);
  res.render('error');
});

module.exports = app;
