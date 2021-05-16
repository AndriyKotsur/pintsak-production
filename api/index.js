const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const helmet = require('helmet')
const path = require('path')

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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (__, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

app.listen(port, () => {
	console.log(`⚡️[server] started on port ${port}`)
})
