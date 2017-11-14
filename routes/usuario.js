var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Usuario = require('../models/usuario');

var emailController = require('../controllers/mail');

/*GET ALL USERS*/
router.get('/', function(req, res, next) {
  //añadir populate cuando haya avisos y logros creados
  Usuario.find().exec(function (err, usuarios) {
    if (err) return next(err);
    res.json(usuarios);
  });
});

/* GET SINGLE USER BY ID */
router.get('/:id', function(req, res, next) {
  //añadir populate cuando haya avisos y logros creados .populate('avisos','logros')
  Usuario.findById(req.params.id).exec(function (err, usuario) {
    if (err) return next(err);
    res.json(usuario);
  });
});

/* SAVE USUARIO */
router.post('/add', function(req, res, next) {
  Usuario.create(req.body, function (err, usuario) {
    if (err) return next(err);
    res.json(usuario);
  });
});

/* DELETE USUARIO */
router.delete('/:id', function(req, res, next) {
  Usuario.findByIdAndRemove(req.params.id, req.body, function (err, usuario) {
    if (err) return next(err);
    res.json(usuario);
  });
});

/* UPDATE USUARIO */                /* REEEEEEEEEEEEEEEEEVIIIISAAAAAAAAAAAAAAAAAAR puede q falle pq no hay avisos ni logros puestos */
router.put('/:id', function(req, res, next) {
  Usuario.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

/* AUTHENTICATE USUARIO*/
router.post('/auth', function(req, res, next) {
  Usuario.authenticate(req.body.email, req.body.password, function (err, usuario) {
    if(err || !usuario){
      return next(err);
    } else {
      return res.send('Autenticado correctamente');
    }
  });
});

/* RESET PASSWORD */
router.post('/resetpassword', function(req, res, next) {

  Usuario.findOne({ email: req.body.email }).exec(function (err, user) {
    if(err){
      return next(err)
    } else if (!user){
      var err = new Error('User not found.');
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
    user.nombre = user.nombre,
    user.apellido = user.apellido,
    user.alias = user.alias,
    user.email = user.email,
    user.password = customPassword(); //contraseña para autenticar (sin cifrar)
    user.telefono = user.telefono,
    user.codigoPostal = user.codigoPostal;

    console.log("nombre: "+user.nombre+" passTosave: "+ user.password );

    user.save(function (err, user) {
      //de aqui pasa a /models/usuario antes de hacer el save para cifrar la contraseña
      if(err)
        return next(err);
      res.status(200).jsonp(user);
    });

    emailController.sendPassEmail(req.body.email, 'A partir de ahora su contraseña es: '+user.password+'. \n Puede cambiarla en cualquier momento desde su perfil. \n Atentamente, \n El equipo de FIXIT')

  });
});

module.exports = router;
