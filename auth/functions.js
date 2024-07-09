const fs = require("fs");
const path = require("path");
const myUser = require("../models/Users");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const { secretKey, expiresIn } = require("./config");

class myFunction {
    async findOne(key) {
        try {
            const user = await myUser.findOne(key);
            if (user) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.error(err);
        }
    }
    async hashPassword(password) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        return hashedPassword;
    }
    async comparePassword(password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword);
    }
    async encodeJWT(payload) {
        return jwt.sign(payload, secretKey, { expiresIn });
    }
    async decodeJWT(token) {
        try {
            return jwt.verify(token, secretKey);
        } catch (err) {
            return null;
        }
    }

    async serveImage(req, res) {
        if (req.url.startsWith("/images/")) {
            const imagePath = req.url.substring(1); // remove leading slash
            const filePath = path.join(__dirname, "../" + imagePath);
            const ext = path.extname(filePath);
            let contentType = "";
            switch (ext) {
                case ".png":
                    contentType = "image/png";
                    break;
                case ".jpg":
                case ".jpeg":
                    contentType = "image/jpeg";
                    break;
                case ".gif":
                    contentType = "image/gif";
                    break;
                default:
                    res.statusCode = 404;
                    res.end("Image not found");
                    return;
            }
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.statusCode = 404;
                    res.end("Image not found");
                } else {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", contentType);
                    res.end(data);
                }
            });
        }
    }

    async getContentType(imagePath) {
        const ext = path.extname(imagePath);
        switch (ext) {
            case ".png":
                return "image/png";
            case ".jpg":
                return "image/jpeg";
            case ".jpeg":
                return "image/jpeg";
            case ".gif":
                return "image/gif";
            default:
                return "text/plain";
        }
    }
    async getUrlParams(url) {
        const params = {};
        const query = url.split("?")[1];
        if (query) {
            const pairs = query.split("&");
            for (let i = 0; i < pairs.length; i++) {
                const pair = pairs[i].split("=");
                params[decodeURIComponent(pair[0])] = decodeURIComponent(
                    pair[1]
                );
            }
        }
        return params;
    }
}

module.exports = new myFunction();
