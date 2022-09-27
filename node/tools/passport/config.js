const passport = require("passport");
const { addPassportGoogleStrategy } = require("./google");

const configurePassport = () => {
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });

  addPassportGoogleStrategy();
};

module.exports = {
  configurePassport,
};
