var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var bcrypt = require('bcrypt');

var gestorSchema = new Schema({

    nombre: { type: String, required: true},
    apellidos: { type: String, required: true},
    dni: { type: String, unique: true, required: true},
    email: { type: String, unique: true, required: true, trim: true},
    password: { type: String, required: true},
    delegacion: { type: String},
    departamento: { type: String},
    telefono: { type: Number, unique: true}
});

module.exports = mongoose.model('Gestor', gestorSchema);
