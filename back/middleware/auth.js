const express = require('express')
const { parseBearer } = require('./token')
const pool = require('../db')

const router = express.Router()

module.exports = router.use( async (req, res, next) => {
	try {
		console.log(req.headers)
		const payload = parseBearer(req.headers.authorization, req.headers)

		const admin = await pool.query(
			'SELECT * FROM admin WHERE uid = $1',
			[payload.uid],
		)

		if (!admin) throw new Error('Admin does not exist')
		req.admin = admin

		return next()
	} catch (err) {
		next(err)
	}
})
