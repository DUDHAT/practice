const addproducts = require("./model/add-product")
const userModel = require("./model/model")
const excels = require("./model/xlsx");
var formidable = require('formidable');
const mongoose = require("mongoose")
const express = require("express");
var csv = require('csvtojson');
const stripe = require('stripe')( "sk_test_51LhSStF7Oyd8f6nhjbCM4ahNcHYXREKSrA8fmBJ2f70yV24afLDKo9zSXHylW3KAS9BEa3Pz4Zh8fHZpUHjQWhOP00fdzbeype")
const app = express();
// var http = require('http').Server(app);
// var io = require('socket.io')(http)
let multer = require('multer');
const {v4 : uuidv4} = require('uuid')
const cookieParser = require("cookie-parser");
const session  = require('express-session');
// console.log("process.env.STRIPE_SECRET_KEY",process.env.STRIPE_SECRET_KEY)
var csrf = require('csurf');
// var xlsx = require("xlsx");
// var session = require('client-sessions');
const bcrypt = require('bcrypt');
var FCM = require('fcm-node');
var SERVER_KEY = 'AAAAWMH3m64:APA91bFMMxn1tpPs5XbVoEZnLvELKnATBQ2Hd_Qp6p6SR8zja8q3cpAu0JP17ZwYYcia-P4uX2XC4tQqK3UFm93rPobJVELuc8Pv4YizXgHB6_r7LZDWnznakO2TNwQrQe9DZEca55SL';
var fcm_tokens = ["dDgGFa1AT9-uM9182itLQ_:APA91bF1lL0YV-a_9KUtPPRqzLHRLu7wQ-tAqACjTtU4XqN57AOJhSX3Lxho33DQkJku_eiC_BHXHPIFAp4TqEPKCndyDilOETiOnXgZ5hAuqToB31fwyapiEXRoL4L4TCMaMnLOOuKP","dFAgcpVLWk3gi42936OL7Y:APA91bGyzXsgbO-kRhj6N6PYsm_2NvDhKaN03cmUX6gXkEMD4K9i5V3wziyTeeWpY5NC7RZfBUXYTNlmfT7335FsGB4Tz9wD_NTEPnSNrceHOX0tWrlo6RBfXDrYKi45AH2Vtz-wgouT"];
// const formData = require('express-form-data');
const bodyparser = require('body-parser')
const { parse } = require("json2csv");
var XLSX = require('xlsx');
let fs = require('fs');
let path = require('path');
let dir = './uploads';
const ejs = require("ejs");

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

app.use(express.json())

app.use(express.static('public'));
app.use(express.static('file'));
app.use(express.static('uploads'));
app.set('view engine', 'ejs')


const register = require("./router/router");
app.use("/register",register);

const isAuth = (req, res, next) => {
  if (req.session.userId) {
      next();
      // res.redirect("/dashboard")
      // res.setHeader('Content-Type', 'application/json');
  } else {
      req.session.error = "You have to Login first";
      // console.log("false");
      res.redirect("/");
      // res.setHeader('Content-Type', 'application/json');

  }
}

app.get("/notifiction",isAuth,(req,res)=>{
  res.render("notifiction");
})

app.get("/main",(req,res)=>{
  addproducts.find().then(data => {
    res.render('main', {
      user: data
  })
  })
})

app.get("/views/:id",(req,res)=>{
  addproducts.findById({_id: req.params.id}).then(data => {
    res.render('views',{users: data}) 
  // console.log(data.image[0]) 
});
  // var e = req.body
  // console.log(e);

})

app.post("/fcm", async(req, res,next) => {
  try {
      const fcm = new FCM(SERVER_KEY);
      // console.log(req.body.to);
      const message = {
              registration_ids: fcm_tokens,
              collapse_key: "TEST",
              notification: {
                  title: req.body.title,
                  body: req.body.message,
                  sound: "defualt",
                  image:"https://picsum.photos/200/300",
                  delivery_receipt_requested: true
              },
              data: {
                  message: "hello"
              }
          }
      console.log("message:", message);

      fcm.send(message, (err, response) => {
          if (err) {
              console.log(err);
          } else {
            console.log("Successfully sent with response: ", response);
            res.redirect("/notifiction");
          }
      })
  } catch (error) {
      next(error)
  }
})

app.get("/a",isAuth,(req,res)=>{
  res.render("a");
})

app.get("/sidebar",isAuth,(req,res)=>{
  res.render("sidebar");
})

app.get("/sidebar1",isAuth,(req,res)=>{
  res.render("sidebar1");
})

app.get("/cart",(req,res)=>{
  addproducts.find({product_f:1}).then(data =>{ 
    res.render('cart', {
      user: data
    })
  })
})

app.post("/addtocart",(req,res)=>{
  console.log(req.body);
  addproducts.updateOne({ _id: req.body.submit}, {$set: {product_f: 1}}).then(data => console.log(data))
  res.redirect("cart");
// })
})

