// Variables
var path = require('path');
var express = require('express');
var app = require('express')();
var cors = require('cors')
var jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

//Configure port
var port=8080;

//App directories
var PROJECT_DIR = path.normalize(__dirname);

app.use('/',express.static(path.join(PROJECT_DIR, '')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

app.post('/jwt_service', (req, res) => {
    jwt_data = {
        "sub": req.body.identity,
        "iss": req.body.clientId,
        "algorithm": "HS256"
    }

    jwt.sign(jwt_data, req.body.clientSecret, { algorithm: 'HS256' }, function (err, token) {  // clientSecret
        console.log(token);
        res.send({
            "jwt": token
        })
    });
})

app.listen(port, function(){
    console.log('Sample Application runnning at http://localhost:'+port+'/UI');
});
