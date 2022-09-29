const express = require("express");
const session = require("express-session");
const userModel = require("./database/model/model");
const path = require("path");
const user_router = require("./api/routes/user");
const authRouter = require("./api/routes/auth");
const productrouter = require("./api/routes/product");
const passport = require("passport");
const bodyparser = require("body-parser");
const { configurePassport } = require("./tools/passport/config");
const connections = require("./database/connect");
const routes = require("./api/routes/auth");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

app.use(express.static(`${__dirname}/public`));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

configurePassport();

app.use("/product", productrouter);
app.use("/user", user_router);

app.listen(port, () => console.log("App listening on port " + port));
