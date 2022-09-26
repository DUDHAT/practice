const express = require('express');
const bodyParser = require('body-parser');

// const exphbs = require('express-handlebars');
const arr = [1,2,3];
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// View engine setup
var exphbs = require('express-handlebars');

app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: "contact"}));
app.set('view engine', '.hbs');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('contact');
});


app.post('/send', (req, res) => {
  console.log(req.body)
  // var ae = req.body
  // var a = function(ae){
  //   arr.push(ae)
  //   // console.log(ae)
  //   return ae
  // }
  // a(ae);
  // exports.arr
  // console.log(arr);
  const output = `
  <div class="wrapper animated bounceInLeft">
      <div class="company-info">
       
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL_ABzQWtLgBhwlaynBdhe92fWhTB8HGCQ2A&usqp=CAU" width="300" height="400"> 
      </div>
      <div class="contact">
        <h3>Email Us</h3>
        
       
          <p>
            <label>Name : ${req.body.name}</label>
          </p>
          <p>
            <label>Company : ${req.body.company}</label>
          </p>
          <p>
            <label>Email Address :${req.body.email}</label>
          </p>
          <p>
            <label>Phone Number : ${req.body.phone}</label>
          </p>
          <p class="full">
            <label>Message : ${req.body.message}</label>
           
          </p>
      </div>
    </div>
    
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
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

  // setup email data with unicode symbols
  let mailOptions = {
      from: '_mainaccount@weappdeveloper.com', // sender address
      to: req.body.email, // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };
  // res.send(req.body)
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      // console.log('Message sent: %s', info.messageId);   
      // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      // res.render('contact', {msg:'Email has been sent'});
  });
  });
  // console.log(arr);

app.listen(3000, () => console.log('Server started...'));