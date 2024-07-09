const mongoose = require("../database/db.js");

const userSchema = new mongoose.Schema({
  user_name: String,
  user_email: String,
  user_password: String,
  user_avtar : String,
  user_token : String,
  user_login : Boolean
});

const User = mongoose.model("User", userSchema,"users");

module.exports = User;
