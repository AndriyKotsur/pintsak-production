const express = require('express')
const router = express.Router()

const auth = require('../../../middlewares/auth')
const { uploadImages, deleteImages } = require('../../../middlewares/upload')
const { Tile, Type } = require('../../../models')

// Add single product
router.post('/', auth, async (req, res) => {
	try {
		const tile = await Tile.create({ ...req.body, url: Math.random().toString(36).slice(-8) })

		await Type.findByIdAndUpdate(req.body.type, {
			$push: { tiles: tile._id },
		})

		res.status(201).json({ success: true, data: tile })
	} catch (err) {
		res.status(400).json({ success: false, message: err.message })
	}
})

// Update single tile
router.put('/:url', auth, async (req, res) => {
	try {
		const { url } = req.params

		const tile = await Tile.findOne({ url }).populate('type')
		if (!tile) return res.status(404).json({ success: false, message: 'Tile has not been found' })

		if (tile.type !== req.body.type) {
			await Type.findByIdAndUpdate(tile.type, {
				$pull: { tiles: tile._id },
			})
			await Type.findByIdAndUpdate(req.body.type, {
				$push: { tiles: tile._id },
			})
		}

		await Tile.updateOne({ url: tile.url }, req.body)

		res.status(200).json({ success: true, message: 'Tile has been successfully updated', data: { _id: tile._id, url: tile.url } })
	} catch (err) {
		res.status(400).json({ success: false, message: err.message })
	}
})

// Delete single product
router.delete('/:id', auth, async (req, res) => {
	try {
		const { id } = req.params

		const tile = await Tile.findById(id).populate('type')
		if (!tile) return res.status(404).json({ success: false, message: 'Tile has not been found' })

		for (const image of tile.images)
			deleteImages(image)

		tile.delete()
		await Type.findByIdAndUpdate(tile.type._id, { $pull: { tiles: id } })

		res.status(200).json({ success: true, message: 'Tile has been successfully deleted' })
	} catch (err) {
		res.status(400).json({ success: false, message: err.message })
	}
})

// Upload images fon single product
router.put('/images/:id', auth, uploadImages, async (req, res) => {
	try {
		const { id } = req.params
		const arr = []

		const tile = await Tile.findById(id).populate('type')
		if (!tile) return res.status(404).json({ success: false, message: 'Tile has not been found' })

		req.files.map(file => {
			arr.push(file.location)
		})

		await Tile.findByIdAndUpdate(id, {
			images: [...tile.images, ...arr],
		})

		res.status(200).json({ success: true, data: { _id: id, url: tile.url }, message: 'Images has been successfully uploaded' })

	} catch (err) {
		res.status(400).json({ success: false, message: err.message })
	}
})

// Delete images for single product
router.delete('/images/:id', auth, async (req, res) => {
	try {
		const { id } = req.params
		const { key } = req.body

		deleteImages(key)
		await Tile.findByIdAndUpdate(id, {
			$pull: {
				images: key,
			},
		})
		res.status(200).json({ success: true, message: 'Image has been successfully deleted' })
	} catch (err) {
		res.status(400).json({ success: false, message: err.message })
	}
})

module.exports = router
