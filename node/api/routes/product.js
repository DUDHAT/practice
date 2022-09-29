const express = require("express");

const { findproductds } = require("../controller/product.controller");

const {
  validateCreateUser,
} = require("../../api/middleware/validators/product.route.validators");

const productrouter = new express.Router();

productrouter.post("/findproductds", validateCreateUser, findproductds);

module.exports = productrouter;
