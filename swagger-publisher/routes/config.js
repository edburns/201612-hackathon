
var express = require('express');
var router = express.Router();

// Read config file
var fs = require('fs')
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

router.get('/', function(req, res, next) {
    res.send(config)
});

module.exports = router;
