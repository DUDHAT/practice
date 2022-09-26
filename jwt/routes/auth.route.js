const router = require("express").Router();
const auth = require("../middleware/auth");

const {
    register,
    userLogin,
    userLogins,
    userLogout,
} = require("../controller/auth.controller");

router.post("/user/register", register);

router.post("/user/login", userLogin);

router.post("/user/logins",auth ,userLogins);

router.post("/user/logout", userLogout);

module.exports = router;

