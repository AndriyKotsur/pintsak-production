require('dotenv').config()
const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const fs = require('fs')
const pool = require('../db')

// get tile types
router.get('/', async (req, res) => {
	try {
		const tileTypes = await pool.query(
			'SELECT * FROM type',
		)
		res.status(200).json(tileTypes.rows)
	} catch (err) {
		console.error(err.message)
		res.status(404).json(
			{ message: 'Not found' },
		)
	}
})

// get tiles of type & filter
router.get('/tiles/types/:type', async (req, res) => {
	try {
		const { type } = req.params
		const page = req.query.page || 1
		const limit = 9
		const tileType = await pool.query(
			'SELECT id FROM type WHERE url = $1',
			[type],
		)
		if (!req.query.sort && !req.query.order) {
			const tilesOfType = await pool.query(
				`SELECT title, id, width, height, thickness, images, color_price FROM tile WHERE type_id = $1 OFFSET ${(limit * page) - limit} LIMIT ${limit}`,
				[tileType.rows[0].id],
			)
			res.status(200).json(tilesOfType.rows)
		} else {
			let sort
			if (req.query.sort === 'width')
				sort = req.query.sort
			else
				sort = "color_price->>'grey'"
			const tilesOfType = await pool.query(
				`SELECT title, id, width, height, thickness, images, color_price FROM tile WHERE type_id = $1 ORDER BY ${sort} ${req.query.order} OFFSET ${(limit * page) - limit} LIMIT ${limit}`,
				[tileType.rows[0].id],
			)
			res.status(200).json(tilesOfType.rows)
		}
	} catch (err) {
		console.error(err.message)
		res.status(404).json(
			{ message: 'Not found' },
		)
	}
})

// get one tile
router.get('/tile/:id', async (req,res) => {
	try {
		const { id } = req.params
		const tile = await pool.query(
			'SELECT * FROM tile WHERE id = $1',
			[id],
		)
		res.status(200).json(tile.rows[0])
	} catch (err) {
		console.error(err.message)
		res.status(404).json(
			{ message: 'Not found' },
		)
	}
})

// download catalogue
router.get('/download-catalogue', (req,res) => {
	try {
		const file = fs.readdirSync('./public/docs', function(error,files) {
			if(error) throw error
			return files
		})
		res.status(200).download(`public/docs/${file[0]}`)
	} catch (err) {
		console.error(err.message)
		res.status(404).json(
			{ message: 'Not found' },
		)
	}
})

// order request
router.post('/order-request', async (req,res) => {
	try {
		const { name, phone, comment, order } = req.body
		const transporter = nodemailer.createTransport({
			pool: true,
			service: 'gmail',
			host: process.env.GMAIL_HOST,
			port: process.env.GMAIL_PORT,
			secure: true,
			auth: {
				user: process.env.GMAIL_USER,
				pass: process.env.GMAIL_PASS,
			},
		})
		transporter.sendMail ({
			// from: 'noreply@pintsakprod.com',
			to: 'pintsak@gmail.com',
			subject: 'New order request!',
			html:
        `<table>
          <tbody>
            <tr>Customer: ${name}</tr>
            </br>
            <tr>Phone: ${phone}</tr>
            </br>
            <tr>Comment: ${comment}</tr>
            </br>
            <tr>Order: ${order.title}, ${order.count}, ${order.color}, ${order.totalPrice}</tr>
          </tbody>
        </table>`,
		},
		(err, info) => {
			if(err)
				console.error(err.message)
			else
				console.log('Email sent: ' + info.response)
		})
	} catch (err) {
		console.error(err.message)
		res.status(400).json(
			{ message: 'Bad request' },
		)
	}
})

module.exports = router
