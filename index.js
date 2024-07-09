const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const conn = require("./database/db.js");
const router = require("./routes/route.js");
// const users = require("./getUser.js");

console.clear();

// Serve images from the 'images' directory
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
    res.status(200).send({
        code: 200,
        status: "success",
        message: "This Is Root Directory"
    });
});

app.use("/api", router);

/*=================================*/
app.listen(PORT, () => {
    console.log(`\n Server is running on port - ${PORT}\n`);
});

// Export the Express app
module.exports = app;
