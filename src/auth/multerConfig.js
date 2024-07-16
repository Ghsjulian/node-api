// multer.config.js

const multer = require("multer");
const path = require("path");

const createUpload = (folderPath, fileName) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, folderPath);
        },
        filename: (req, file, cb) => {
            cb(null, fileName+path.extname(file.originalname));
        }
    });

    return multer({ storage: storage });
};

module.exports = createUpload;

