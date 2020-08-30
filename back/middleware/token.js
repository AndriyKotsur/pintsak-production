require('dotenv').config();
const jwt = require('jsonwebtoken');

function parseBearer(bearer, headers) {
  if (bearer.startsWith('Bearer ')) {
    token = bearer.slice(7, bearer.length);
  } else {
    token = bearer;
  }
  return decoded = jwt.verify(token, prepareSecret(headers));
}

function prepareToken(data, headers) {
  return jwt.sign(data, prepareSecret(headers), { expiresIn: process.env.TOKEN_EXPIRES });
}

function prepareSecret(headers) {
  return process.env.TOKEN_KEY + headers['user-agent'] + headers['accept-language'];
}

module.exports = { parseBearer, prepareToken };