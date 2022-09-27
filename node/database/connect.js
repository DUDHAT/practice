const mongoose = require("mongoose");

var connections = mongoose
  .connect("mongodb://localhost:27017/node")
  .then(() => {
    console.log("connection");
  });

//  mongoose.connect(
//   "mongodb://localhost:27017/node",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   },
//   () => {
//     console.log("mongdb is connected");
//   }
// );

module.exports = connections;
