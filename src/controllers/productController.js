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
                product_img: apiUrl + "/uploads/" + productImg,
                product_desc: product_obj,
                product_category: category
            });
            const save = await newProduct.save();
            if (save) {
                res.status(201).json({
                    code: 201,
                    type: true,
                    status: "success",
                    success: "Product Added Successfully"
                });
            } else {
                res.status(403).json({
                    code: 403,
                    type: false,
                    status: "failed",
                    error: "Error Adding Products"
                });
            }
        }
    }
    async fetchProduct(req, res) {
        const products = await Product.find().exec();
        res.status(200).json({
            code: 200,
            products,
            type: true,
            status: "success",
            success: "Everything Is okay"
        });
    }
    async editProduct(req, res) {
        const products = await Product.findOne({ _id: req.params.id});
        res.status(200).json({
            code: 200,
            products,
            type: true,
            status: "success",
            success: "Everything Is okay"
        });
    }
}
let product = new Products();
module.exports = product;
