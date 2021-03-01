const express = require('express')
const router = express.Router()

const { removeFolder} = require('../../../middlewares/upload')
const auth = require('../../../middlewares/auth')
const { Type } = require('../../../models')

// get one type
router.get('/:id', auth, async (req, res) => {
	try {
		const { id } = req.params
		const type = await Type.findById(id)
		if (!type) return res.status(404).json({ success: true, message: 'Type not found' })

		res.status(200).json({ success: true, type })
	} catch (err) {
		res.status(404).json({ success: false, message: err.message })
	}
})

// add tile type
router.post('/', auth, async (req, res) => {
	try {
		await Type.create(req.body)

		res.status(201).json({ success: true, message: 'Successfully created' })
	} catch (err) {
		res.status(400).json({ success: false, message: err.message })
	}
})

// update  type
router.put('/:id', auth, async (req, res) => {
	try {
		const { id } = req.params

		await Type.findByIdAndUpdate(id, req.body)

		res.status(200).json({ success: true, message: 'Successfully updated' })
	} catch (err) {
		res.status(400).json({ success: false, message: err.message })
	}
})

// delete tile type
router.delete('/:id', auth, async (req, res) => {
	try {
		const { id } = req.params

		const type = await Type.findByIdAndDelete(id)
		removeFolder(`./public/images/${type.url}`)

		res.status(200).json({ success: true, message: 'Successfully removed' })
	} catch (err) {
		res.status(400).json({ success: false, message: err.message })
	}
})

module.exports = router
