var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    logroCtrl = require('../controllers/logro');

/*GET*/
//Obtener todos los logros
router.get('/all', logroCtrl.findAllLogros);
//Obtener logro por id
router.get('/:id', logroCtrl.findLogroById);

/*POST*/
//Añadir un logro
router.post('/add', logroCtrl.addLogro);

/*PUT*/
router.put('/:id/update', logroCtrl.updateLogro);

/*DELETE*/
router.delete('/:id/delete', logroCtrl.deleteLogro);


module.exports = router;