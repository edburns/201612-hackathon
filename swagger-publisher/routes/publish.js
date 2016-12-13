
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send("Use POST to upload a Swagger file")
});

router.post('/', function(req, res) {
    var contentType = req.headers['content-type'];
    if (contentType.includes("html")) {
        res.send("Attempting to upload Swagger file in HTML")
    } else if (contentType.includes("json")) {
        res.send("Attempting to upload Swagger file in JSON")
    } else if (contentType.includes("yaml")) {
        res.send("Attempting to upload Swagger file in YAML")
    } else {
        // Error
    }
});

module.exports = router;
