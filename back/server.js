require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('morgan')
const helmet = require('helmet')

// middlewares
app.use(cors())
app.use(helmet())
app.use(logger('dev'))
app.use(express.json())
app.use('/public', express.static(__dirname + '/public'))

// routes
app.use('/', require('./routes/public'))
app.use('/admin', require('./routes/admin'))

app.listen(process.env.PORT || 5000, () => {
	console.log(`Server started on port ${process.env.PORT || 5000}`)
})
