const express = require('express')
const router = express.Router()
const { uuid } = require('uuidv4')

const { removeFolder} = require('../../middleware/upload')
const auth = require('../../middleware/auth')
const pool = require('../../db')

// get one type
router.get('/:id', auth, async (req,res) => {
	try {
		const { id } = req.params
		const type = await pool.query(
			'SELECT * FROM type WHERE id = $1',
			[id],
		)
		res.status(200).json(type.rows[0])
	} catch (err) {
		console.error(err.message)
		res.status(404).json(
			{ message: err.message },
		)
	}
})

// add tile type
router.post('/add', auth, async (req, res) => {
	try {
		const { title } = req.body
		const url = Math.random().toString(36).slice(-8)

		await pool.query(
			'INSERT INTO type (id, title, url) VALUES ($1, $2, $3) RETURNING *',
			[uuid(), title, url],
		)
		res.status(201).json(
			{ message: 'Added' },
		)
	} catch (err) {
		console.error(err.message)
		res.status(400).json(
			{ message: err.message },
		)
	}
})

// update  type
router.put('/:id', auth, async (req, res) => {
	try {
		const { id } = req.params
		const { title } = req.body

		await pool.query(
			'UPDATE type SET title = $1 WHERE id = $2',
			[title, id],
		)
		res.status(200).json(
			{ message: 'Updated' },
		)
	} catch (err) {
		console.error(err.message)
		res.status(400).json(
			{ message: err.message },
		)
	}
})

// delete tile type
router.delete('/:id', auth, async (req,res) => {
	try {
		const { id } = req.params
		const type = await pool.query(
			'SELECT * FROM type WHERE id = $1',
			[id],
		)
		await pool.query(
			'DELETE FROM type WHERE id = $1',
			[id],
		)
		removeFolder(`./public/images/${type.rows[0].url}`)
		res.status(200).json(
			{ message: 'Deleted' },
		)
	} catch (err) {
		console.error(err.message)
		res.status(400).json(
			{ message: err.message },
		)
	}
})

module.exports = router
