const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/study")
    .then(() => {
        console.log(`Database Connected`);
    })
    .catch((err) => {
        console.log(`Database Not Connected`);
    })