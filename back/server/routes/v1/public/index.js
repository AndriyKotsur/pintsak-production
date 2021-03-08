const express = require('express')
const router = express.Router()
const fs = require('fs')

const { Type, Tile } = require('../../../models')
const { sendMail } = require('../../../services/sendgrid')

// get tile
router.get('/tile/:id', async (req, res) => {
	try {
		const { id } = req.params
		const tile = await Tile.findById(id).populate('type')

		res.status(200).json({ success: true, data: tile })
	} catch (err) {
		res.status(404).json({ success: false, message: err.message })
	}
})

// get types
router.get('/types', async (_, res) => {
	try {
		const types = await Type.find()

		res.status(200).json({ success: true, data: types })
	} catch (err) {
		res.status(404).json({ success: false, message: 'Not found' })
	}
})

// get tiles
router.get('/tiles', async (_, res) => {
	try {
		const tiles = await Tile.find()

		res.status(200).json({ success: true, data: tiles })
	} catch (err) {
		res.status(400).json({ success: false, message: err.message })
	}
})

// get tiles by sorting
router.get('/:type', async (req, res) => {
	try {
		const { type } = req.params
		const page = req.query.page || 1
		const limit = 9
		// const tileType = await pool.query(
		// 	'SELECT id FROM type WHERE url = $1',
		// 	[type],
		// )
		// if (!req.query.sort && !req.query.order) {
		// 	const tiles = await Tile.find({ type }).populate('type')
		// 	const tilesOfType = await pool.query(
		// 		`SELECT title, id, width, height, thickness, images, color_price FROM tile WHERE type_id = $1 OFFSET ${(limit * page) - limit} LIMIT ${limit}`,
		// 		[tileType.rows[0].id],
		// 	)
		// 	res.status(200).json(tilesOfType.rows)
		// } else {
		// 	let sort
		// 	if (req.query.sort === 'width')
		// 		sort = req.query.sort
		// 	else
		// 		sort = "color_price->>'grey'"
		// 	const tilesOfType = await pool.query(
		// 		`SELECT title, id, width, height, thickness, images, color_price FROM tile WHERE type_id = $1 ORDER BY ${sort} ${req.query.order} OFFSET ${(limit * page) - limit} LIMIT ${limit}`,
		// 		[tileType.rows[0].id],
		// 	)
		// 	res.status(200).json(tilesOfType.rows)
		// }
		res.status(200)
	} catch (err) {
		res.status(404).json({ success: false, message: 'Not found' })
	}
})

// download catalogue
router.get('/download-catalogue', (_, res) => {
	try {
		const file = fs.readdirSync('./public/docs', function(error,files) {
			if(error) throw error
			return files
		})

		res.status(200).download(`public/docs/${file[0]}`)
	} catch (err) {
		res.status(404).json({ success: false, message: err.message })
	}
})

// order request
router.post('/order-request', async (req, res) => {
	try {
		const { name, phone, comment, order } = req.body
		const content =
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
			</table>`

		const response = await sendMail({ fromEmail: 'pintsak-tiles.com.ua', subject: 'New order request!', content })
		if (response[0].statusCode !== 202) return res.status(400).json({ success: false, message: 'Email error' })

		res.status(201).json({ success: true, message: 'Successfully sended' })
	} catch (err) {
		res.status(400).json({ success: false, message: err.message })
	}
})

module.exports = router
