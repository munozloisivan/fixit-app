var mongoose = require('mongoose'),
    Gestor = mongoose.model('Gestor'),
    emailController = require('../controllers/mail');

/*CREATE*/
//Insertar un nuevo gestor
exports.addGestor = function (req, res) {
    console.log('POST addGestor');

    var gestor = new Gestor(({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        dni: req.body.dni,
        email: req.body.email,
        password: req.body.password,
        delegacion: req.body.delegacion,
        departamento: req.body.departamento,
        telefono: req.body.telefono

    }));

    gestor.save(function (err, gestor) {
        if(err)
            return res.status(500).send(err.message);
        res.status(200).jsonp(gestor);
    })
};

/*READ*/
//Buscar todos los gestores
exports.findAllGestores = function (req, res) {
    Gestor.find(function (err, gestores) {
        if(err)
            return res.status(500).send(err.message);
        res.status(200).jsonp(gestores);
    });
};

//Buscar un gestor por id
exports.findGestorById = function (req, res) {
    Gestor.findById(req.params.id, function (err, gestor) {
        console.log('GET gestor '+req.params.id);
        if(err)
            return res.status(500).send(err.message);
        res.status(200).jsonp(gestor);
    });
};

/*UPDATE*/
//Modificar los datos de un gestor
exports.updateGestor = function (req, res) {
    Gestor.findById(req.params.id, function (err, gestor) {
        console.log('UPDATE Gestor '+req.params.id);
            gestor.nombre = req.body.nombre,
            gestor.apellidos = req.body.apellidos,
            gestor.email = req.body.email,
            gestor.password = req.body.password,
            gestor.delegacion = req.body.delegacion,
            gestor.departamento = req.body.departamento,
            gestor.telefono = req.body.telefono;

            gestor.save(function (err, gestor) {
                if(err)
                    return res.status(500).send(err.message);
                res.status(200).jsonp(gestor);
            });
    });
};

/*DELETE*/
//Eliminar un gestor a partir de su id
exports.deleteGestorById = function (req,res) {
        Gestor.findById(req.params.id, function (err, gestor) {
            console.log('DELETE Gestor '+req.params.id);
        gestor.remove(function (err) {
            if(err)
                return res.status(500).send(err.message);
            res.status(200).send();
        });
    });
};


//Authenticate
exports.GestorAuthentication = function (req, res) {
    Gestor.authenticate(req.body.email, req.body.password, function (error, gestor) {
        if(error || !gestor){
            var error = new Error('Correo o contraseña incorrectos.');
            error.status = 401;
            return res.send(error.message);
        } else {
            return res.send('Autenticado correctamente');
        }

    });
};


//Generación de contraseña nueva, cifrada y enviada por mail
exports.changepassword = function(req, res){
    var id;

    Gestor.findOne({ email: req.body.email}).exec(function (err, gestor) {
        id = gestor._id;
        if(err){
            return callback(err)
        } else if(!gestor){
            var err = new Error('Gestor no encontrado.');
            err.status = 401;
            return callback(err.message);
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

        //relleno de campos a actualizar
        gestor.nombre = req.body.nombre,
        gestor.apellidos = req.body.apellidos,
        gestor.email = req.body.email,
        gestor.password = customPassword(),
        gestor.delegacion = req.body.delegacion,
        gestor.departamento = req.body.departamento,
        gestor.telefono = req.body.telefono;

        console.log("nombre: "+gestor.nombre+" passTosave: "+ gestor.password );

        gestor.save(function (err, gestor) {
            //antes de guardarse pasa al modelo donde cifra la pass (pre save)
            if(err)
                return res.status(500).send(err.message);
            res.status(200).jsonp(gestor);
        });

        emailController.sendPassEmail(req.body.email, 'A partir de ahora su contraseña es: '+gestor.password+'. \n Puede cambiarla en cualquier momento desde su perfil. \n Atentamente, \\n El equipo de FIXIT\ ')

    });
};