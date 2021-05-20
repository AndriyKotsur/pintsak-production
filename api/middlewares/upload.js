require('dotenv').config()
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const path = require('path')

const { awsInfo } = require('../config')

const s3Config = new aws.S3({
	accessKeyId: awsInfo.accessKey,
	secretAccessKey: awsInfo.secretKey,
	region: awsInfo.region,
})

const multerS3Config = multerS3({
	s3: s3Config,
	acl: 'public-read',
	bucket: awsInfo.bucket,
	metadata: function (_, file, cb) {
		cb(null, {
			fieldName: file.fieldname,
		})
	},
	key: function (_, file, cb) {
		cb(null, 'product-' + Math.random().toString(36).slice(-8) + path.extname(file.originalname))
	},
})

const fileFilter = function (_, file, cb) {
	if (!file.originalname.match(/\.(jpg|jpeg|png|svg)$/))
		return cb(new Error('Please upload an image'))

	cb(undefined, true)
}

const upload = multer({
	limits: {
		fileSize: 50000000,
	},
	fileFilter: fileFilter,
	storage: multerS3Config,
})

const uploadFiles = upload.array('images', 10)

const uploadImages = (req, res, next) => {
	uploadFiles(req, res, err => {
		if (err instanceof multer.MulterError) {
			if (err.code === 'LIMIT_UNEXPECTED_FILE')
				console.log(err)
		} else if (err) {
			console.log(err)
		}

		next()
	})
}

const deleteImages = key => {
	const filename = key.split('/')
	const params = { Bucket: awsInfo.bucket, Key: filename[filename.length - 1] }
	s3Config.deleteObject(params, (err, data) => {
		if (err) {
			console.error(err)

			return err
		}

		return data
	})
}

module.exports = {
	uploadImages,
	deleteImages,
}
