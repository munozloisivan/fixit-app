var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Usuario = require('../models/usuario');

var emailController = require('../controllers/mail');
var fs = require('fs');
var bcrypt = require('bcryptjs');
var jwt = require('../services/jwt');
var md_auth = require('../middlewares/athenticated');

var Aviso = require('../models/aviso');
var Logro = require('../models/logro');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './public/usuarios'});

/*GET ALL USERS*/
router.get('/', function(req, res, next) {
  //añadir populate cuando haya avisos y logros creados
  Usuario.find().populate('logros.coleccion').populate('avisos.apoyados').populate('avisos.creados').exec(function (err, usuarios) {
    if (err) return next(err);
    res.json(usuarios);
  });
});

/* GET SINGLE USER BY ID */
router.get('/:id', function(req, res, next) {
  //añadir populate cuando haya avisos y logros creados .populate('avisos','logros')
  Usuario.findById(req.params.id).populate('logros.coleccion').populate('avisos.apoyados').populate('avisos.creados').exec(function (err, usuario) {
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
              res.status(200).jsonp({
                user: user,
                token: jwt.createTokenUser(user),
                role: 'USUARIO'
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
          bcrypt.hash(usuario.password, 10, function (err, hash) {
            usuario.password = hash;

            Usuario.create(usuario, function (err, usuario) {
              if (err) return next(err);
              res.status(200).send({m: "Registro correcto"});
            });
          });
        }else {
          res.status(404).send({m: "El correo electrónico ya esta registrado"})
        }
    }
  });
});

// UPLOAD FOTO A USUARIO
router.post('/image/:id', md_upload, function (req, res) {

  var file_name = 'No subido';


  if(req.files){

    console.log(req.files);
    var file_path = req.files.image.path;
    var file_split = file_path.split('\/');
    var file_name = file_split[2];
    var ext_split = file_path.split('\.');
    var file_ext = ext_split[1];

    console.log(file_path +" "+ file_name);

    if(file_ext === 'png' || file_ext === 'jpg' || file_ext === 'jpeg'){
      Usuario.findById(req.params.id).exec(function (err, jugador) {
        if (err) return next(err);
        var image_name = jugador.imagen;

        if (image_name.toString().trim() === 'user.png'){
          Usuario.findByIdAndUpdate(jugador, {imagen: file_name}, {new: true}, function (err, act) {
            if (err){
              res.status(500).send({message: 'Error al actualizar el usuario'})
            }else {
              if (!act){
                res.status(404).send({message: 'No se ha podido actualizar al usuario'})
              }else {
                res.status(200).send({jugador: act})
              }
            }
          })
        } else {
          var path_dev = '/Users/rober/fixit-app/public/usuarios/';
          var path_prod = '/fixit/public/usuarios/';
          fs.unlink(path_prod + image_name, function (err2) {
            if (err2) throw err2;
            Usuario.findByIdAndUpdate(jugador, {imagen: file_name}, {new: true}, function (err, act) {
              if (err) {
                res.status(500).send({message: 'Error al actualizar el usuario'})
              } else {
                if (!act) {
                  res.status(404).send({message: 'No se ha podido actualizar al usuario'})
                } else {
                  res.status(200).send({jugador: act})
                }
              }
            })
          });
        }
      });
    }else {
      res.status(300).send({message: 'Extensión no valida'});
    }
  }else{
    res.status(500).send({message: 'No se ha subido el archivo'})
  }

  //res.status(200).send({path: file_path, split: file_split, name: file_name, ext: file_ext})
});

/* DELETE USUARIO */
router.delete('/:id', function(req, res, next) {

  Usuario.findById(req.params.id, 'avisos.creados -_id').exec(function(err, result) {
    if (err) return next(err);
    console.log(result.avisos.creados);

      Aviso.remove({'_id':{'$in':result.avisos.creados}}, function (err, result) {
        if (err) return next(err);

        Usuario.findByIdAndRemove(req.params.id, req.body, function (err, usuario) {
          if (err) return next(err);
          res.json(usuario);
        });
      });
  });
});

