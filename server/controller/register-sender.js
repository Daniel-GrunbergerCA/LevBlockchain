const express = require('express');
const router = express.Router();
const {sendEmail} = require('../core/email-sender/email-sender')


router.post('/email', (req, res) => {
    const {value} = req.body; 
    console.log(`${value} is the register payload`);
   
    my_text = `Hi Sir ${value}  you are Welcome !`;
    sendEmail("By Joss", my_text, 'jossleboss26@gmail.com');
    res.end()
}); 

module.exports = router;