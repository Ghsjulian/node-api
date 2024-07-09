const myUser = require("../models/Users");

const findOne = async key => {
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
};

module.exports = { findOne };
