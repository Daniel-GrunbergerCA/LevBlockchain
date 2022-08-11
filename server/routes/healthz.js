var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
    res.send('server up and running')
});



module.exports = router;