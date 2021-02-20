require('dotenv').config()
const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const helmet = require('helmet')

const { port } = require('./config')

const app = express()

// middlewares
app.use(cors())
app.use(helmet())
app.use(logger('dev'))
app.use(express.json())
app.use('/public', express.static(__dirname + '/public'))

// routes
app.use('/', require('./routes/public'))
app.use('/admin', require('./routes/admin'))

app.listen(port, () => {
	console.log(`Server started on port ${port}`)
})
