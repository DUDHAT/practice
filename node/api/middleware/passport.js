const passport = require('passport');

const passportGoogleAuth = passport.authenticate('google', { scope: ['profile', 'email'] })
const passportGoogleAuthCallback = passport.authenticate('google', { failureRedirect: '/error' })

module.exports = {
    passportGoogleAuth,
    passportGoogleAuthCallback
}