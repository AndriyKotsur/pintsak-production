const Pool = require('pg').Pool
const { database } = require('./config')

const pool = new Pool({
	user: database.userName,
	password: database.userPassword,
	host: database.host,
	port: database.port,
	database: database.name,
})

module.exports = pool
