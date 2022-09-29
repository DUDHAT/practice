const express = require("express");

const { newusercreate } = require("../controller/user.controller");
const { getuser } = require("../controller/user.controller");
const { edituser } = require("../controller/user.controller");
const { deleteuser } = require("../controller/user.controller");
const { xlsxdataread } = require("../controller/user.controller");
const {
  validateCreateUser,
} = require("../middleware/validators/user.route.validators");
const { upload } = require("../middleware/file");

const {
  UseridValidate,
} = require("../middleware/validators/user.route.validators");

const { googleimageuplode } = require("../controller/user.controller");

const user_router = new express.Router();

user_router.post("/create", validateCreateUser, newusercreate);

user_router.post("/xlsxdataread", upload, xlsxdataread);

user_router.get("/:id", UseridValidate, getuser);

user_router.post("/edit", validateCreateUser, edituser);

user_router.delete("/:id", UseridValidate, deleteuser);

user_router.post("/googleimageuplode", upload, googleimageuplode);

module.exports = user_router;
