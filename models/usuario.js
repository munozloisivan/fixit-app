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

module.exports = mongoose.model('Usuario', usuarioSchema);
