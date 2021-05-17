const mongoose = require('mongoose')
const { mongoUri } = require('../../config')

mongoose.set('useUnifiedTopology', true)
mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('debug', true)

mongoose.connect(mongoUri)

mongoose.connection.on('connected', () => {
	console.log('⚡️[database]: connected')
})

mongoose.connection.on('disconnected', () => {
	console.log('⚠️[database]: disconnected')
})

mongoose.connection.on('error', err => {
	console.log('🔥[database]: error ' + err)
})
