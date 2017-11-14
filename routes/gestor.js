var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    //gestorCtrl = require('../controllers/gestor'),
    Gestor = require('../models/gestor');

var emailController = require('../controllers/mail');

/*GET ALL GESTORES*/
router.get('/', function(req, res, next) {
  //añadir populate cuando
  Gestor.find().exec(function (err, gestores) {
    if (err) return next(err);
    res.json(gestores);
  });
});

/* GET SINGLE GESTOR BY ID */
router.get('/:id', function(req, res, next) {
  //añadir populate cuando
  Gestor.findById(req.params.id).exec(function (err, gestor) {
    if (err) return next(err);
    res.json(gestor);
  });
});

/* SAVE GESTOR */
router.post('/add', function(req, res, next) {
  Gestor.create(req.body, function (err, gestor) {
    if (err) return next(err);
    res.json(gestor);
  });
});

/* DELETE GESTOR */
router.delete('/:id', function(req, res, next) {
  Gestor.findByIdAndRemove(req.params.id, req.body, function (err, gestor) {
    if (err) return next(err);
    res.json(gestor);
  });
});

/* UPDATE GESTOR */
router.put('/:id', function(req, res, next) {
  Gestor.findByIdAndUpdate(req.params.id, req.body, function (err, gestor) {
    if (err) return next(err);
    res.json(gestor);
  });
});

/* AUTHENTICATE GESTOR*/
router.post('/auth', function(req, res, next) {
  Gestor.authenticate(req.body.email, req.body.password, function (err, gestor) {
    if(err || !gestor){
      return next(err);
    } else {
      return res.send('Autenticado correctamente');
    }
  });
});

/* RESET PASSWORD */
router.post('/resetpassword', function(req, res, next) {

  Gestor.findOne({ email: req.body.email }).exec(function (err, gestor) {
    if(err){
      return next(err)
    } else if (!gestor){
      var err = new Error('Gestor not found.');
      return next(err);
    }

    var generatePassword = require("password-generator");

    var maxLength = 18;
    var minLength = 12;
    var uppercaseMinCount = 3;
    var lowercaseMinCount = 3;
    var numberMinCount = 2;
    var specialMinCount = 2;
    var UPPERCASE_RE = /([A-Z])/g;
    var LOWERCASE_RE = /([a-z])/g;
    var NUMBER_RE = /([\d])/g;
    var SPECIAL_CHAR_RE = /([\?\-])/g;
    var NON_REPEATING_CHAR_RE = /([\w\d\?\-])\1{2,}/g;

    function isStrongEnough(passwordToChange) {
      var uc = passwordToChange.match(UPPERCASE_RE);
      var lc = passwordToChange.match(LOWERCASE_RE);
      var n = passwordToChange.match(NUMBER_RE);
      var sc = passwordToChange.match(SPECIAL_CHAR_RE);
      var nr = passwordToChange.match(NON_REPEATING_CHAR_RE);
      return passwordToChange.length >= minLength &&
        !nr &&
        uc && uc.length >= uppercaseMinCount &&
        lc && lc.length >= lowercaseMinCount &&
        n && n.length >= numberMinCount &&
        sc && sc.length >= specialMinCount;
    }

    function customPassword() {
      var passwordToChange = "";
      var randomLength = Math.floor(Math.random() * (maxLength - minLength)) + minLength;
      while (!isStrongEnough(passwordToChange)) {
        passwordToChange = generatePassword(randomLength, false, /[\w\d\?\-]/);
      }
      return passwordToChange;
    }

    //rellenamos los campos para actualizar (los demas los dejamos igual)
    gestor.nombre = gestor.nombre,
    gestor.apellido = gestor.apellido,
    gestor.alias = gestor.alias,
    gestor.email = gestor.email,
    gestor.password = customPassword(); //contraseña para autenticar (sin cifrar)
    gestor.telefono = gestor.telefono,
    gestor.codigoPostal = gestor.codigoPostal;

    console.log("nombre: "+gestor.nombre+" passTosave: "+ gestor.password );

    gestor.save(function (err, gestor) {
      //de aqui pasa a /models/usuario antes de hacer el save para cifrar la contraseña
      if(err)
        return next(err);
      res.status(200).jsonp(gestor);
    });

    emailController.sendPassEmail(req.body.email, 'A partir de ahora su contraseña es: '+gestor.password+'. \n Puede cambiarla en cualquier momento desde su perfil. \n Atentamente, \n El equipo de FIXIT')

  });
});

/*GET*/
//Obtener todos los gestores
//router.get('/all', gestorCtrl.findAllGestores);
//Obtener gestor por id
//router.get('/:id', gestorCtrl.findGestorById);

/*POST*/
//Añadir un gestor
//router.post('/add', gestorCtrl.addGestor);
//Authenticate
//router.post('/auth', gestorCtrl.GestorAuthentication);
//cambio de pass (olvido su contraseña?)
//router.post('/resetpassword', gestorCtrl.changepassword);

/*PUT*/
//Modificar datos de un gestor
//router.put('/:id/update', gestorCtrl.updateGestor);

/*DELETE*/
//Eliminar gestor a partir de su id
//router.delete('/:id/delete', gestorCtrl.deleteGestorById);

module.exports = router;
