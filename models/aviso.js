var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var avisoSchema = new Schema({

    fecha: { type: Date, default: Date.now},
    categoria: { type: mongoose.Schema.Types.ObjectId, ref:'Categoria' }, /*id de una categoria */
    imagen: { type: String , default: 'aviso.png'}, /* url del sitio donde se ponga*/
   /* latitud y longitud...........CodPostal, Calle, Ciudad*/
    localizacion : { lon: {type: Number } , lat: {type: Number} }, /*buscar como se define bien*/
    datosUbicacion: {codPostal: {type: String}, ciudad:{type:String}},
    descripcion : { type: String },
    seguimiento : { type: String, default: "Notificado" },
    autor : { type: mongoose.Schema.Types.ObjectId, ref:'Usuario' }, /* _id del autor*/
    apoyos : { type: Number, default: 0 }
});
// export
module.exports = mongoose.model('Aviso', avisoSchema);
