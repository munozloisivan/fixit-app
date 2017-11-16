var express = require('express'),
  router = express.Router();
var emailCtrl = require('../controllers/mail');

/*POST*/
//enviar mail
router.post('/email', emailCtrl.sendEmail);

module.exports = router;
