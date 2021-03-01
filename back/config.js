require('dotenv').config()

const port = process.env.PORT || 5000

const jwtInfo = {
	expiresIn: process.env.TOKEN_EXPIRES,
	secret: process.env.TOKEN_KEY,
}

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/pintsak_tiles'

const mailInfo = {
	secretKey: process.env.SENDGRID_KEY,
	defaultEmail: process.env.SENDGRID_EMAIL,
}

module.exports = { port, jwtInfo, mongoUri, mailInfo }
