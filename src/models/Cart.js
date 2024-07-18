const mongoose = require("../database/db.js");

const cartSchema = new mongoose.Schema({
    user_id : String ,
    product_id : String,
    product_title: String,
    product_img: String,
    price: String,
    quantity: String
});
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
