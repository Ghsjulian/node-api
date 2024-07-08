const User = require("./models/Users");

async function createUser() {
    const user = new User({
        user_name: "Ghs Julian",
        user_email: "ghsjulian@gmail.com",
        user_password: "123456",
        user_avtar: "ghs_julian.png",
        user_token: "api_key123abc",
        user_login: true
    });
    try {
        await user.save();
        console.log("User created successfully!");
    } catch (error) {
        console.error("Error creating user:", error);
    }
}

createUser();
