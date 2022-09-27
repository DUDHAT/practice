const express = require("express");
const {
  googleAuthCallbackController,
} = require("../controller/auth.controller");
const { googleAuth } = require("../controller/auth.controller");
const { googleAuthsuccess } = require("../controller/auth.controller");
const { googleAutherror } = require("../controller/auth.controller");
const {
  passportGoogleAuthCallback,
  passportGoogleAuth,
} = require("../middleware/passport");

const router = new express.Router();

router.get("/google", passportGoogleAuth);

router.get(
  "/google/callback",
  passportGoogleAuthCallback,
  googleAuthCallbackController
);

router.get("/", googleAuth);

router.get("/google/success", googleAuthsuccess);

router.get("/google/error", googleAutherror);

module.exports = router;
