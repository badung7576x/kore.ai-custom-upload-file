var app = require('express')();

app.post('/jwt_service', (req, res) => {
  var jwt = require('jsonwebtoken');

  jwt_data = {
      "sub": req.body.identity,
      "iss": req.body.clientId,
      "algorithm": "HS256"
  }

  jwt.sign(jwt_data, process.env.CLIENT_SECRET, { algorithm: 'HS256' }, function (err, token) {
      console.log(token);
      res.send({
          "jwt": token
      })
  });
})