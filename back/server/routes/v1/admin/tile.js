const express = require('express')
const router = express.Router()

const { uploadImages, removeFolder } = require('../../../middlewares/upload')
const auth = require('../../../middlewares/auth')
const { Tile, Type } = require('../../../models')

// add tile
router.post('/', auth, async (req, res) => {
	try {
		const tile = await Tile.create(req.body)

		res.status(201).json({ success: true, data: tile })
	} catch (err) {
		res.status(400).json({ success: false, message: err.message })
	}
})

// update tile
router.put('/:id', auth, async (req, res) => {
	try {
		const { id } = req.params

		const tile = await Tile.findById(id).populate('type')
		if (!tile) return res.status(404).json({ success: false, message: 'Tile not found' })

		await tile.update(req.body)

		res.status(200).json({ success: true, message: 'Successfully updated' })
	} catch (err) {
		res.status(400).json({ success: false, message: err.message })
	}
})

// upload images
router.put('/images/:id', auth, async (req, res) => {
	try {
		const { id } = req.params

		const tile = await Tile.findById(id).populate('type')
		if (!tile) return res.status(404).json({ success: false, message: 'Tile not found' })

		removeFolder(`./public/images/${tile.type.url}/${tile.url}`)
		uploadImages( req, res, async err => {
			if (err)
				throw err

			const images = []

			for (let i = 0; i < req.files.length; i++)
				images.push('http://localhost:5000' + (req.files[i].destination).slice(1) + '/' + req.files[i].filename)

			await Tile.findByIdAndUpdate(id, { images })

			res.status(201).json({ success: true, message: 'Successfully uploaded' })
		})
	} catch (err) {
		res.status(400).json({ success: false, message: err.message })
	}
})

// delete tile
router.delete('/:id', auth, async (req, res) => {
	try {
		const { id } = req.params

		const tile = await Tile.findById(id).populate('type')
		if (!tile) return res.status(404).json({ success: false, message: 'Tile not found' })

		tile.delete()
		await Type.findByIdAndUpdate(id, { $pull: { tiles: id } })
		removeFolder(`./public/images/${tile.type.url}/${tile.url}`)

		res.status(200).json({ success: true, message: 'Successfully removed' })
	} catch (err) {
		res.status(400).json({ success: false, message: err.message })
	}
})

module.exports = router
