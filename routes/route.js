const express = require("express");
const user = require("../controllers/userController.js");
const myFunction = require("../auth/functions");
const router = express.Router();

router.get("/images/:file_name", myFunction.serveImage);
router.post("/signup", user.register);
router.post("/login", user.login);
router.get("/users", user.users);
// router.post("/is-user", userController.isExistUser);
//
module.exports = router;
