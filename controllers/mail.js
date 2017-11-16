var nodemailer = require('nodemailer');

//ENVIO DE CORREO DESDE LA PESTAÑA DE CONTACTO DE LA WEB / PHONE
//Pendiente de modificar los parametros mailOptions para que coja los que sean pertinentes

exports.sendEmail = function(req, res){
// Definimos el transporter
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secureConnection: true,
    port: 465,
    auth: {
      user: 'eetakemongocbl@gmail.com',
      pass: 'passwordcbl'
    }
  });

// Definimos el email
  var mailOptions = {
    from: 'Fixit <eetakemongocbl@gmail.com>',
    to: 'munozloisivan@gmail.com',
    subject: 'Nodemailer test',
    text: 'Contenido del email de prueba'
  };
// Enviamos el email
  transporter.sendMail(mailOptions, function(error, res){
    if (error){
      console.log(error);
      //res.send("email not send due to:"+error);
    } else {
      console.log("Email sent");
      //res.send("email send ok");
    }
  });
};


//ENVIO DE LA CONTRASEÑA REESTABLECIDA
exports.sendPassEmail = function(to, text){
// Definimos el transporter
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secureConnection: false,
    port: 465,
    auth: {
      user: 'eetakemongocbl@gmail.com',
      pass: 'passwordcbl'
    }
  });
// Definimos el email
  var mailOptions = {
    from: 'Fixit <eetakemongocbl@gmail.com>',
    to: to,
    subject: 'Contraseña reestablecida',
    text: text
  };
// Enviamos el email
  transporter.sendMail(mailOptions, function(error, res){
    if (error){
      console.log(error);
      res.send("email not send due to:"+error);
    } else {
      console.log("Email sent");
      res.send("email send ok");
    }
  });
};
