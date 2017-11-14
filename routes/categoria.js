var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

var Categoria = require('../models/categoria');

/*GET ALL CATEGORIAS*/
router.get('/', function(req, res, next) {
  Categoria.find().exec(function (err, categorias) {
    if (err) return next(err);
    res.json(categorias);
  });
});

/* GET SINGLE CATEGORIA BY ID */
router.get('/:id', function(req, res, next) {
  Categoria.findById(req.params.id).exec(function (err, categoria) {
    if (err) return next(err);
    res.json(categoria);
  });
});

/* SAVE CATEGORIA */
router.post('/add', function(req, res, next) {
  Categoria.create(req.body, function (err, categoria) {
    if (err) return next(err);
    res.json(categoria);
  });
});

/* DELETE CATEGORIA */
router.delete('/:id', function(req, res, next) {
  Categoria.findByIdAndRemove(req.params.id, req.body, function (err, categoria) {
    if (err) return next(err);
    res.json(categoria);
  });
});

/* UPDATE CATEGORIA */
router.put('/:id', function(req, res, next) {
  Categoria.findByIdAndUpdate(req.params.id, req.body, function (err, categoria) {
    if (err) return next(err);
    res.json(categoria);
  });
});


/*GET*/
//Obtener todas las categorias
//router.get('/all', categoriaCtrl.findAllCategorias);
//Obtener una categoria a partir de su id
//router.get('/:id', categoriaCtrl.findCategoriaById);

/*POST*/
//Añadir una categoria nueva
//router.post('/add', categoriaCtrl.addCategoria);

/*PUT*/
//Modificar una categoria a partir de su id
//router.put('/:id', categoriaCtrl.updateCategoria);

/*DELETE*/
//Eliminar categoria a partir del id
//router.delete('/:id/delete', categoriaCtrl.deleteCategoria);

module.exports = router;
