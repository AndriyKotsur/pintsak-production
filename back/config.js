require('dotenv').config()

const port = process.env.PORT || 5000

const jwtInfo = {
	expiresIn: process.env.TOKEN_EXPIRES,
	secret: process.env.TOKEN_KEY,
}

const database = {
	userName: process.env.DB_USER,
	userPassword: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	name: process.env.DB_NAME,
}

const mailInfo = {
	secretKey: process.env.SENDGRID_KEY,
	defaultEmail: process.env.SENDGRID_EMAIL,
}

module.exports = { port, jwtInfo, database, mailInfo }
