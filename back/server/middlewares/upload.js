const multer = require('multer')
const fs = require('fs')
const path = require('path')

const storage = multer.diskStorage({
	destination: (req, _, cb) => {
		let folder
		if (req.body.folderName && req.body.url)
			folder = `./public/images/${req.body.folderName}/${req.body.url}`
		else
			folder = './public/docs'

		fs.access(folder, fs.constants.F_OK, () => {
			if (!fs.constants.F_OK)
				return fs.mkdir(folder, {recursive: true}, error => cb(error, folder))

			return cb(null, folder)
		})
	},
	filename: function (req, file, cb) {
		const title = req.body.url || 'tile-catalogue'
		cb(null, title + '-' + Date.now() + path.extname(file.originalname))
	},
})

const uploadFile = multer ({
	limits: {
		fileSize: 50000000,
	},
	fileFilter(_, file, cb) {
		if (!file.originalname.match(/\.(doc|docx|pdf|xls|xlsx)$/))
			return cb(new Error('Please upload a file'))

		cb(undefined, true)
	},
	storage: storage,
}).single('file')

const uploadImages = multer ({
	limits: {
		fileSize: 2000000,
	},
	fileFilter(_, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
			return cb(new Error('Please upload an image'))

		cb(undefined, true)
	},
	storage: storage,
}).array('images', 100)

const removeFolder = folderPath => {
	if (fs.existsSync(folderPath)) {
		fs.readdirSync(folderPath).forEach(file => {
			const currentPath = folderPath + '/' + file
			if (fs.lstatSync(currentPath).isDirectory())
				removeFolder(currentPath)
			else
				fs.unlinkSync(currentPath)

		})
		fs.rmdirSync(folderPath)
	}
}

module.exports = { uploadImages, uploadFile, removeFolder }
