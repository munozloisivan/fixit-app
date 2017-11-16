var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

var Aviso = require('../models/aviso');

/*GET ALL AVISOS*/
router.get('/', function(req, res, next) {
  Aviso.find().exec(function (err, avisos) {
    if (err) return next(err);
    res.json(avisos);
  });
});

/* GET SINGLE AVISO BY ID */
router.get('/:id', function(req, res, next) {
  Aviso.findById(req.params.id).exec(function (err, aviso) {
    if (err) return next(err);
    res.json(aviso);
  });
});

/* SAVE AVISO */
router.post('/add', function(req, res) {
  Aviso.create(req.body, function (err, aviso) {
      if (err) return next(err);
      res.json(aviso);
  });
});

/* DELETE CATEGORIA */
router.delete('/:id', function(req, res, next) {
  Aviso.findByIdAndRemove(req.params.id, req.body, function (err, aviso) {
    if (err) return next(err);
    res.json(aviso);
  });
});

/* UPDATE CATEGORIA */
router.put('/:id', function(req, res, next) {
  Aviso.findByIdAndUpdate(req.params.id, req.body, function (err, aviso) {
    if (err) return next(err);
    res.json(aviso);
  });
});

module.exports = router;
