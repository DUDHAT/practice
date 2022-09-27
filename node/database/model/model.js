const mongoose = require("mongoose");
// const connection = require("../connect");
const userdata = new mongoose.Schema({
  fastname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
});

const userModel = new mongoose.model("userdetails", userdata);

module.exports = userModel;
