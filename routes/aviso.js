var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

var Aviso = require('../models/aviso');
var Categoria = require('../models/categoria');
var fs = require('fs');
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './public/avisos'});

/*GET ALL AVISOS*/
router.get('/', function(req, res, next) {
  Aviso.find().populate('categoria').populate('autor').exec(function (err, avisos) {
    if (err) return next(err);
    res.json(avisos);
  });
});

router.get('/stats', function(req, res, next) {
  Categoria.find().exec(function (err, categorias) {
    if (err) return next(err);

    var labels = [];
    var cantidad = [];
    for (index in categorias){
      labels.push(categorias[index].tipo);
      Aviso.find({categoria: categorias[index]._id}).exec(function (err, avisos) {
        if (err) return next(err);

        var count = 0;
        for ( index2 in avisos){
          count++;
        }
       cantidad.push(count);
      });
    }
    console.log(cantidad);
    console.log(labels);
    res.json("hecho");
  });

});

/* GET SINGLE AVISO BY ID */
router.get('/:id', function(req, res, next) {
  Aviso.findById(req.params.id).populate('categoria').populate('autor').exec(function (err, aviso) {
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

/* UPDATE AVISO */
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

/*GET AVISOS BY categoria */
router.get('/filter/seguimiento/:seguimiento', function (req, res, next) {
  Aviso.find({"seguimiento": req.params.seguimiento }).populate('autor').populate('categoria').exec(function (err, post) {
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

/*GET AVISOS BY CIUDAD */
router.get('/filter/ciudad/:ciudad', function (req, res, next) {
    Aviso.find({"datosUbicacion.ciudad": req.params.ciudad }).populate('autor').populate('categoria').exec(function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
});

/*GET AVISOS BY CP */
router.get('/filter/cp/:ciudad', function (req, res, next) {
  Aviso.find({"datosUbicacion.codPostal": req.params.ciudad }).populate('autor').populate('categoria').exec(function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET AVISOS ORDERED BY APOYOS */
router.get('/filter/apoyos', function (req, res, next) {
  Aviso.find({}, null, {sort: {apoyos: -1 }}).populate('categoria').populate('autor').exec(function (err, result) {
    if (err) return next(err);
    res.json(result);
  });
});

// UPLOAD FOTO A AVISO
router.post('/image/:id', md_upload, function (req, res) {

  var file_name = 'No subido';
  console.log('entra en /image/id servidor (req) ' + req);
  if(req.files){

    console.log('req files ' +req.files);
    var file_path = req.files.image.path;
    var file_split = file_path.split('\/');
    var file_name = file_split[2];
    var ext_split = file_path.split('\.');
    var file_ext = ext_split[1];

    console.log(file_path +" "+ file_name);

    if(file_ext === 'png' || file_ext === 'jpg' || file_ext === 'jpeg'){
      Aviso.findById(req.params.id).exec(function (err, jugador) {
        if (err) return next(err);
        var image_name = jugador.imagen;

        if (image_name.toString().trim() === 'aviso.png'){
          Aviso.findByIdAndUpdate(jugador, {imagen: file_name}, {new: true}, function (err, act) {
            if (err){
              res.status(500).send({message: 'Error al actualizar el aviso'})
            }else {
              if (!act){
                res.status(404).send({message: 'No se ha podido actualizar al aviso'})
              }else {
                res.status(200).send({jugador: act})
              }
            }
          })
        } else {
          var path_dev = '/Users/rober/fixit-app/public/avisos/';
          var path_prod = '/fixit/public/avisos/';
          fs.unlink(path_prod + image_name, function (err2) {
            if (err2) throw err2;
            Aviso.findByIdAndUpdate(jugador, {imagen: file_name}, {new: true}, function (err, act) {
              if (err) {
                res.status(500).send({message: 'Error al actualizar el aviso'})
              } else {
                if (!act) {
                  res.status(404).send({message: 'No se ha podido actualizar al aviso'})
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


/*DELETE AVISOS IF DELETE STUDENT*/

module.exports = router;
