const path = require("path");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const secret_key = process.env.SECRET_KEY;
const conn = require("./database/db.js");
const router = require("./routes/route.js");

// Serve images from the 'images' directory
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

// Set up session middleware
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: 10 * 60 * 1000 // 10 minutes
        }
    })
);

// Set up router middleware
app.use("/api", router);

/*=================================*/
app.listen(PORT, () => {
    console.log(`\n Server is running on port - ${PORT}\n`);
});

// Export the Express app
module.exports = app;
