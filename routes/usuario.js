var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Usuario = require('../models/usuario');

var emailController = require('../controllers/mail');

var bcrypt = require('bcrypt');
var jwt = require('../services/jwt');
var md_auth = require('../middlewares/athenticated');

var Aviso = require('../models/aviso');
var Logro = require('../models/logro');

/*GET ALL USERS*/
router.get('/', function(req, res, next) {
  //añadir populate cuando haya avisos y logros creados
  Usuario.find().populate('logros.coleccion').exec(function (err, usuarios) {
    if (err) return next(err);
    res.json(usuarios);
  });
});

/* GET SINGLE USER BY ID */
router.get('/:id', function(req, res, next) {
  //añadir populate cuando haya avisos y logros creados .populate('avisos','logros')
  Usuario.findById(req.params.id).populate('logros').exec(function (err, usuario) {
    if (err) return next(err);
    res.json(usuario);
  });
});

/*LOGIN USARIO*/
router.post('/auth', function (req, res) {
  var params = req.body;
  var email = params.email;
  var password = params.password;
  Usuario.findOne({email: email.toLowerCase()}).exec(function (err, user) {
    if (err){
      res.status(500).send({m: "Error del servidor"})
    }else{
        if(user){
          bcrypt.compare(password, user.password, function (err, check) {
            if (check){
              res.status(200).send({
                token: jwt.createTokenUser(user)
              });
            }else{
              res.status(404).send({m: "Contraseña incorrecta"})
            }
          });
        }else{
          res.status(404).send({m:"El correo electrónico no esta registrado"});
        }
    }
  })
});

/* SAVE USUARIO */
router.post('/add', function(req, res, next) {

  var usuario = new Usuario();
  usuario = req.body;

  Usuario.findOne({email: usuario.email.toLocaleLowerCase()}).exec(function (err, match) {
    if (err){
      res.status(500).send({m: "Error del servidor"})
    }else{
        if (!match){
          Usuario.findOne({dni: usuario.dni}).exec(function (err, match) {
            if (err){
              res.status(500).send({m: "Error del servidor"})
            }else{
              if (!match){
                Usuario.findOne({telefono: usuario.telefono}).exec(function (err, match) {
                  if (err){
                    res.status(500).send({m: "Error del servidor"})
                  }else{
                    if (!match){
                      bcrypt.hash(usuario.password, 10, function (err, hash) {
                        usuario.password = hash;

                        Usuario.create(usuario, function (err, usuario) {
                          if (err) return next(err);
                          res.json(usuario);
                        });
                      });
                    }else {
                      res.status(200).send({m: "El teléfono ya esta registrado"})
                    }
                  }
                });
              }else {
                res.status(200).send({m: "El dni ya esta registrado"})
              }
            }
          });
        }else {
          res.status(200).send({m: "El correo electrónico ya esta registrado"})
        }
    }
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

/* AÑADIR AVISO A USUARIO */
router.post('/:id/aviso/:idaviso', function (req, res, next) {
  Usuario.update({_id:req.params.id},{ $push: { "avisos.creados" : req.params.idaviso }}, function (err, aviso) {
    if (err) return next(err);
    res.json(aviso);
  });
});

/* AÑADIR LOGRO A USUARIO */
router.post('/:id/logro/:idlogro', function (req, res, next) {
  Usuario.update({_id:req.params.id},{ $push: { "logros.coleccion" : req.params.idlogro }}, function (err, aviso) {
    if (err) return next(err);
    res.json(aviso);
  });
});

/* OBTENER LOGROS DE UN USUARIO  */
router.get('/:id/logros', function(req, res, next) {
  Usuario.findById(req.params.id).populate('logros.coleccion').exec(function (err, logros) {
    if (err) return next(err);
    res.json(logros);
  });
});

/* CREAR UN AVISO DESDE USUARIO */
router.post('/:id/addaviso', function(req, res) {
  var idAviso;
  var idUsuario = req.params.id;

  console.log('ID USUARIO: ' + req.params.id);
  console.log('ID AVISO: ' + req.body._id);

  Aviso.create(req.body, function (err, aviso) {
    if (err) console.log(err);
    idAviso = aviso._id;

    Aviso.update({_id: idAviso},{ $set : { "autor" : idUsuario }}, function (err, aviso) {
      if (err) console.log(err);
    });

    Usuario.update({_id: idUsuario},{ $push : { "avisos.creados" : idAviso }}, function (err, usuario) {
      if (err) console.log(err);
      res.json(usuario);
    });
  });
});

/* CHANGE PASSWORD */
router.put('/:id/change', function (req, res, next) {
  var pass_hashed;

  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if(err){
      return next(err);
    }
    user.password = hash;
    next();
    Usuario.findByIdAndUpdate(req.params.id, { $set: { "password": req.body.password} }, function (err, user) {
      if (err) return next(err);
      res.json(user)
    });
  });

});

/* RESET PASSWORD */
router.post('/resetpassword', function(req, res) {

  console.log('Entra en routes/usuario/resetpassword');

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

  var passToSet = customPassword();

  Usuario.findAndModify({
    query: { email: req.body.email },
    sort: { rating: 1 },
    update: { $set: { password: passToSet } },
    upsert: true
  }).exec(function (err, user) {
    if(err){
      console.log(err)
    } else if (!user){
      var err = new Error('User not found.');
      console.log(err);
    }




   /* user.save(function (err, user) {
      //de aqui pasa a /models/usuario antes de hacer el save para cifrar la contraseña
      if(err)
        console.log(err);
      //res.status(200).jsonp(user);
    });

    */
    emailController.sendPassEmail(req.body.email, 'A partir de ahora su contraseña es: '+passToSet+'. \n Puede cambiarla en cualquier momento desde su perfil. \n Atentamente, \n El equipo de FIXIT');

  });
});

module.exports = router;
