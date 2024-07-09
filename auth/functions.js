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
