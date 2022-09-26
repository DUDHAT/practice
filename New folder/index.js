const cron = require("node-cron");
const express = require("express");
const nodemailer = require("nodemailer");
  
app = express();
  
// Calling sendEmail() function every 1 minute
cron.schedule("*/1 * * * *", function() {
sendMail();
});
// const intervalID = setInterval(sendMail, 60000)
// Send Mail function using Nodemailer
function sendMail() {
    let mailTransporter =  nodemailer.createTransport({
        host: 'sg2plzcpnl490081.prod.sin2.secureserver.net',
        port: 465,
        ENCRYPTION:'ssl',
        auth: {
            user: '_mainaccount@weappdeveloper.com', // generated ethereal user
            pass: 'Hardik@7484'  // generated ethereal password
        },
        tls:{
          rejectUnauthorized:false
        }
      });
      
    // Setting credentials
    let mailDetails = {
        from: '_mainaccount@weappdeveloper.com',
        to: "dmdudhat.weapplinse@gmail.com",
        subject: "Test mail using Cron job",
        text: "Node.js cron job email"
           + " testing for GeeksforGeeks"
    };
      
      
    // Sending Email
    mailTransporter.sendMail(mailDetails, 
                    function(err, data) {
        if (err) {
            console.log("Error Occurs", err);
        } else {
            console.log("Email sent successfully");
        }
    });
}
  
app.listen(3000,()=>{
    console.log("server started");
});
// const Cryptr = require('cryptr');
// const cryptr = new Cryptr('myTotalySecretKey');
// let email = "some@mail.com";
// let encryptdEmail = cryptr.encrypt(email);
// console.log("Decrypted email = ", cryptr.decrypt(encryptdEmail ))