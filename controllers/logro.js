var mongoose = require('mongoose'),
    Logro = mongoose.model('Logro');

/*CREATE*/
//Insert de un logro
exports.addLogro = function (req, res) {
    console.log("POST addLogro");

    var logro = new Logro(({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        puntos: req.body.puntos,
        titulo: req.body.titulo
    }));

    logro.save(function (err, logro) {
        if(err)
            return res.status(500).send(err.message);
        res.status(200).jsonp(logro);
    });
};

/*READ*/
//Buscar todos los logros
exports.findAllLogros = function (req, res) {
    Logro.find(function (err, logros) {
        if(err)
            res.send(500, err.message);

        console.log('GET logros');
        res.status(200).jsonp(logros);
    });
};

//Buscar un logro por id
exports.findLogroById = function (req, res) {
    Logro.findById(req.params.id, function (err, logro) {
        if(err)
            return res.status(500).send(err.message);
        console.log('GET Logro '+req.params.id);
        res.status(200).jsonp(logro);
    });
};


/*UPDATE*/
//Modificar un logro a partir de su id
exports.updateLogro = function (req, res) {
        Logro.findById(req.params.id, function (err, logro) {
            console.log('UPDATE Logro '+req.params.id);
            logro.nombre = req.body.nombre,
            logro.descripcion = req.body.descripcion,
            logro.puntos = req.body.puntos,
            logro.titulo = req.body.titulo;

            logro.save(function (err, logro) {
                if(err)
                    return res.status(500).send(err.message);
                res.status(200).jsonp(logro);
            });

    });
};

/*DELETE*/
//Eliminar un logro por su ID
exports.deleteLogro = function (req, res) {
    Logro.findById(req.params.id, function (err, logro) {
        logro.remove(function (err) {
            if(err)
                return res.status(500).send(err.message);
            res.status(200).send();
        });
    });
};