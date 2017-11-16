var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var usuarioSchema = new Schema({

    nombre: { type: String, required: true},
    apellidos: { type: String },
    alias: { type: String, required: true},
    dni: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String , required: true},
    telefono: { type: String, unique: true },
    codigoPostal: { type: String },
    puntos: { type: Number },
    participantes: { type: Number }, /*nº de personas que apoyan sus avisos*/
    logros: {
        tituloActivo: { type: String },
        coleccion: [ { type: mongoose.Schema.Types.ObjectId, ref:'Logro'} ] /*se añade al vector una vez tiene el logro, lo veo mas sencillo,
                                        no hace falta relacionarlo con la coleccion logro*/
    },
    avisos: { creados: [ {type: mongoose.Schema.Types.ObjectId, ref:'Aviso'}],
              apoyados: [{ type: mongoose.Schema.Types.ObjectId, ref:'Aviso'}]} /* creados[], apoyados[] */
});


//Authenticate against database
usuarioSchema.statics.authenticate = function (email, password, next) {
    User.findOne({ email: email }).exec(function (err, user) {
        if(err){
            return next(err)
        } else if (!user){
            var err = new Error('User not found.');
            err.status = 401;
            return next(err.message);
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if(result == true){
                console.log('La password es correcta');
                return next(null, user);
            } else {
                return next(err);
            }
        })
    });
};

//hashing a password before saving it to the database
usuarioSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if(err){
            return next(err);
        }
        user.password = hash;
        next();
    });
});

usuarioSchema.pre('findAndModify', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if(err){
      return next(err);
    }
    user.password = hash;
    next();
  });
});

var User = mongoose.model('Usuario', usuarioSchema);
module.exports = mongoose.model('Usuario', usuarioSchema);
