const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const helmet = require('helmet')

const { port } = require('./config')
require('./server/services/mongoose')

const app = express()

// middlewares
app.use(cors())
app.use(helmet())
app.use(logger('dev'))
app.use(express.json())
app.use('/public', express.static(__dirname + '/public'))

// routes
app.use('/v1', require('./server/routes/v1'))

app.listen(port, () => {
	console.log(`⚡️[server] started on port ${port}`)
})
