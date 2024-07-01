const express = require("express");
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());



app.get("/", (req, res) => {
  //res.send("Welcome This Is Home Directory !");
  const data = {code:200,status:"Success", message: 'This Is Home Route' };
  res.json(data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
