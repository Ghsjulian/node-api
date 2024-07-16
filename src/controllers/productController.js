const Product = require("../models/Products.js");
const multer = require('multer');
const myFunction = require("../auth/functions");
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });
var apiUrl = process.env.API_URL;
const upload = multer({ dest: './uploads/' });


class Products {
    async addProduct(req, res) {
        console.log(req.body);
        console.log(req.file);
        res.json({ok:"okkk"})
        /*
        const product_title = req.body.product_title;
        const product_img = req.body.product_img;
        const product_desc = req.body.product_desc;
        const product_price = req.body.product_price;
        const product_category = req.body.product_category;
        // Validation
        if (!product_title || !product_img || !product_desc || !product_price || !product_category) {
            return res.status(400).json({
                code: 403,
                type: false,
                status: "failed",
                error: "All Fields Are Required"
            });
        }
        if (product_title && product_img && product_desc && product_price && product_category) {
        res.json({ok:"Okkk"})
        }
        */
    }
}
let product = new Products();
module.exports = product;
