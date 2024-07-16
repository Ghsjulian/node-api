const express = require("express");
const user = require("../controllers/userController");
const product = require("../controllers/productController");
const myFunction = require("../auth/functions");
const isAuth = require("../auth/isAuth");
const upload = require("../auth/multerConfig")
const router = express.Router();

/* Users And Clients Access Routes */
router.post("/signup", user.register);
router.post("/login", user.login);
router.post("/logout", user.logout);
router.post("/user/verification", user.verifyEmail);
router.get("/users", user.users);
router.get("/users/delete/:id", user.deleteUser);
/* Admin Access Routes */
router.post("/admin/add-product",upload.single("product_img") ,product.addProduct);

module.exports = router;
