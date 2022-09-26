const jwt = require("jsonwebtoken");
const chapter = require("../models/auth.model");

const auth = async (req,res,next) => {
    try {
        console.log('gregv');
        const token = req.cookies.jwt;
        console.log(token);
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        const chapt = await chapter.findOne({ _id:verifyUser._id});
        req.token = token;
        req.user = chapt;
        next();

    } catch (error) {
        res.status(401).send('Not Match Data')
    }
}

module.exports = auth;