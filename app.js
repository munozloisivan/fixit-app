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
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));

app.use(router);
app.use('/usuario', usuario);
app.use('/gestor', gestor);
app.use('/categoria', categoria);
app.use('/aviso', aviso);
app.use('/logro', logro);

mongoose.Promise = global.Promise;


mongoose.connect('mongodb://localhost/fixitest', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

app.listen(3000, function() {
  console.log("Server running on http://localhost:3000");
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
  res.render('error');
});

module.exports = app;
