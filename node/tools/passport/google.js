const passport = require("passport");
const userModel = require("../../database/model/model");
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require("../../constants");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const addPassportGoogleStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        let userProfile = profile;
        // console.log(userProfile);
        // user = {
        //   fastname: userProfile.name.familyName,
        //   lastname: userProfile.name.givenName,
        //   email: userProfile.emails[0].value,
        // };
        // // console.log(user);
        // userModel.create(user).then((data) => {
        //   console.log("data", data);
        // });

        return done(null, profile);
      }
    )
  );
};

module.exports = {
  addPassportGoogleStrategy,
};
