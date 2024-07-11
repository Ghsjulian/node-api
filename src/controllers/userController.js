const myUser = require("../models/Users.js");
const myFunction = require("../auth/functions");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
var apiUrl = process.env.API_URL;
const sendEmail = require("../../email");

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
            const isExist = await myUser.findOne({
                user_name: username,
                user_email: email
            });
            if (isExist) {
                res.status(403).json({
                    code: 403,
                    status: "failed",
                    error: "User Already Registered!"
                });
            } else {
                const otp = Math.floor(100000 + Math.random() * 900000);
                const isSent = await sendEmail(username, email, otp);
                if (isSent) {
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
                        user_login: true,
                        user_verified: false
                    });
                    const save = await newUser.save();
                        if (save) {
                        const currentUser = await myUser.findOne({
                            user_email: email
                        });
                        return res.status(200).json({
                            code: 200,
                            url: "/api/user/verification",
                            user: {
                                userId: currentUser._id,
                                user_otp: otp,
                                user_email: email
                            },
                            status: "pending",
                            success: "Verify Your Email Address"
                        });
                        }
                } else {
                    res.status(403).json({
                        code: 403,
                        status: "failed",
                        error: "Error Registering User , Try Again"
                    });
                }
            }
        } catch (err) {
            console.log(err);
            return res
                .status(500)
                .json({ code: 403, error: "Error Registering User" });
        }

        /*
            if (isExist) {
                res.status(403).json({
                    code: 403,
                    status: "failed",
                    error: "User Already Registered!"
                });
            } else {
                const otp = Math.floor(100000 + Math.random() * 900000);
                const isSent = await sendEmail(username, email, otp);
                if (isSent) {
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
                        user_login: true,
                        user_verified: false
                    });
                    if (await newUser.save()) {
                        const currentUser = await myFunction.findOne({
                            user_email: email
                        });
                        return res.status(200).json({
                            code: 200,
                            url: "/api/user/verification",
                            user: {
                                userId: currentUser._id,
                                user_otp: otp,
                                user_email: email
                            },
                            status: "pending",
                            success: "Verify Your Email Address"
                        });
                    }
                } else {
                    res.status(403).json({
                        code: 403,
                        status: "failed",
                        error: "Error Registering User , Try Again"
                    });
                }
            }
            */
    }
    async verifyEmail(req, res) {
        const userInfo = req.body.user;
        const sessionInfo = req.session;
        console.log(sessionInfo);
        res.json(userInfo);
    }
    async login(req, res) {
        const email = req.body.user_email.trim();
        const password = req.body.user_password.trim();
        // Validation
        if (!email || !password) {
            return res.status(400).json({
                code: 403,
                status: "failed",
                error: "All Fields Are Required"
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
                user_email: email
            });
            if (isExist) {
                if (isExist.user_email === email) {
                    try {
                        const isMatch = await myFunction.comparePassword(
                            password,
                            isExist.user_password
                        );
                        if (isMatch) {
                            const date = new Date();
                            const today = date.toDateString();
                            const username = isExist.user_name;
                            const token = await myFunction.encodeJWT({
                                username,
                                email,
                                today
                            });
                            const update = await myUser.findOneAndUpdate(
                                { user_email: email },
                                { user_token: token }
                            );
                            if (update) {
                                return res.status(201).json({
                                    code: 201,
                                    data: {
                                        userId: isExist._id,
                                        isLogin: true,
                                        token: token,
                                        date: today
                                    },
                                    status: "success",
                                    success: "User Logged In Successfully"
                                });
                            } else {
                                return res.status(403).json({
                                    code: 403,
                                    status: "failed",
                                    error: "Invalid Username Or Password"
                                });
                            }
                        } else {
                            return res.status(403).json({
                                code: 403,
                                status: "failed",
                                error: "Invalid User Credentials !"
                            });
                        }
                    } catch (err) {
                        return res
                            .status(500)
                            .json({ code: 403, error: "Error User Login" });
                    }
                }
            } else {
                res.status(403).json({
                    code: 403,
                    status: "failed",
                    error: "Invalid Credentials , Please Try Again"
                });
            }
        } catch (err) {
            return res
                .status(500)
                .json({ code: 403, error: "Error User Login" });
        }
    }
    async users(req, res) {
        try {
            const users = await myUser.find().exec();
            // console.log(users);
            return res.status(200).json(users);
        } catch (err) {
            console.log(err);
            return res.status(404).json({
                code: 404,
                status: "failed",
                error: "No User Found!"
            });
        }
    }
    async deleteUser(req, res) {
        const userId = req.params.id;
        try {
            const isExist = await myFunction.findOne({ _id: userId });
            if (isExist) {
                const isDelete = await myUser.findByIdAndDelete(userId);
                return res.status(204).json({
                    code: 204,
                    status: "success",
                    success: "User Deleted Successfully"
                });
            } else {
                return res.status(404).json({
                    code: 404,
                    status: "failed",
                    error: "User Doesn't Exist"
                });
            }
        } catch (err) {
            return res.status(403).json({
                code: 403,
                status: "failed",
                error: "User Deleted Failed"
            });
        }
    }
}

let user = new User();
module.exports = user;
