const express = require('express')
const router = express.Router()
const fs = require('fs')

const { Type, Tile } = require('../../../models')
const { sendMail } = require('../../../services/sendgrid')

// get tiles by sorting
router.get('/tiles', async (req, res) => {
	try {
		const { page, sort, order, typeId } = req.query
		const _page = page ? page - 1 : 0
		const limit = 9

		const findBy = typeId ? { type: typeId } : { }
		const sortBy = sort ? { [sort]: order } : { }

		const tiles = await Tile
			.find(findBy)
			.sort(sortBy)
			.skip(_page * limit)
			.limit(limit)
			.populate('type')

		res.status(200).json({ success: true, data: tiles })
	} catch (err) {
		res.status(404).json({ success: false, message: err.message })
	}
})

// get tile
router.get('/tile/:url', async (req, res) => {
	try {
		const { url } = req.params
		const tile = await Tile.findOne({ url }).populate('type')

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
