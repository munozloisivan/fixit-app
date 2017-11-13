var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    usuarioCtrl = require('../controllers/usuario');



/*GET*/
//ver todos los usuarios
router.get('/all', usuarioCtrl.findAllUsers);
//Ver usuario por id
router.get('/:id', usuarioCtrl.findUserById);

/*POST*/
//insertar un usuario
router.post('/add', usuarioCtrl.addUser);
//Authenticate
router.post('/auth', usuarioCtrl.UserAuthentication);
//sacada de rabo con cambio de pass
router.post('/resetpassword', usuarioCtrl.changepassword);

/*PUT*/
//Actualizar datos de usuario
router.put('/:id/update', usuarioCtrl.updateUsuarioPersonal);

/*DELETE*/
router.delete('/:id/deleete', usuarioCtrl.deleteUser);


module.exports = router;