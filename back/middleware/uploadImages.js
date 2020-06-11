const multer = require('multer');
const jimp = require('jimp');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const type = req.body.type;
        const title = req.body.title;
        const folder = `./public/images/${type}/${title}`;
        fs.exists(folder, exist => {
            if (!exist) {
                return fs.mkdir(folder,error => cb(error, folder));
            }
            return cb(null, folder)
        })
    },
    filename: function (req, file, cb) {        
        cb(null, "tile-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer ({
    
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

module.exports = { upload, optimizeImages };