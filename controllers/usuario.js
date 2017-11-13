var mongoose = require('mongoose'),
    Usuario = mongoose.model('Usuario');

var User = require('../models/usuario');

var emailController = require('../controllers/mail');


/*CREATE*/
//Insert a new user
exports.addUser = function (req, res) {
    console.log("POST addUser");

    var usuario = new Usuario(({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        alias: req.body.alias,
        dni: req.body.dni,
        email: req.body.email,
        password: req.body.password,
        telefono: req.body.telefono,
        codigoPostal: req.body.codigoPostal
    }));

    usuario.save(function (err, usuario) {
        if(err)
            return res.status(500).send(err.message);
        res.status(200).jsonp(usuario);
    });
};

/*READ*/
//Buscar usuario por ID
exports.findUserById = function (req, res) {
    Usuario.findById(req.params.id, function (err, usuario) {
        if(err)
            return res.send(500, err.message);
        console.log('GET usuario' + req.params.id);
        res.status(200).jsonp(usuario);
    });
};

//Buscar todos los ususarios
exports.findAllUsers = function (req, res) {
    Usuario.find(function (err, usuarios) {
        if(err)
            res.send(500, err.message);

        console.log('GET usuarios');
        res.status(200).jsonp(usuarios);
    });
};

/*UPDATE*/
//Actualizas datos personales
exports.updateUsuarioPersonal = function (req, res) {
    Usuario.findById(req.params.id, function (err,usuario) {

            //el DNI no se puede cambiar, dado que siempre tendrá el mismo
            usuario.nombre = req.body.nombre,
            usuario.apellido = req.body.apellido,
            usuario.alias = req.body.alias,
            usuario.email = req.body.email,
            usuario.password = req.body.password,
            usuario.telefono = req.body.telefono,
            usuario.codigoPostal = req.body.codigoPostal;

        usuario.save(function (err, usuario) {
            if(err)
                return res.status(500).send(err.message);
            res.status(200).jsonp(usuario);
        });
    });
};

//Actualizar datos relacionados con avisos, logros, etc
exports.updateUsuarioTecnico = function (req, res) {
    Usuario.findById(req.params.id, function (err, usuario) {


        usuario.save(function (err, usuario) {
            if(err)
                return res.status(500).send(err.message);
            res.status(200).jsonp(usuario);
        });
    });


};

/*DELETE*/
//Eliminar un usuario por su ID
exports.deleteUser = function (req, res) {

    Usuario.findById(req.params.id, function (err, usuario) {
        usuario.remove(function (err) {
            if(err)
                return res.status(500).send(err.message);
            res.status(200).send();
        });
    });
};


//Authenticate
exports.UserAuthentication = function (req, res) {
    User.authenticate(req.body.email, req.body.password, function (error, user) {
        if(error || !user){
            var error = new Error('Correo o contraseña incorrectos.');
            error.status = 401;
            return res.send(error.message);
        } else {
            return res.send('Autenticado correctamente');
        }

    });
};

//Genera una contraseña nueva
//la cifra y la guarda en la base de datos
//se le envia al usuario por correo electrónico
//el ya la modificará desde su perfil si quiere
//del cifrado se encarga /models/usuario  con la funcion de pre('save')
exports.changepassword = function (req, res) {
    var id;

    User.findOne({ email: req.body.email }).exec(function (err, user) {
        id = user._id;
        if(err){
            return callback(err)
        } else if (!user){
            var err = new Error('User not found.');
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
                return res.status(500).send(err.message);
            res.status(200).jsonp(user);
        });

        emailController.sendPassEmail(req.body.email, 'A partir de ahora su contraseña es: '+user.password+'. \n Puede cambiarla en cualquier momento desde su perfil. \n Atentamente, \n El equipo de FIXIT')

    });

};
