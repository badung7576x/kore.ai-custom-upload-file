// Variables
var path = require('path');
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var cors = require('cors')
app.use(cors())
const uploadFile = require("./upload");

//Configure port
var port=8080;

//App directories
var PROJECT_DIR = path.normalize(__dirname);
global.__basedir = PROJECT_DIR;

app.use('/',express.static(path.join(PROJECT_DIR, '')));

app.post('/jwt_service', (req, res) => {
    var jwt = require('jsonwebtoken');

    jwt_data = {
        "sub": "random-uuid",                                   // botOptions.userIdentity
        "iss": "cs-60024471-cf9b-50e3-a39b-15a48b8638ac",       // clientId
        "algorithm": "HS256"
    }

    jwt.sign(jwt_data, "03vzosPVmJWoY5ntxeLLSNyPgjMCQeODWLz6tS7xp20=", { algorithm: 'HS256' }, function (err, token) {  // clientSecret
        console.log(token);
        res.send({
            "jwt": token
        })
    });
})

app.post("/upload", async(req, res) => {
    try {
        await uploadFile(req, res);
    
        if (req.file == undefined) {
          return res.status(400).send({ message: "Please upload a file!" });
        }
    
        res.status(200).send({
          message: "Uploaded the file successfully: " + req.file.originalname,
        });
    } catch (err) {
        console.log(err);

        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
            message: "File size cannot be larger than 2MB!",
            });
        }

        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
});

app.get("/download/:name", (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/upload/";

    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
        res.status(500).send({
            message: "Could not download the file. " + err,
        });
        }
    });
});

http.listen(port, function(){
    console.log('Sample Application runnning at http://localhost:'+port+'/UI');
});
