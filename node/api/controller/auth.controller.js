const userModel = require("../../database/model/model");

const googleAuthCallbackController = (req, res, next) => {
  // store data

  res.redirect("/auth/google/success/{id}");
};

const googleAuth = (req, res, next) => {
  res.render("pages/auth.ejs");
};

const googleAuthsuccess = (req, res, next) => {
  userModel
    .find()
    .limit(1)
    .sort({ _id: -1 })
    .then((data) => {
      res.send(data);
    });
};

const googleAutherror = (req, res, next) => {
  res.send("error logging in");
};

module.exports = {
  googleAuthCallbackController,
  googleAuth,
  googleAuthsuccess,
  googleAutherror,
};
