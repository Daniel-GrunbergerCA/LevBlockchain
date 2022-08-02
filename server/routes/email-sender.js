const express = require('express');
const router = express.Router();
const {sendEmail} = require('../core/email-sender/email-sender')
const {generatePassword} =require('../core/email-sender/generator_pwd')
router.post('/reset', (req, res) => {
    const {email} = req.body; 
    console.log(`${email} is email to send`);
    pwd_to_send = generatePassword();
    my_text = 'Hi Sir \n your new password is  : '+'<b>' + pwd_to_send +'</b>';
    sendEmail("By Joss", my_text, email);
    // changer le pwd de ce profile dans la database aussi en plus d'envoyer le mail 
    
    res.end()
}); // POST email/reset

module.exports = router;