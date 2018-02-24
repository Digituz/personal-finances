const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const morgan = require('morgan');

const app = express();
app.use(morgan('tiny'));
app.use(bodyParser.json());

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://digituz-corp.auth0.com/.well-known/jwks.json"
  }),
  audience: 'https://personal-finances.digituz.com.br',
  issuer: "https://digituz-corp.auth0.com/",
  algorithms: ['RS256']
});

app.get('/public', (req, res) => {
  res.send({message: 'public resource'});
});

app.get('/authorized', jwtCheck, (req, res) => {
  res.send({message: 'private resource'});
});

app.listen(process.env.PORT || 3000);
