const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const helmet = require('helmet')
const path = require('path')

const { port } = require('./config')
require('./services/mongoose')

const app = express()

// middlewares
app.use(cors())
app.use(helmet.contentSecurityPolicy({
	useDefaults: true,
	directives: {
		'script-src': ["'self'", "'unsafe-inline'"],
		'img-src': ["'self'", 'https://pintsak-production.s3.eu-central-1.amazonaws.com', 'https://pintsak-production.herokuapp.com'],
	},
}))
app.use(helmet.dnsPrefetchControl())
app.use(helmet.expectCt())
app.use(helmet.frameguard())
app.use(helmet.hidePoweredBy())
app.use(helmet.hsts())
app.use(helmet.ieNoOpen())
app.use(helmet.noSniff())
app.use(helmet.permittedCrossDomainPolicies())
app.use(helmet.referrerPolicy())
app.use(helmet.xssFilter())
app.use(logger('dev'))
app.use(express.json())

// routes
app.use('/v1', require('./routes/v1'))

if (process.env.NODE_ENV !== 'development') {
	app.use(express.static(path.join(__dirname, '/client/build'), { index: false }))

	app.get('*', (_, res) => {
		res.sendFile(path.join(__dirname + '/client/build/index.html'))
	})
}

app.listen(port, () => {
	console.log(`⚡️[server] started on port ${port}`)
})
