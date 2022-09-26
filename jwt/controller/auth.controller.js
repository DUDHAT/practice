const chapter = require("../models/auth.model");

exports.register = async (req, res) => {
    const userData = new chapter({
        username: req.body.username,
        number: req.body.number,
        password: req.body.password
    });

    try {
        const saveData = await userData.save();

            res.status(201).json({
                Info: saveData,
                message: "User Registered",
                status: 201
            })
    } catch (error) {
            res.status(400).json({
                message: "User Not Registered",
                status: 400
            })
    }
};

exports.userLogin = async (req, res) => {
    const username = req.body.username;
    const user = await chapter.findOne({ username: username });
    const ismatch = await chapter.find({username: username,password:req.body.password});
    const token = await user.generateAuthToken();
    console.log(token);
    res.cookie("jwt", token, {
        expires: new Date(Date.now() + 30*24*3600*100 ),
        httpOnly: true,
    })
    if (ismatch) {
        res.status(201).json({
            message: "Login Succesfully",
            status: 201
        })
    } else {
        res.status(400).json({
            message: "Try Again For Login",
            status: 400
        })
    }
};

exports.userLogins = async (req, res) => {
    console.log(req.cookies.jwt);
    await chapter.findOne({ username: req.body.username }).then(data =>{ res.send(data) })
    console.log("user");  
}

exports.userLogout = async (req, res) => {
    try {
               res.clearCookie("jwt");
        // console.log(ismatch);
        res.status(201).json({
            message: "Logout Succesfully",
            status: 201
        })
        
    } catch (error) {
        res.status(404).json({
            message: "Token Not Match",
            status: 404,
        });
    }
};