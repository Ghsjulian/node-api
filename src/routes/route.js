const express = require("express");
const user = require("../controllers/userController.js");
const myFunction = require("../auth/functions");
const isAuth = require("../auth/isAuth")
const router = express.Router();

router.post("/signup", user.register);
router.post("/login", user.login);
router.post("/user/verification", user.verifyEmail);
router.get("/users", user.users);
router.get("/users/delete/:id", user.deleteUser);
// router.post("/is-user", userController.isExistUser);
//
module.exports = router;
