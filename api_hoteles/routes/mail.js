var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var config = require('../config/properties.js');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'ggomez@sursoftware.com.ar',
        pass: 'cv2010fc'
    }
});

var mailOptions = {
    from: 'Germancho <ggomez@sursoftware.com.ar>', // sender address
};

router.get('/mails/:code', function(req, res){
	var code = req.params.code;
	mailOptions.to =  req.query.email; // list of receivers
	console.log(req.query);
	switch(code){
		case 'invite':
			mailOptions.subject = 'Invitación a registrase', // Subject line
    		mailOptions.html = '<b>Completa tus datos en localhost:3000. User: '+req.query.user+', Pass: '+req.query.pass+'</b>' // html body
			break;
		case 'recovery':
			mailOptions.subject = 'Recuperación de contraseña', // Subject line
    		mailOptions.html = '<b>Tu contraseña es: '+req.query.pass+'</b>' // html body
		break;
		case 'change':
			mailOptions.subject = 'Cambio de contraseña', // Subject line
    		mailOptions.html = '<b>Tu contraseña se cambio con exito</b>' // html body
		break;
	};
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        res.statusCode = config.INTERNAL_SERVER_ERROR;
			return res.send(error);
	    } else {
	    	return res.json({'Message sent: ': info.response});
	    }
	});
})

module.exports = router;