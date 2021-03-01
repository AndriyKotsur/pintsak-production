const express = require('express')
const { parseBearer } = require('../services/jwt')
const { Admin } = require('../models')

const router = express.Router()

module.exports = router.use( async (req, _, next) => {
	try {
		const token = req.headers.authorization.slice(7, req.headers.authorization.length)
		const payload = parseBearer(token, req.headers)

		const admin = await Admin.findById(payload.id)
		if (!admin) throw new Error('Admin does not exist')

		req.admin = admin

		return next()
	} catch (err) {
		next(err)
	}
})
