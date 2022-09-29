const mongoose = require("mongoose");
const products = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
});

const product = new mongoose.model("product@information", products);

module.exports = product;
