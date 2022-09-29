const mongoose = require("mongoose");

var connections = mongoose
  .connect("mongodb://localhost:27017/node")
  .then(() => {
    console.log("connection");
  });

module.exports = connections;
