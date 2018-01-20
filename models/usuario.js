var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var usuarioSchema = new Schema({

    nombre: { type: String},
    apellidos: { type: String },
    alias: { type: String},
    dni: { type: String },
    email: { type: String, required: true, trim: true},
    password: { type: String , required: true},
    telefono: { type: String},
    codigoPostal: { type: String },
    imagen: {type: String, default: 'user.png'},
    puntos: { type: Number },
    participantes: { type: Number }, /*nº de personas que apoyan sus avisos*/
    // token_temporal: { type: String},
    // token_caducidad: { type: Date}, //si peta poner string, creamos los dos campos para resetear password
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