app.get('/',(req, res) => {
  // console.log("login",req.session.userId)
    if(req.session.userId){
      res.redirect('/index')
    }
    else{
    res.render('login');
    }
})

app.get("/register",(req,res)=>{
  if(req.session.userId){
    res.redirect('/index')
  }
  else{
    res.render('register')
  }
})

app.get("/Logout",(req,res)=>{
  console.log("hello");
        req.session.destroy((err) => {
          if (err) throw err;
          res.redirect("/");
      });
})

app.get("/payment/:id",(req,res)=>{
  addproducts.findById({_id: req.params.id}).then(data => {
    res.render('payment',{user : data})
   })
  // addproducts.find().then(data => {
  //   res.render('payment', {
  //     user: data
  // })
  // })
  // res.render("payment");
})

app.get("/show",isAuth,(req,res)=>{
  addproducts.find().then(data => {
    res.render('show', {
      user: data
  })
  })
})

app.get("/index",isAuth,(req,res)=>{
  if(req.session.userId){

    addproducts.find().then(data => {
      res.render('index', {
        user: data
    })
    })
  }
  else{
    res.redirect("/");
  }
})

app.get("/projects",(req,res)=>{
    res.render('projects');
})

app.get("/contacts",isAuth,(req,res)=>{
  if(req.session.userId){
    excels.find().then(data => {
    // console.log(data)
    // res.render('contacts')
    res.render('contacts', {
      user: data
     })
  })
}
else{
  res.redirect("/");
}
})

let upload = multer({
  storage: multer.diskStorage({

    destination: (req, file, callback) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      callback(null, './uploads');
    },
    filename: (req, file, callback) => { callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); }

  }),

  fileFilter: (req, file, callback) => {
    let ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.xlsx' && ext !== '.csv') {
      return callback(/*res.end('Only images are allowed')*/ null, false)
    }
    callback(null, true)
  }
});

app.post("/contact",(req,res)=>{
  var wb = XLSX.utils.book_new(); //new workbook
  excels.find((err,data)=>{
      if(err){
          console.log(err)
      }else{
          var temp = JSON.stringify(data);
          temp = JSON.parse(temp);
          var ws = XLSX.utils.json_to_sheet(temp);
          var down = __dirname+'/uploads/exportdata+i$uuidv4().xlsx'
         XLSX.utils.book_append_sheet(wb,ws,"sheet1");
        //  console.log(down)
         var filename = path.basename(down);
          // console.log(uuidv4()+".xlsx")
          var directories = path.dirname(down);
          var downs =directories+"/"+uuidv4()+".xlsx"
          // console.log("down",downs);
          // path.join('Users', 'Refsnes', 'demo_path.js')
         XLSX.writeFile(wb,downs);
         res.download(downs);
      }
  });
})

app.get("/iframe-dark",isAuth,(req,res)=>{
  addproducts.find().then(data => {
    res.render('iframe-dark', {
      user: data
  })
  })
})

// app.post("/payments",async (req,res)=>{
//   stripe.customers.create({

//     email: req.body.stripeEmail,
//     source: req.body.stripeToken,
// })
// .then((customer) => {

//     return stripe.charges.create({
//         amount: 579, // Charing Rs 25
//         description: 'buy keyboard',
//         currency: 'USD',
//         customer: customer.id
//     });
// })
// .then((charge) => {
//     // console.log(charge);
//     res.redirect("/stripe") // If no error occurs
// })
// .catch((err) => {
//     res.send(err) // If some error occurs
// });
// })

app.get("/payment_failed",isAuth,(req,res)=>{
  res.render("payment_failed");
})

app.post("/payments",async (req,res)=>{
  console.log(req.body);
  const token = await createToken(req.body);
    if (token.error) {
        //req.flash('danger', token.error)
        console.log("Payment failed1.")
        return res.redirect('/payment_failed');
    }
    if (!token.id) {
        //req.flash('danger', 'Payment failed.');
        console.log("Payment failed2.")
        return res.redirect('/payment_failed');
    }
    console.log( req.body.submit);
    const charge = await createCharge(token.id, req.body.submit);
    if (charge && charge.status == 'succeeded') { 
      //  req.flash('success', 'Payment completed.');
      console.log(charge.receipt_url);
      //  res.render(charge.receipt_url);
      //  console.log("Payment completed")

    } else {
      //  req.flash('danger', 'Payment failed.');
       console.log("Payment failed.")
       return res.redirect('/payment_failed');
    }
    return res.redirect(charge.receipt_url);
})

const createToken = async (cardData) => {
  // console.log("hello",cardData.cardNumber)
  let token = {};
  try {
      token = await stripe.tokens.create({
          card: {
              number: cardData.cardNumber,
              exp_month: cardData.month,
              exp_year: cardData.year,
              cvc: cardData.cvv
          }
      });
      // console.log("token=:",token);
  } catch (error) {
    console.log(error)
      switch (error.type) {
          case 'StripeCardError':
              token.error = error.message;
              break;
          default:
              token.error = error.message;
              break;
      }
  }
  // console.log(token);
  return token;
}

