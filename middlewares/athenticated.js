'use strict';

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'dani_eselcerebr0_y_ensuc4s4nolosaben';

exports.ensureAuth = function (req, res, next) {
  if(!req.headers.authorization){
    return res.status(403).send({m: "La petición requiere autenticación"});
  }

  var token = req.headers.authorization.replace(/['"]+/g,'');

  try{
    var payload = jwt.decode(token, secret);

    if(payload.exp > moment().unix){
      return res.status(401).send({m: "El token ha expirado"})
    }
  }catch (ex){
    return res.status(404).send({m: "El token no es válido"})
  }
  req.user = payload;
  console.log(req.user);

  next();
};
