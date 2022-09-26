const express = require("express");
require("dotenv").config();
require("./database/conn");
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const authRouter = require("./routes/auth.route");

app.use("/auth", authRouter);

app.listen(PORT, () => {
    console.log(`Server Running At Port : ${PORT}`);
});