const createCharge = async (tokenId, amount) => {
  // console.log(amount);
  let charge = {};
  try {
      charge = await stripe.charges.create({
          amount: amount*100,
          currency: 'USD',
          source: tokenId,
          description: 'My Payment'
      });
      // console.log("charge",charge);
  } catch (error) {
      charge.error = error.message;
  }
  // console.log(charge)
  return charge;
}

app.get("/csv",isAuth,(req,res)=>{
  if(req.session.userId){
    excels.find().then(data => {
    // console.log(data)
    // res.render('contacts')
    res.render('csv', {
      user: data
     })
  })
}
else{
  res.redirect("/");
}
})

app.get("/edit/:id",isAuth,(req,res)=>{
   addproducts.findById({_id: req.params.id}).then(data => {
    res.render('edit',{product : data})
   })
})

app.get('/delete/:id',isAuth,(req,res)=>{
  var id = req.params.id
 console.log("b",id)
  addproducts.deleteOne({ _id: id }).then(data =>  res.redirect("/index"));
})
                                                                                                                            
app.get("/view/:id",isAuth,(req,res)=>{
        addproducts.findById({_id: req.params.id}).then(data => {
          res.render('view',{users: data}) 
        console.log(data.image[0]) 
      });
        var e = req.body
        console.log(e);

})

app.get("/project-add",isAuth,(req,res)=>{
    res.render('project-add');
})

app.post("/import",upload.any(),(req,res)=>{
//  res.send("hello world");
 var workbook =  XLSX.readFile(req.files[0].path);
        var sheet_namelist = workbook.SheetNames;
        var x=0;
        sheet_namelist.forEach(element => {
            var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
            excels.insertMany(xlData,(err,data)=>{
                if(err){
                    console.log(err);
                }else{
                    // console.log(data);
                }
            })
            x++;
        });
        res.redirect('/contacts');
})

app.post("/imports",upload.any(),(req,res)=>{
  console.log(req.files);
  //  res.send("hello world");
  csv()
  .fromFile(req.files[0].path)
  .then((jsonObj)=>{
       excels.insertMany(jsonObj,(err,data)=>{
              if(err){
                  console.log(err);
              }else{
                  res.redirect('/csv');
              }
       });
     });
  })

app.post("/exports",(req,res)=>{
try{
  excels.find({},( err,post)=>{
    const fields = ['name', 'class', 'subject'];
    const opts = { fields };
    
      const csv = parse(post, opts);
      fs.writeFile(`./uploads/csv-${Date.now()}.csv`, csv, function(error) {
          if (error) {
              console.log(error);
          }
          // console.log("opts",opts);
          // csv.download = "csvfile.csv";
          // res.download(csv);
          res.redirect("/csv");
          console.log("csv successfully",csv);
      })
  
  })
}
catch{
  console.log(error);
}
})

app.post('/upload', upload.any(), (req, res) => {
    if (!req.body && !req.files) {
      res.json({ success: false });
    } 
    else {
        var e = req.body
        console.log(e);
        var arr = []
        let a = req.files
        console.log(a);
        for(var i=0;i<a.length;i++)
        {
            arr.push(req.files[i].filename)
        }
        let detail =  addproducts ({
          product_name:req.body.product_name,
          product_description:req.body.product_description,
          product_status:req.body.product_status,
          product_quantity:req.body.product_quantity,
          product_price:req.body.product_price,
          image: arr
        });
        detail.save((err)=>{
             if (err)
             {
                console.log(err);
             }
             else
            {
              res.redirect("/index");
            }
        })
    }
  });

app.post('/uploads/:id', upload.any(), (req, res) => {
    if (!req.body && !req.files) {
      res.json({ success: false });
    } 
    else {
      var id = req.params.id
   console.log("b",id);
        var e = req.body
        console.log("hello",e);
        var arr = []
        let a = req.files
        for(var i=0;i<a.length;i++)
        {
            arr.push(req.files[i].filename)
            console.log(arr);
        }
        var ass = []
        ass.push(req.body.imagename)
        if(arr.length == 0 ){
          console.log("arr null")
        addproducts.updateOne({ _id: id }, {$set: {product_name: req.body.product_name,product_description:req.body.product_description,product_status:req.body.product_status,product_quantity:req.body.product_quantity,product_price:req.body.product_price}}).then(data => res.redirect("/index"))
        }
        else{
          console.log("arr")
          addproducts.updateOne({ _id: id }, {$set: {product_name: req.body.product_name,product_description:req.body.product_description,product_status:req.body.product_status,product_quantity:req.body.product_quantity,product_price:req.body.product_price,image : arr}}).then(data => res.redirect("/index")) 
        }
    }
  });
 
const port = 5151 || process.env.port;

app.listen(port,()=>{
    console.log(`listing port : ${port}`)
});



