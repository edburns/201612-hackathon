
var express = require('express');
var multer = require('multer');
var Client = require('node-rest-client').Client;
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

var upload = multer({ dest: 'public/uploads' });
var router = express.Router();
var client = new Client();

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
        res.redirect("uploads/" + req.file.filename + ".html");
    }
    else if (contentType.includes("json")) {
        console.log("Uploading file as JSON " + JSON.stringify(req.file));

        var args = {
            data: fs.readFileSync(swaggerFile).toString(),
            headers: { "Content-Type" : "application/json" }
        };
        client.post(config.json2html.url, args, function (data, response) {
            console.log("json2html response from POST received");
            fs.writeFile("public/uploads/" + req.file.filename + ".html", data, function (err) {
                console.log("Converted file written to disk");
                if (err) {
                    res.status(500).send("Unable to convert file");
                }
                res.redirect("uploads/" + req.file.filename + ".html");
            });
        });
    }
    else if (contentType.includes("yaml") || req.file.originalname.includes("yaml")) {
        console.log("Uploading file as YAML " + JSON.stringify(req.file));

        var args = {
            data: fs.readFileSync(swaggerFile).toString(),
            headers: { "Content-Type" : "text/yaml" }
        };
        client.post(config.yaml2json.url, args, function (data, response) {
            console.log("yaml2json response from POST received");
            
            var args = {
                data: data,
                headers: { "Content-Type" : "application/json" }
            }
            client.post(config.json2html.url, args, function (data, response) {
                console.log("json2html response from POST received");
                fs.writeFile("public/uploads/" + req.file.filename + ".html", data, function (err) {
                    console.log("Converted file written to disk");
                    if (err) {
                        res.status(500).send("Unable to convert file");
                    }
                    res.redirect("uploads/" + req.file.filename + ".html");
                });
            });
        });
    }
    else {
        res.status(400).send("Invalid content type: " + req.file.mimetype);
    }
});

module.exports = router;
