const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()

const { uploadFile, removeFolder } = require('../../../middlewares/upload')
const auth = require('../../../middlewares/auth')
const { prepareToken } = require('../../../services/jwt')
const { Admin } = require('../../../models')

const tileRouter = require('./tile')
const typeRouter = require('./type')

router.use('/tile', tileRouter)
router.use('/type', typeRouter)

// register admin
router.post('/register', async (req, res) => {
	try {
		const { email, password } = req.body

		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)

		const newAdmin = await Admin.create({
			email,
			password: hash,
		})

		const token = prepareToken({ id: newAdmin._id }, req.headers)

		res.status(201).json({ success: true, token })
	} catch (err) {
		res.status(400).json({ success: false, message: err.message })
	}
})

// login admin
router.post('/', async (req, res) => {
	try {
		const { email, password } = req.body

		const admin = await Admin.findOne({ email })
		if (!admin) return res.status(400).json({ success: false, message: 'Admin does not exist' })

		const isMatch = await bcrypt.compare(password, admin.password)
		if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' })

		const token = prepareToken({ id: admin._id }, req.headers)

		res.status(200).json({ success: true, token })
	} catch (err) {
		res.status(401).json({ success: false, message: err.message })
	}
})

// change catalogue
router.patch('/catalogue', auth, async (req, res) => {
	try {
		removeFolder('./public/docs')
		uploadFile(req, res, async err => {
			if (err)
				throw err

			res.status(200).json({ success: true, message: 'Successfully changed' })
		})
	} catch (err) {
		res.status(400).json({ success: false, message: err.message })
	}
})

module.exports = router
