const product = require("../../database/model/product");

const findproductds = (req, res) => {
  let name = req.body.name;
  console.log(req.body);
  product.find({ name: { $regex: `${name}`, $options: "i" } }).then((data) => {
    res.send(data);
  });
};
// {  name: /^BM/ }
module.exports = {
  findproductds,
};
