const express = require('express')
const router = express.Router()
const { uuid } = require('uuidv4')

const { uploadImages, removeFolder} = require('../../middleware/upload')
const auth = require('../../middleware/auth')
const pool = require('../../db')

// add tile
router.post('/add', auth, uploadImages, async (req, res) => {
	try {
		const {
			title,
			type,
			weight_per_meter,
			pieces_per_meter,
			color_price,
			width,
			height,
			thickness,
			is_popular,
			is_available,
		} = req.body

		const url = Math.random().toString(36).slice(-8)
		const images = []

		for (let i = 0; i < req.files.length; i++)
			images.push('http://localhost:5000' + (req.files[i].destination).slice(1) + '/' + req.files[i].filename)

		const tileType = await pool.query(
			'SELECT * FROM type WHERE title = $1',
			[type],
		)
		await pool.query(
			'INSERT INTO tile (id, type_id, title, images, type, weight_per_meter, pieces_per_meter, color_price, width, height, thickness, url, is_popular, is_available ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *',
			[uuid(), tileType.rows[0].id, title, images, type, weight_per_meter, pieces_per_meter, JSON.parse(color_price), width, height, thickness, url, is_popular, is_available],
		)
		res.status(201).json(
			{ message: 'Added'},
		)
	} catch (err) {
		console.error(err.message)
		res.status(400).json(
			{ message: err.message },
		)
	}
})

// update tile
router.put('/:id', auth, async (req, res) => {
	try {
		const { id } = req.params
		const tile = await pool.query(
			'SELECT * FROM tile WHERE id = $1',
			[id],
		)
		const type = await pool.query(
			'SELECT * FROM type WHERE id = $1',
			[tile.rows[0].type_id],
		)
		removeFolder(`./public/images/${type.rows[0].url}/${tile.rows[0].url}`)
		uploadImages( req, res, async err => {
			if (err)
				throw err

			const { title, type, weight_per_meter, pieces_per_meter, color_price, width, height, thickness, is_popular, is_available } = req.body
			const images = []
			for (let i = 0; i < req.files.length; i++)
				images.push('http://localhost:5000' + (req.files[i].destination).slice(1) + '/' + req.files[i].filename)

			const tileType = await pool.query(
				'SELECT * FROM type WHERE title = $1',
				[type],
			)
			await pool.query(
				'UPDATE tile SET type_id = $1, title = $2, images = $3, weight_per_meter = $4, pieces_per_meter = $5, color_price = $6, width = $7, height = $8, thickness = $9, type = $10, is_popular = $11, is_available = $12 WHERE id = $13',
				[tileType.rows[0].id, title, images, weight_per_meter, pieces_per_meter, JSON.parse(color_price), width, height, thickness, type, is_popular, is_available, id],
			)
			res.status(200).json(
				{ message: 'Updated' },
			)
		})
	} catch (err) {
		console.error(err.message)
		res.status(400).json(
			{ message: err.message },
		)
	}
})

// delete tile
router.delete('/:id', auth, async (req,res) => {
	try {
		const { id } = req.params
		const tile = await pool.query(
			'SELECT * FROM tile WHERE id = $1',
			[id],
		)
		const type = await pool.query(
			'SELECT * FROM type WHERE id = $1',
			[tile.rows[0].type_id],
		)
		await pool.query(
			'DELETE FROM tile WHERE id = $1',
			[id],
		)
		removeFolder(`./public/images/${type.rows[0].url}/${tile.rows[0].url}`)
		res.status(200).json(
			{ message: 'Deleted' },
		)
	} catch (err) {
		console.error(err)
		res.status(400).json(
			{ message: err.message },
		)
	}
})

module.exports = router
