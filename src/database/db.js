const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config();
dotenv.config({ path: "../../.env" });
/* LOCALHOST URI */
const user = "ghsjulian";
const pwd = "ghsjulian";
/*
//const uri = `mongodb://${user}:${pwd}@localhost:27017`;
const uri = `mongodb://localhost:27017/`;
const PORT = process.env.PORT || 5000;
const db = process.env.DB_NAME || "shopping-cart";
*/
/* REMOTE URI */

const uri = process.env.URI;
const PORT = process.env.PORT || 5000;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const db = process.env.DB_NAME;


mongoose
    .connect(uri, { dbName: db })
    .catch(error => console.error("Error connecting to MongoDB : ", error));
module.exports = mongoose;
