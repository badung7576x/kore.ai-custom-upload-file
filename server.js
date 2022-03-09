// Variables
var path = require('path');
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var cors = require('cors')
app.use(cors())

//Configure port
var port=8080;

//App directories
var PROJECT_DIR = path.normalize(__dirname);

app.use('/',express.static(path.join(PROJECT_DIR, '')));

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

http.listen(port, function(){
    console.log('Sample Application runnning at http://localhost:'+port+'/UI');
});
