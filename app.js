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

mongoose.connect('mongodb://localhost/fixitest', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(router);

app.use('/aviso', aviso);
app.use('/usuario', usuario);
app.use('/gestor', gestor);
app.use('/categoria', categoria);
app.use('/logro', logro);
app.use('/mail', mailroutes);



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


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
