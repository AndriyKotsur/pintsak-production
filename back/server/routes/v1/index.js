const express = require('express')
const router = express.Router()

const publicRouter = require('./public')
const adminRouter = require('./admin')

router.use('/', publicRouter)
router.use('/admin', adminRouter)

module.exports = router
