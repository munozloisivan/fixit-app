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
    telefono: { type: Number}
});


//Authenticate against database
gestorSchema.statics.authenticate = function (email, password, callback) {
    Gestor.findOne({ email: email }).exec(function (err, gestor) {
        if(err){
            return callback(err)
        } else if (!gestor){
            var err = new Error('Gestor not found.');
            err.status = 401;
            return callback(err.message);
        }
        bcrypt.compare(password, gestor.password, function (err, result) {
            if(result == true){
                console.log('La password es correcta');
                return callback(null, gestor);
            } else {
                return callback();
            }
        })
    });
};

//hashing a password before saving it to the database
gestorSchema.pre('save', function (next) {
    var gestor = this;
    bcrypt.hash(gestor.password, 10, function (err, hash) {
        if(err){
            return next(err);
        }
        gestor.password = hash;
        next();
    });
});

var Gestor = mongoose.model('Gestor', gestorSchema);
module.exports = mongoose.model('Gestor', gestorSchema);