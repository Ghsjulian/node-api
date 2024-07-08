const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.URI;
const PORT = process.env.PORT || 5000;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const db = process.env.DB_NAME;

mongoose
    .connect(uri, { dbName: db })
    .catch(error =>
        console.error("Error connecting to MongoDB Atlas : ", error)
    );
module.exports = mongoose;
