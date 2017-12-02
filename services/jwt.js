'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'dani_eselcerebr0_y_ensuc4s4nolosaben';

exports.createTokenUser = function (user) {
  var payload = {
    sub: user._id,
    name: user.name,
    email: user.email,
    dni: user.dni,
    role: "USER",
    iat: moment().unix(),
    exp: moment().add(1, 'days'.unix)
  }
  return jwt.encode(payload, secret);
}

exports.createTokenGestor = function (gestor) {
  var payload = {
    sub: gestor._id,
    name: gestor.name,
    email: gestor.email,
    dni: gestor.dni,
    role: "GESTOR",
    iat: moment().unix(),
    exp: moment().add(1, 'days'.unix)
  }
  return jwt.encode(payload, secret);
}
