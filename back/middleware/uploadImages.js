const multer = require('multer');
const jimp = require('jimp');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (req.body.folderName && req.body.title_url) {
            folder = `./public/images/${req.body.folderName}/${req.body.title_url}`;
        } else {
            folder = `./public/docs`;
        }
        fs.exists(folder, exist => {
            if (!exist) {
                return fs.mkdir(folder, {recursive: true}, error => cb(error, folder));
            }
            return cb(null, folder)
        })
    },
    filename: function (req, file, cb) {
        const title = req.body.title || 'Tile-catalogue';
        cb(null, title + '-' + Date.now() + path.extname(file.originalname));
    }
});

const uploadFile = multer ({
    limits: {
        fileSize: 50000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|pdf|xls)$/)) {
            return cb(new Error('Please upload a file'))
        }
        cb(undefined, true)
    },
    storage: storage
}).single('file');

const uploadImages = multer ({
    limits: {
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true)
    },
    storage: storage
}).array('images', 100);

const optimizeImages = async (req, res, next) => {
    await Promise.all(
        req.files.map(async file => {
            const image = await jimp.read(file.path);
            const widthProps = image.bitmap.width;
            const heightProps = image.bitmap.height;
            if (widthProps < heightProps) {
                image.resize(400, 800);
                image.quality(70);
                image.writeAsync(file.path);
            } else {
                image.resize(1200, 800);
                image.quality(70);
                image.writeAsync(file.path);
            }
        })
    )
    next();
};

removeFolder = (folderPath) => {
    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach(file => {
            const currentPath = folderPath + '/' + file;
            if (fs.lstatSync(currentPath).isDirectory()) {
                removeFolder(currentPath);
            } else {
                fs.unlinkSync(currentPath);
            }
        });
        fs.rmdirSync(folderPath);
    };
};

module.exports = { uploadImages, uploadFile, optimizeImages, removeFolder };