const jwt = require('jsonwebtoken')
const { jwtInfo } = require('../../../config')

function parseBearer(token, headers) {
	return jwt.verify(token, prepareSecret(headers))
}

function prepareToken(data, headers) {
	return jwt.sign(data, prepareSecret(headers), { expiresIn: jwtInfo.expiresIn })
}

function prepareSecret(headers) {
	return jwtInfo.secret + headers['user-agent'] + headers['accept-language']
}

module.exports = { parseBearer, prepareToken }
