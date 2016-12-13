
var express = require('express');
var multer = require('multer');
var fs = require('fs');

var upload = multer({ dest: 'public/uploads' });
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send("Use POST to upload a Swagger file")
});

router.post('/', upload.single('swaggerFile'), function(req, res) {
    if (!req.file) {
        res.status(400).send("No files uploaded");
        return;
    }

    var swaggerFile = req.file.path;
    var contentType = req.file.mimetype;
    if (contentType.includes("html")) {
        console.log("Uploading file as HTML " + JSON.stringify(req.file));

        // Add HTML extension to file
        fs.rename(swaggerFile, swaggerFile + ".html", function(err) {
            if (err) {
                res.status(500).send("Unable to rename file " + swaggerFile);
            }
        });

        // Redirect to uploaded file
        res.redirect('uploads/' + req.file.filename + ".html");
    }
    else if (contentType.includes("json")) {
        console.log("Uploading file as JSON " + JSON.stringify(req.file));
    }
    else if (contentType.includes("yaml")) {
        console.log("Uploading file as YAML " + JSON.stringify(req.file));
    }
    else {
        res.status(400).send("Invalid content type");
    }
});

module.exports = router;
