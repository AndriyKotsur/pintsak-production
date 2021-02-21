const express = require('express')
const { uuid } = require('uuidv4')
const bcrypt = require('bcryptjs')
const router = express.Router()

const { uploadFile, removeFolder} = require('../../middleware/upload')
const { prepareToken } = require('../../middleware/token')
const auth = require('../../middleware/auth')
const pool = require('../../db')
const tileRouter = require('./tile')
const typeRouter = require('./type')

router.use('/tile', tileRouter)
router.use('/type', typeRouter)

// login admin
router.post('/', async (req,res) => {
	try {
		const { email, password } = req.body
		const admin = await pool.query(
			'SELECT * FROM admin WHERE email = $1',
			[email],
		)

		const isMatch = await bcrypt.compare(password, admin.rows[0].password)
		if (!isMatch) {
			res.status(400).json(
				{ message: 'Invalid credentials' },
			)
		} else {
			const token = prepareToken(
				{ id: admin.rows[0].uid },
				req.headers,
			)
			res.status(200).json(
				{ token },
			)
		}
	} catch (err) {
		console.error(err.message)
		res.status(401).json(
			{ message: 'Login error' },
		)
	}
})

// register admin
router.post('/register', async (req,res) => {
	try {
		const { email, password } = req.body
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)
		console.log(email, password)
		const newAdmin = await pool.query(
			'INSERT INTO admin (uid, email, password) VALUES ($1, $2, $3) RETURNING *',
			[uuid(), email, hash],
		)
		const token = prepareToken(
			{ id: newAdmin.rows[0].uid },
			req.headers,
		)
		res.status(201).json(
			{ token },
		)
	} catch (err) {
		console.error(err.message)
		res.status(400).json(
			{ message: 'Bad request' },
		)
	}
})

// check token
router.get('/check-token', auth, (req,res) => {
	try {
		res.status(200).json(
			{ id: req.admin.id },
		)
	} catch (err) {
		console.error(err.message)
		res.status(401).json(
			{ message: 'Token expired' },
		)
	}
})

// get all
router.get('/tiles', auth, async (req, res) => {
	try {
		const allTiles = await pool.query(
			'SELECT * FROM tile',
		)
		res.status(200).json(allTiles.rows)
	} catch (err) {
		console.error(err.message)
		res.status(404).json(
			{ message: err.message },
		)
	}
})

// change catalogue
router.patch('/catalogue', auth, async (req,res) => {
	try {
		removeFolder('./public/docs')
		uploadFile( req, res, async err => {
			if (err)
				throw err

			res.status(200).json(
				{ message: 'Changed' },
			)
		})
	} catch (err) {
		console.error(err.message)
		res.status(400).json(
			{ message: err.message },
		)
	}
})

module.exports = router
