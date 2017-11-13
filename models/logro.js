var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var logroSchema = new Schema({

    nombre: { type: String },
    descripcion: { type: String },
    puntos: { type: Number },
    titulo: { type: String }
});

module.exports = mongoose.model('Logro', logroSchema);