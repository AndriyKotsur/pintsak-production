require('dotenv').config()

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

}

module.exports = { jwtInfo, database }
