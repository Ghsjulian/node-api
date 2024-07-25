const mongoose = require("../database/db.js");

const orderSchema = new mongoose.Schema({
    userId: String,
        token: String,
    user_name: String,
    user_email: String,
    user_phone: String,
    user_address: String,
    payment_type: String,
    order_date: { type: Date, default: Date.now },
    
});
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
