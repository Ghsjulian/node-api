const mongoose = require("../models/Users.js")
class User {
    /*
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.username = req.body.username;
        this.email = req.body.email;
        this.password = req.body.password;
    }
*/
    async register(req, res) {
        const username = req.body.user_name;
        const email = req.body.user_email;
        const password = req.body.user_password;
        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (username.length < 3) {
            return res
                .status(400)
                .json({ error: "Username must be at least 3 characters" });
        }

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            return res.status(400).json({ error: "Invalid email address" });
        }

        if (password.length < 5) {
            return res
                .status(400)
                .json({ error: "Password must be at least 8 characters" });
        }

        // Save user document
        try {
            // await this.saveDoc();
            return res
                .status(201)
                .json({ message: "User registered successfully!" });
        } catch (err) {
            return res.status(500).json({ error: "Error registering user" });
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
    async users(req,res){
        try {
    const users = await User.find().exec();
    console.log(users)
    return res.status(200).json(users)
  } catch (err) {
    console.log(err)
  }
    }
}

let user = new User();
module.exports = user;
