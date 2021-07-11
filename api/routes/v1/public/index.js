const express = require('express')
const router = express.Router()
const pdf = require('html-pdf')

const { Type, Tile, Customer } = require('../../../models')
const { sendMail } = require('../../../services/sendgrid')
const templateCatalogue = require('../../../services/pdf/index')
const emailTemplate = require('../../../services/email/index')

// Get single product
router.get('/tile/:url', async (req, res) => {
	try {
		const {
			url,
		} = req.params
		const tile = await Tile.findOne({
			url,
		}).populate('type')

		const tiles = await Tile.find({
			url: {
				$ne: tile.url,
			},
			type: tile.type,
		}).limit(9).populate('type')

		res.status(200).json({
			success: true,
			data: {
				tile,
				tiles,
			},
		})
	} catch (err) {
		res.status(404).json({
			success: false,
			message: err.message,
		})
	}
})

// Get product list with parameters
router.get('/tiles', async (req, res) => {
	try {
		const {
			order,
			page,
			type,
			sort,
		} = req.query
		const _page = page ? page - 1 : 0
		const limit = 9

		const findBy = type ? {
			'type.url': type,
		} : {}
		const sortBy = sort ? {
			[sort]: Number(order),
		} : {
			createdAt: -1,
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
						'$arrayElemAt': ['$type', 0],
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
				$addFields: {
					default_color: { $arrayElemAt: [{ $objectToArray: '$prices' }, 0] },
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
			type: tiles[0].type._id,
		} : {}
		const count = await Tile.countDocuments(filterBy)
		const pages = count ? Math.ceil(count / limit) : 0

		res.status(200).json({
			success: true,
			data: {
				tiles,
				pages,
			},
		})
	} catch (err) {
		res.status(404).json({
			success: false,
			message: err.message,
		})
	}
})

// Get list of popular products
router.get('/popular', async (_, res) => {
	try {
		const tiles = await Tile.find({
			is_popular: true,
		}).populate('type')

		res.status(200).json({
			success: true,
			data: tiles,
		})
	} catch (err) {
		res.status(404).json({
			success: false,
			message: err.message,
		})
	}
})

// Get categories list
router.get('/types', async (_, res) => {
	try {
		const types = await Type.find()

		res.status(200).json({
			success: true,
			data: types,
		})
	} catch (err) {
		res.status(404).json({
			success: false,
			message: err.message,
		})
	}
})

// Send order request
router.post('/order-request', async (req, res) => {
	try {
		const {
			name,
			message,
			order,
			phone,
		} = req.body

		const content = emailTemplate(name, phone, message, order)

		const response = await sendMail({
			subject: 'Нове замовлення від користувача 🔥🔥🔥',
			content,
		})

		if (response[0].statusCode !== 202) {
			return res.status(400).json({
				success: false,
				message: 'Email error - ' + response.body.errors,
			})
		}
		await Customer.create(req.body)

		res.status(201).json({
			success: true,
			message: 'Message has been successfully sended',
		})
	} catch (err) {
		console.log(err.response.body.errors)
		res.status(400).json({
			success: false,
			message: err.message,
		})
	}
})

// Send customer request
router.post('/customer-request', async (req, res) => {
	try {
		const {
			name,
			phone,
			message,
		} = req.body

		const content = emailTemplate(name, phone, message)

		const response = await sendMail({
			subject: 'Новий запит від користувача ⚡️⚡️⚡️',
			content,
		})

		if (response[0].statusCode !== 202) {
			return res.status(400).json({
				success: false,
				message: 'Error has occurred email',
			})
		}

		res.status(201).json({
			success: true,
			message: 'Message has been successfully sended',
		})
	} catch (err) {
		res.status(400).json({
			success: false,
			message: err.message,
		})
	}
})

// Download catalogue of product list
router.get('/catalogue', async (_, res) => {
	try {
		const types = await Type.find().populate('tiles')
		const date = new Date()
		const fileName = `Каталог продукції - ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}.pdf`

		pdf.create(templateCatalogue({ types }), {
			'border': '5mm',
			'format': 'A4',
			'orientation': 'portrait',
			'type': 'pdf',
			'zoomFactor': '1',
		}).toFile(`public/${fileName}`, err => {
			if (err)
				res.status(500).json({ success: false, message: err })

			res.status(200).download(`public/${fileName}`)
		})
	} catch (err) {
		res.status(404).json({
			success: false,
			message: err.message,
		})
	}
})

module.exports = router
