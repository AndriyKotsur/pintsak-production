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

const awsInfo = {
	bucket: process.env.AWS_BUCKET_NAME,
	region: process.env.AWS_REGION,
	accessKey: process.env.AWS_ACCESS_KEY,
	secretKey: process.env.AWS_SECRET_KEY,
}

const appUrl = process.env.APP_URL || 'http://localhost:3000/'

module.exports = { port, jwtInfo, mongoUri, mailInfo, awsInfo, appUrl }
