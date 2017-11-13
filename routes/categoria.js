var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    categoriaCtrl = require('../controllers/categoria');


/*GET*/
//Obtener todas las categorias
router.get('/all', categoriaCtrl.findAllCategorias);
//Obtener una categoria a partir de su id
router.get('/:id', categoriaCtrl.findCategoriaById);

/*POST*/
//Añadir una categoria nueva
router.post('/add', categoriaCtrl.addCategoria);

/*PUT*/
//Modificar una categoria a partir de su id
router.put('/:id', categoriaCtrl.updateCategoria);

/*DELETE*/
//Eliminar categoria a partir del id
router.delete('/:id/delete', categoriaCtrl.deleteCategoria);

module.exports = router;