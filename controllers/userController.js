const myUser = require("../models/Users.js");
const myFunction = require("../auth/functions");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });
var apiUrl = process.env.API_URL;
class User {
    async register(req, res) {
        const username = req.body.user_name;
        const email = req.body.user_email;
        const password = req.body.user_password;
        const avtar = req.body.user_avtar;
        const token = req.body.user_token;
        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({
                code: 403,
                status: "failed",
                error: "All Fields Are Required"
            });
        }
        if (username.length < 3) {
            return res.status(400).json({
                code: 403,
                status: "failed",
                error: "Username Must Be At Least 3 Characters"
            });
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            return res.status(400).json({
                code: 403,
                status: "failed",
                error: "Invalid Email Address"
            });
        }
        if (password.length < 5) {
            return res.status(400).json({
                code: 403,
                status: "failed",
                error: "Password Must Be At Least 8 Characters"
            });
        }
        try {
            const isExist = await myFunction.findOne({
                user_name: username,
                user_email: email
            });
            if (isExist) {
                res.status(403).json({
                    code: 403,
                    status: "failed",
                    error: "User Already Exist!"
                });
            } else {
                const encPassword = await myFunction.hashPassword(password);
                const date = new Date();
                const today = date.toDateString();
                const newUser = new myUser({
                    user_name: username,
                    user_email: email,
                    user_password: encPassword,
                    user_avtar: apiUrl + `/images/default_user.png`,
                    user_token: await myFunction.encodeJWT({
                        username,
                        email,
                        today
                    }),
                    user_login: true
                });
                if (newUser.save()) {
                    return res.status(201).json({
                        code: 201,
                        data : {
                            
                            isLogin : true,
                            token : newUser.user_token,
                            date : today
                        },
                        status: "success",
                        success: "User Registration Successfully"
                    });
                }
            }
        } catch (err) {
            return res
                .status(500)
                .json({ code: 403, error: "Error Registering User" });
        }
    }

    async login() {
        // TO DO: implement login logic
        console.log("Login method not implemented yet");
        return res
            .status(501)
            .json({ error: "Login method not implemented yet" });
    }

    async saveDoc() {
        // Simulate saving user document to a database
        console.log("Saving user document...");
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("User document saved successfully!");
                resolve();
            }, 2000);
        });
    }
    async users(req, res) {
        try {
            const users = await myUser.find().exec();
            console.log(users);
            return res.status(200).json(users);
        } catch (err) {
            console.log(err);
        }
    }
}

let user = new User();
module.exports = user;
