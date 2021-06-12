const express = require('express')
const router = express.Router()
const pdf = require('html-pdf')

const {
	Type,
	Tile,
	Customer
} = require('../../../models')
const {
	sendMail
} = require('../../../services/sendgrid')
const catalogue = require('../../../services/pdf/index')

// get tile
router.get('/tile/:url', async (req, res) => {
	try {
		const {
			url
		} = req.params
		const tile = await Tile.findOne({
			url
		}).populate('type')

		const tiles = await Tile.find({
			url: {
				$ne: tile.url
			},
			type: tile.type
		}).limit(9).populate('type')

		res.status(200).json({
			success: true,
			data: {
				tile,
				tiles
			}
		})
	} catch (err) {
		res.status(404).json({
			success: false,
			message: err.message
		})
	}
})

// get types
router.get('/types', async (_, res) => {
	try {
		const types = await Type.find()

		res.status(200).json({
			success: true,
			data: types
		})
	} catch (err) {
		res.status(404).json({
			success: false,
			message: err.message
		})
	}
})

// get tiles by sorting
router.get('/tiles', async (req, res) => {
	try {
		const {
			page,
			type,
			sort,
			order
		} = req.query
		const _page = page ? page - 1 : 0
		const limit = 9

		const findBy = type ? {
			'type.url': type
		} : {}
		const sortBy = sort ? {
			[sort]: Number(order)
		} : {
			createdAt: -1
		}

		const tiles = await Tile
			.aggregate([{
					$lookup: {
						from: 'types',
						localField: 'type',
						foreignField: '_id',
						as: 'type',
					},
				},
				{
					$project: {
						_id: 1,
						title: 1,
						type: {
							'$arrayElemAt': ['$type', 0]
						},
						url: 1,
						is_popular: 1,
						is_available: 1,
						images: 1,
						prices: 1,
						sizes: 1,
					},
				},
				{
					$match: findBy,
				},
				{
					$sort: sortBy,
				},
				{
					$skip: _page * limit,
				},
				{
					$limit: limit,
				},
			])

		const filterBy = type && tiles.length > 0 ? {
			type: tiles[0].type._id
		} : {}
		const count = await Tile.countDocuments(filterBy)
		const pages = count ? Math.ceil(count / limit) : 0

		res.status(200).json({
			success: true,
			data: {
				tiles,
				pages
			}
		})
	} catch (err) {
		res.status(404).json({
			success: false,
			message: err.message
		})
	}
})

// get populars tiles
router.get('/popular', async (_, res) => {
	try {
		const tiles = await Tile.find({
			is_popular: true
		}).populate('type')

		res.status(200).json({
			success: true,
			data: tiles
		})
	} catch (err) {
		res.status(404).json({
			success: false,
			message: err.message
		})
	}
})

// download catalogue
router.get('/catalogue', async (_, res) => {
	try {
		const types = await Type.find().populate('tiles')

		pdf.create(catalogue({
			types
		})).toFile('public/catalogue.pdf', err => {
			if (err)
				res.status(500).json({
					success: false,
					message: err
				})

			res.status(200).download('public/catalogue.pdf')
		})
	} catch (err) {
		res.status(404).json({
			success: false,
			message: err.message
		})
	}
})

// customer request
router.post('/customer-request', async (req, res) => {
	try {
		const {
			name,
			phone,
			comment
		} = req.body

		const content =
			`<table>
				<tbody>
					<tr>Customer: ${name}</tr>
					</br>
					<tr>Phone: ${phone}</tr>
					</br>
					<tr>Comment: ${comment}</tr>
				</tbody>
			</table>`

		const response = await sendMail({
			fromEmail: 'pintsak-tiles.com.ua',
			subject: 'New customer request!',
			content
		})
		if (response[0].statusCode !== 202) return res.status(400).json({
			success: false,
			message: 'Email error'
		})

		res.status(201).json({
			success: true,
			message: 'Successfully sended'
		})
	} catch (err) {
		res.status(400).json({
			success: false,
			message: err.message
		})
	}
})

// order request
router.post('/order-request', async (req, res) => {
	try {
		const {
			name,
			phone,
			comment,
			order
		} = req.body

		const newOrder = await Customer.create(req.body)

		if (newOrder) {
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

			const response = await sendMail({
				fromEmail: 'pintsak-tiles.com.ua',
				subject: 'New order request!',
				content
			})
			if (response[0].statusCode !== 202) return res.status(400).json({
				success: false,
				message: 'Email error'
			})

			res.status(201).json({
				success: true,
				message: 'Successfully sended'
			})
		}

		res.status(400).json({
			success: false,
			message: 'Something went wrong'
		})
	} catch (err) {
		res.status(400).json({
			success: false,
			message: err.message
		})
	}
})

module.exports = router