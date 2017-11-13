var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    avisoCtrl = require('../controllers/aviso');

/*GET*/
//Obtener todos los avisos
router.get('/all', avisoCtrl.findAllAvisos);
//Obtener un aviso a partir de su id
router.get('/:id', avisoCtrl.findAvisoById);

/*POST*/
//Insertar un nuevo aviso
router.post('/add', avisoCtrl.addAviso);

/*PUT*/
//Modificar un aviso a partir de su id
router.put('/:id/update', avisoCtrl.updateAviso);

/*DELETE*/
//Eliminar un aviso a partir de su id
router.delete('/:id/delete', avisoCtrl.deleteAviso);


module.exports = router;