var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'recruitedapp@gmail.com',
        pass: 'octavio.gtz19'
    }
});


function doMail(mail) {
    console.log("Entro en domail");
    var mailOptions = {
        from: 'recruited',
        to: mail,
        subject: 'Un entrenador te ha añadido a su lista de interes',
        text: 'Porfavor ingresa en tu cuenta para averiguar de quien se trata.'
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

module.exports = doMail