var mongoose = require('mongoose'),
    Aviso = mongoose.model('Aviso');

/*CREATE*/
//Insertar un nuevo aviso
exports.addAviso = function(req, res){
    console.log("POST Aviso");

    var aviso = new Aviso(({
        categoria: req.body.categoria,
        imagen: req.body.imagen,
        localizacion: req.body.localizacion,
        datosUbicacion: req.body.datosUbicacion,
        descripcion: req.body.descripcion,
        seguimiento: req.body.seguimiento,
        autor: req.body.autor,
        apoyos: req.body.apoyos
    }));

    aviso.save(function (err, aviso) {
        if(err)
            return res.status(500).send(err.message);
        res.status(200).jsonp(aviso);
    });
};

/*READ*/
//Obtener todos los avisos
exports.findAllAvisos = function (req, res) {
    Aviso.find(function (err, avisos) {
        if(err)
            return res.status(500).send(err.message);
        console.log("GET Avisos")
        res.status(200).jsonp(avisos);
    });
};

//Obtener un aviso a partir de su id
exports.findAvisoById = function (req, res) {
    Aviso.findById(req.params.id, function (err, aviso) {
        if(err)
            return res.status(500).send(err.message);
        console.log("GET Aviso "+req.params.id);
        res.status(200).jsonp(aviso);
    });
};

/*UPDATE*/
//Modificar un aviso a partir de su id
exports.updateAviso = function (req, res) {
    console.log("Update aviso");
    Aviso.findById(req.params.id, function (err, aviso) {
            aviso.fecha = aviso.fecha,
            aviso.categoria = req.body.categoria,
            aviso.imagen = req.body.imagen,
            aviso.localizacion = req.body.localizacion,
            aviso.datosUbicacion = req.body.datosUbicacion,
            aviso.descripcion = req.body.descripcion,
            aviso.seguimiento = req.body.seguimiento,
            aviso.autor = req.body.autor,
            aviso.apoyos = req.body.apoyos;

            aviso.save(function (err, aviso) {
                if(err)
                    return res.status(500).send(err.message);
                res.status(200).jsonp(aviso);
            });

    });
};

/*DELETE*/
//Eliminar un aviso a partir de su id
exports.deleteAviso = function(req, res){
    Aviso.findById(req.params.id, function (err, aviso) {
        if(err)
            return res.status(500).send(err.message);
        res.status(200).send();
    });
};
