var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var avisoSchema = new Schema({

    fecha: { type: Date, default: Date.now},
    categoria: { type: mongoose.Schema.Types.ObjectId, ref:'Categoria' }, /*id de una categoria */
    imagen: { type: String }, /* url del sitio donde se ponga*/
   /* latitud y longitud...........CodPostal, Calle, Ciudad*/
    localizacion : { lon: {type: Number } , lat: {type: Number} }, /*buscar como se define bien*/
    datosUbicacion: {codPostal: {type: Number}, calle: {type:String}, ciudad:{type:String}},
    descripcion : { type: String },
    seguimiento : { type: String },
    autor : { type: mongoose.Schema.Types.ObjectId, ref:'Usuario' }, /* _id del autor*/
    apoyos : { type: Number }
});

module.exports = mongoose.model('Aviso', avisoSchema);
