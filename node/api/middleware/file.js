const multer = require("multer");
const path = require("path");

const uploadFolderPath = path.resolve(__dirname, "../../uploads");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolderPath);
  },
  filename: function (req, file, cb) {
    console.log(req.file);
    cb(null, file.fieldname + "-" + Date.now() + ".xlsx");
  },
});

var upload = multer({
  storage: storage,
  //   dest: uploadFolderPath,
  fileFilter: function (req, file, cb) {
    // Set the filetypes, it is optional
    var filetypes = /xlsx/;
    var mimetype = filetypes.test(file.mimetype);

    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (extname) {
      console.log("Looks valid");
      return cb(null, true);
    }

    console.log("Something doesnt look right");

    cb(
      "Error: File upload only supports the " +
        "following filetypes - " +
        filetypes
    );
  },

  // mypic is the name of file attribute
}).any("mypic");

module.exports = {
  upload,
};
