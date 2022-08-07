const nodeMailer = require('nodemailer');


function sendEmail(title, msg, toMail = process.env.AWS_MAIL_TO, fromName = 'Joss and Daniel Project 5782', fromMail = process.env.AWS_MAIL_FROM) {
    //console.log('\n\n'+msg+'\n');
    //return true;
        try {
        let mailOptions = {
            from: '"' + fromName + '" <joss@148security.com>', // sender address
            to: toMail, // list of receivers
            subject: title,
            text: msg,
            html: msg,
            attachments: [
                {
                  filename: 'tosend.png',
                  path: __dirname + '/tosend.png',
                  cid: 'uniq-tosend.png' 
                }
                
              ]
        };
        nodeMailer.createTransport({
            host: 'email-smtp.eu-west-1.amazonaws.com',
            port: 465,
            secure: true, //true for 465 port, false for other ports
            auth: {
                user: 'confidential:-)',
                pass: 'confidential:-)'
            }
        }).sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                //res.status(400).send({success: false})
            } else
            console.log(title);
        });
    } catch (e) {
        console.error(e);
    }
    
        return true;
}

module.exports = {sendEmail};