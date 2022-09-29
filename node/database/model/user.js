const mongoose = require("mongoose");
// const connection = require("../connect");
const user = new mongoose.Schema({
  fastname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  phone_no: { type: String, required: true },
  age: { type: String, required: true },
});

const users = new mongoose.model("user", user);

module.exports = users;
