const mongoose = require("mongoose");

async function database(db_name){
mongoose
    .connect(`mongodb://localhost:27017/${db_name}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));
}

module.exports = database