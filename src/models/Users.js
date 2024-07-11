const mongoose = require("../database/db.js");

const userSchema = new mongoose.Schema({
    user_name: String,
    user_email: {
        type: String,
        required: true,
        unique: true // Ensure email is unique
    },
    user_password: String,
    user_avtar: String,
    user_token: String,
    user_login: Boolean,
    user_verified: Boolean
});

const User = mongoose.model("User", userSchema,"users");

module.exports = User;
