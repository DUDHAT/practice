const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userModel = require("../model/model");
const controller = require("../controller/controller");

// mongoose connect
mongoose.connect("mongodb://localhost:27017/userDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const register = express.Router();

//API
register.post("/insert", controller.insert);
register.post("/login", controller.login);
register.put("/update", controller.update);
register.delete("/delete", controller.delete);

module.exports = register;