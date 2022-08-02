const express = require('express');
const router = express.Router();
const {sendEmail} = require('../core/email-sender/email-sender')



// arranger un peu mieux le mail de bienvenue ...
//nodemon est de folie !
//postman aussi !!
router.post('/email', (req, res) => {
    const {value} = req.body; 
    console.log(`${value} is the register payload`);
   
    my_text = `Hi Sir ${value}  you are Welcome !`;
    sendEmail("By Joss", my_text, 'jossleboss26@gmail.com');
    res.end()
}); // POST email/reset

module.exports = router;