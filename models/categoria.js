var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var categoriaSchema = new Schema({

    tipo: { type: String },
    subtipo: {type: String, unique: true },
    prioridad: { type: Number },
    icono: { type: String }, /*url de donde este guardada la imagen*/
    telefonoContacto: { type: Number },
    emailContacto: { type: String },
    personaContacto: { type: String },
    empresaContacto: { type: String },
    horarioContacto: { type: String }
});

module.exports = mongoose.model('Categoria', categoriaSchema);