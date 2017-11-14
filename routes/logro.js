var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

var Logro = require('../models/logro');

/*GET ALL LOGROS*/
router.get('/', function(req, res, next) {
  Logro.find().exec(function (err, logros) {
    if (err) return next(err);
    res.json(logros);
  });
});

/* GET SINGLE LOGRO BY ID */
router.get('/:id', function(req, res, next) {
  Logro.findById(req.params.id).exec(function (err, logro) {
    if (err) return next(err);
    res.json(logro);
  });
});

/* SAVE CATEGORIA */
router.post('/add', function(req, res, next) {
  Logro.create(req.body, function (err, logro) {
    if (err) return next(err);
    res.json(logro);
  });
});

/* DELETE LOGRO */
router.delete('/:id', function(req, res, next) {
  Logro.findByIdAndRemove(req.params.id, req.body, function (err, logro) {
    if (err) return next(err);
    res.json(logro);
  });
});

/* UPDATE LOGRO */
router.put('/:id', function(req, res, next) {
  Logro.findByIdAndUpdate(req.params.id, req.body, function (err, logro) {
    if (err) return next(err);
    res.json(logro);
  });
});


/*GET*/
//Obtener todos los logros
//router.get('/all', logroCtrl.findAllLogros);
//Obtener logro por id
//router.get('/:id', logroCtrl.findLogroById);

/*POST*/
//Añadir un logro
//router.post('/add', logroCtrl.addLogro);

/*PUT*/
//router.put('/:id/update', logroCtrl.updateLogro);

/*DELETE*/
//router.delete('/:id/delete', logroCtrl.deleteLogro);

module.exports = router;
