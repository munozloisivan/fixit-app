var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

var Aviso = require('../models/aviso');
var Categoria = require('../models/categoria');

/*GET ALL AVISOS*/
router.get('/', function(req, res, next) {
  Aviso.find().populate('categoria').exec(function (err, avisos) {
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

/* GET AVISOS DE UN USUARIO */
router.get('/usuario/:idusuario', function (req, res, next) {
  Aviso.find({"autor": req.params.idusuario }).populate('autor').populate('categoria').exec(function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/*GET AVISOS BY categoria */
router.get('/filter/categoria/:categoria', function (req, res, next) {
  Aviso.find({"categoria": req.params.categoria }).populate('autor').populate('categoria').exec(function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/*GET AVISOS BY TIPO */
router.get('/filter/tipo/:tipo', function (req, res, next) {
  Categoria.find({"tipo": req.params.tipo}).select('_id').exec(function (err, idcat) {
    Aviso.find({"categoria": idcat }).populate('autor').populate('categoria').find().exec(function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
});

/*GET AVISOS BY SUBTIPO */
router.get('/filter/subtipo/:subtipo', function (req, res, next) {
  Categoria.find({"subtipo": req.params.subtipo}).select('_id').exec(function (err, idcat) {
    Aviso.find({"categoria": idcat }).populate('autor').populate('categoria').exec(function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
});

/*GET AVISOS BY PRIORIDAD */
router.get('/filter/prioridad/:prioridad', function (req, res, next) {
  Categoria.find({"prioridad": req.params.prioridad}).select('_id').exec(function (err, idcat) {
    Aviso.find({"categoria": idcat }).populate('autor').populate('categoria').exec(function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
});

/* GET AVISOS ORDERED BY DATE */
router.get('/filter/date', function (req, res, next) {
  Aviso.find({}, null, {sort: {fecha: 1 }}, function (err, result) {
    if (err) return next(err);
    res.json(result);
  });
});




module.exports = router;
