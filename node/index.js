const express = require("express");
const session = require("express-session");
const userModel = require("./database/model/model");
const authRouter = require("./api/routes/auth");
const passport = require("passport");
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
app.use(passport.initialize());
app.use(passport.session());

configurePassport();

// Routes
app.use("/auth", authRouter);
app.use("/", routes);

// --------------------------

/*
1. refactor code 
2. User endpoints 
    GET /user/{123}
    POST /user/create
    POST /user/edit
    DELETE /user/{2134}

*/

// refactor this

// get fresh data from database
// refactore to routes, controller

app.listen(port, () => console.log("App listening on port " + port));

/*


createServer();

configureDatabase();

configureRoutes();

startServer();






/// startServer

app.listen(port, () => console.log("App listening on port " + port));



// configureRoutes\


route.get('/user', getUser);




// controller 


const getUser = (id) => {
    userModei.find()
}


//configureDatabase


connectDatebase()

collections = createCollections();

export {collections}

*/
