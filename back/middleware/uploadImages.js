const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const productId = req.params.id;
        const folder = `./public/images/${productId}/${productId}`
        fs.exists(folder, exist => {
            if (!exist) {
                return fs.mkdir(folder, error => cb(error, folder))
            }
            return cb(null, folder)
        })
    },
    filename: function (req, file, cb) {
        cb(null, "product-" + Date.now() + path.extname(file.originalname));
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
    //storage: storage
}).array('images', 100);

const optimizeImages = async (req, res, next) => {
    await Promise.all(
        req.files.map(async file => {
            const image = await jimp.read(file.path);
            const widthProps = image.bitmap.width;
            const heightProps = image.bitmap.height;
            if (widthProps < heightProps) {
                await image.resize(400, 800);
                await image.quality(70);
                await image.writeAsync(file.path);
            } else {
                await image.resize(1200, 800);
                await image.quality(70);
                await image.writeAsync(file.path);
            }
        })
    )
    next();
};

module.exports = { upload, optimizeImages };