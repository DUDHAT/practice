const userModel = require("../../database/model/model");
const { addPassportGoogleStrategy } = require("../../tools/passport/google");

const googleAuthCallbackController = (req, res, next) => {
  user = {
    fastname: req.user.name.familyName,
    lastname: req.user.name.givenName,
    email: req.user.emails[0].value,
  };
  // console.log(user);
  userModel.create(user).then((data) => {
    console.log("data", data);
    res.redirect(`/auth/google/success/${data._id.toString()}`);
  });
};

const googleAuth = (req, res, next) => {
  res.render("pages/auth.ejs");
};

const googleAuthsuccess = (req, res, next) => {
  console.log(req.params);
  userModel.find({ _id: req.params.id }).then((data) => {
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
