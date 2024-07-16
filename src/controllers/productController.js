const Product = require("../models/Products.js");
const multer = require("multer");
const myFunction = require("../auth/functions");
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });
var apiUrl = process.env.API_URL;

class Products {
    async addProduct(req, res) {
        const data = JSON.parse(req.body.data);
        const productImg = req.file.filename;
        const product_obj = data.product_obj;
        const category = data.product_category;
        const title = data.product_title;

        // Validation
        if (!data || !productImg) {
            return res.status(400).json({
                code: 403,
                type: false,
                status: "failed",
                error: "All Fields Are Required"
            });
        }
        if (data && productImg) {
            console.log(product_obj);
            const newProduct = new Product({
                product_title: title,
                product_img: productImg,
                product_desc: product_obj,
                product_category: category
            });
            res.json({ ok: "Okkk" });
        }
    }
}
let product = new Products();
module.exports = product;
