const nodeMailer = require('nodemailer');


const sendResetEmail =  async (req, res) => {
    const email = req.body; 
    pwd_to_send = generatePassword();
    my_text = 'Hi Sir \n your new password is  : '+'<b>' + pwd_to_send +'</b>';
    sendEmail("By Joss", my_text, email);
     
    res.end()
};

function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
};


function sendEmail(title, msg, toMail = process.env.AWS_MAIL_TO, fromName = 'Joss and Daniel Project 5782', fromMail = process.env.AWS_MAIL_FROM) {
        try {
        let mailOptions = {
            from: '"' + fromName + '" <joss@148security.com>',
            to: toMail,
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
            secure: true, 
            auth: {
                user: 'confidential:-)',
                pass: 'confidential:-)'
            }
        }).sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } 
        });
    } catch (e) {
        console.error(e);
    }
    
        return true;
}


module.exports = {
    sendResetEmail
};