/* UPDATE USUARIO */                /* REEEEEEEEEEEEEEEEEVIIIISAAAAAAAAAAAAAAAAAAR puede q falle pq no hay avisos ni logros puestos */
router.put('/:id', function(req, res, next) {
  Usuario.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

/* AÑADIR APOYO A  AVISO de un usuario */
router.post('/:id/apoyo/:idaviso', function (req, res, next) {
  Usuario.update({_id:req.params.id},{ $push: { "avisos.apoyados" : req.params.idaviso }}, function (err, usuario) {
    if (err) return next(err);

    Aviso.findById(req.params.idaviso).exec(function (err, aviso) {
      if (err) return next(err);
      console.log(aviso['apoyos']);

      var apoyos_act = +aviso['apoyos'];
      apoyos_act = apoyos_act + 1;

      Aviso.findByIdAndUpdate({_id:req.params.idaviso},{ $set: { "apoyos" : apoyos_act }}, function (err, aviso_act) {
        if (err) return next(err);
        res.json(aviso);
      });
    });
  });
});


/* ELIMINAR AVISO A UN USUARIO */
router.delete('/:id/aviso/:idaviso', function (req, res, next) {
  var id = req.params.id;
  var idaviso = req.params.idaviso;

  Usuario.update({_id: id},{ $pull: { "avisos.creados" :idaviso }}, function (err, aviso) {
    if (err) return next(err);
  });

  Aviso.findByIdAndRemove(idaviso, req.body, function (err, aviso) {
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

/* AÑADIR TITULO A USUARIO */
router.put('/titulo/:id', function (req, res, next) {
  console.log(req.body);
  Usuario.findByIdAndUpdate({_id:req.params.id},{ $set: { "logros.tituloActivo" : req.body.tituloActivo }}, function (err, usuario) {
    if (err) return next(err);
    res.json(usuario);
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

  console.log('REQ crear aviso desde usuario :'+ req.toString());
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
      res.json(aviso);
    });
  });
});
/*GET AVISOS BY NOMBRE */
router.get('/filter/nombre/:nombre', function (req, res, next) {
  Usuario.find({"nombre": req.params.nombre }).exec(function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/*GET AVISOS BY TEL */
router.get('/filter/telefono/:telefono', function (req, res, next) {
  Usuario.find({"telefono": req.params.telefono }).exec(function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/*GET AVISOS BY CP*/
router.get('/filter/cp/:cp', function (req, res, next) {
  Usuario.find({"codigoPostal": req.params.cp }).exec(function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/*GET AVISOS BY CP*/
router.get('/filter/dni/:dni', function (req, res, next) {
  Usuario.find({"dni": req.params.dni }).exec(function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

//
//
//
// /* obtener token olvidar contraseña */
// router.post('/olvideContraseña', function(req, res, next) {
//
//
//
//   async.waterfall([
//     function(done) {
//       User.findOne({
//         email: req.body.email
//       }).exec(function(err, user) {
//         if (user) {
//           done(err, user);
//         } else {
//           done('User not found.');
//         }
//       });
//     },
//     function(user, done) {
//       // create the random token
//       crypto.randomBytes(20, function(err, buffer) {
//         var token = buffer.toString('hex');
//         done(err, user, token);
//       });
//     },
//     function(user, token, done) {
//       User.findByIdAndUpdate({ _id: user._id }, { token_temporal: token, token_caducidad: Date.now() + 5550000 }, { upsert: true, new: true }).exec(function(err, new_user) {
//         done(err, token, new_user);
//       });
//     },
//     function(token, user, done) {
//       console.log("http://localhost:3000/#/insertarContraseña?token="+token);
//     }
//   ], function(err) {
//     next(err);
//   });
// });
// router.post('/resetearContrasena', function(req, res, next) {
//   User.findOne({
//     token_temporal: req.body.token,
//     token_caducidad: {
//       $gt: Date.now()
//     }
//   }).exec(function(err, user) {
//     if (!err && user) {
//       bcrypt.hash(req.body.password, null, null, function (err, hash) {
//         if (err)
//           next(err);
//         else{
//           user.password = hash;
//         }
//       });
//       user.token_temporal = undefined;
//       user.token_caducidad = undefined;
//       user.save(function(err) {
//         if (err) {
//           return res.status(422).send({
//             message: err
//           });
//         } else {
//           console.log("Se ha guardado bien la contraseña reseteada");//Aqui tendria que ir el aviso a la persona de que se ha reseteado
//         }
//       });
//     } else {
//       return res.status(400).send({
//         message: 'token invalido'
//       });
//     }
//   });
// });

/* CHANGE PASSWORD */
/*router.put('/:id/change', function (req, res, next) {
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

});*/

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
