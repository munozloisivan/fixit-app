var mongoose = require('mongoose'),
    Categoria = mongoose.model('Categoria');

/*CREATE*/
//Añadir una categoria
exports.addCategoria = function (req, res) {
    console.log("POST addCategoria ");

    var categoria = new Categoria(({
        tipo: req.body.tipo,
        subtipo: req.body.subtipo,
        prioridad: req.body.prioridad,
        icono: req.body.icono,
        telefonoContacto: req.body.telefonoContacto,
        emailContacto: req.body.telefonoContacto,
        personaContacto: req.body.personaContacto,
        empresaContacto: req.body.empresaContacto,
        horarioContacto: req.body.horarioContacto

    }));

    categoria.save(function (err, categoria) {
        if(err)
            return res.status(500).send(err.message);
        res.status(200).jsonp(categoria);
    });
};

/*READ*/
//Obtenere todas las categorias
exports.findAllCategorias = function (req, res) {
    Categoria.find(function (err, categorias) {
        if(err)
            return res.status(500).send(err.message);
        console.log("GET Categorias");
        res.status(200).jsonp(categorias);
    });
};

//Obtener una categoria a partir de su id
exports.findCategoriaById = function (req, res) {
    Categoria.findById(req.params.id, function (err, categoria) {
        if(err)
            return res.status(500).send(err.message);
        console.log("GET Categoria "+req.params.id);
        res.status(200).jsonp(categoria);
    });
};


/*UPDATE*/
//Modificar una categoria a partir de su id
exports.updateCategoria = function (req, res) {
    Categoria.findById(req.params.id, function (err, categoria) {
        console.log("Update Categoria "+req.params.id);
            //categoria.tipo = req.body.tipo,           deshabilitadas
            //categoria.subtipo = req.body.subtipo,
            categoria.prioridad = req.body.prioridad,
            categoria.icono = req.body.icono,
            categoria.telefonoContacto = req.body.telefonoContacto,
            categoria.emailContacto = req.body.telefonoContacto,
            categoria.personaContacto = req.body.personaContacto,
            categoria.empresaContacto = req.body.empresaContacto,
            categoria.horarioContacto = req.body.horarioContacto;

            categoria.save(function (err, categoria) {
                if(err)
                    return res.status(500).send(err.message);
                res.status(200).jsonp(categoria);
            });
    });
};

/*DELETE*/
//Eliminar una categoria a partir de id
exports.deleteCategoria = function (req, res) {
    Categoria.findById(req.params.id, function (err, categoria) {
        categoria.remove(function (err) {
            if(err)
                return res.status(500).send(err.message);
            res.status(200).send();
        });
    })
}