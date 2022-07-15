var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    // res.render('index.jade', { title: 'Express' });
    res.json({"users": ["one", "two", "three"]});
});


module.exports = router;