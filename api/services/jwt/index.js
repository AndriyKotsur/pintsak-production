const jwt = require('jsonwebtoken')
const { jwtInfo } = require('../../config')

const prepareSecret = headers => {
	return jwtInfo.secret + headers['user-agent'] + headers['accept-language']
}

const parseBearer = (token, headers) =>  {
	return jwt.verify(token, prepareSecret(headers))
}

const prepareToken = (data, headers) => {
	return jwt.sign(data, prepareSecret(headers), { expiresIn: jwtInfo.expiresIn })
}

module.exports = { parseBearer, prepareToken }
