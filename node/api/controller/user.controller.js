const users = require("../../database/model/user");
var XLSX = require("xlsx");
const { upload } = require("../middleware/file");

const newusercreate = (req, res) => {
  console.log(req.body);
  users.create(req.body).then((data) => {
    res.send({
      data: data,
      status: true,
      responsecode: 1,
      message: "New User create Successfully ",
    });
  });
};

const getuser = (req, res) => {
  users.find({ _id: req.params.id }).then((data, err) => {
    if (data == "") {
      res.send({
        message: "pls enter valid user id",
        status: false,
        responsecode: 0,
      });
    } else {
      res.send({
        data: data,
        status: true,
        responsecode: 1,
        message: "User Successfully Get ",
      });
    }
  });
};

const edituser = (req, res) => {
  users
    .updateOne(
      { _id: req.body.id },
      {
        $set: {
          fastname: req.body.fastname,
          lastname: req.body.lastname,
          email: req.body.email,
          phone_no: req.body.phone_no,
          age: req.body.age,
        },
      }
    )
    .then(() => {
      users.find({ _id: req.body.id }).then((data) => {
        res.send({
          data: data,
          status: true,
          responsecode: 1,
          message: " User Data Update Successfully ",
        });
      });
    });
};

const deleteuser = (req, res) => {
  users.deleteOne({ _id: req.params.id }).then((data) => {
    data.deletedCount == 0
      ? res.json({
          status: false,
          responsecode: 0,
          message: " User not found ",
        })
      : res.json({
          status: true,
          responsecode: 1,
          message: " User delete Successfully ",
        });
  });
};

const xlsxdataread = (req, res) => {
  console.log(req.files.length);
  for (let i = 0; i <= req.files.length - 1; i++) {
    var workbook = XLSX.readFile(req.files[i].path);
    var sheet_namelist = workbook.SheetNames;

    sheet_namelist.forEach((element) => {
      var x = 0;
      var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
      console.log(xlData);
      res.send(xlData);
    });
  }
};

const googleimageuplode = (req, res) => {};

module.exports = {
  newusercreate,
  getuser,
  edituser,
  deleteuser,
  xlsxdataread,
  googleimageuplode,
};

/*

  Function
  1. start
  2. logic
  3. output 


  Controller
  1. request Inputs
  2. Logic
  3. Output

  */
