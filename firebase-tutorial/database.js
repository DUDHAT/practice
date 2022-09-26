const admin=require('firebase-admin');
const isSet = require("isset");

var serviceAccount = require('./admin.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    apiKey: "AIzaSyB2MTk86p3H0Gvc85XZFkZdRHWLIxb3FBc",
  authDomain: "crud-32c2f.firebaseapp.com",
  databaseURL: "https://crud-32c2f-default-rtdb.firebaseio.com",
  projectId: "crud-32c2f",
  storageBucket: "crud-32c2f.appspot.com",
  messagingSenderId: "123687039680",
  appId: "1:123687039680:web:a1d055c616f629ee30b325"
  });

var db=admin.database();
var userRef=db.ref("users");

const userOperation={
    addUser(obj,res){
        var no = obj.roll
        var stemp = /^[0-9]*\.?[0-9]*$/
        if(!isSet(no)){
            res.send(JSON.stringify({"message": "pls enter grno ",status: false,responsecode: 0}))
            return
        }
        if(no == ' ' ||  !no.match(stemp))
        {
            res.send(JSON.stringify({"message": "pls enter valid grno",status: false,responsecode: 0}))
            return;
        }
        var oneUser=userRef.child(obj.roll);
        console.log(obj)
        var alfa = /^[a-zA-Z()]+$/
        var firstname = obj.name
        var stemp = /^[0-9]*\.?[0-9]*$/
        var salary = obj.grno
        if(!isSet(firstname)){
            res.send({data: "pls enter name",status: false,responsecode: 0})
            return;
        }
        if( firstname == ' ' ||  !firstname.match(alfa)  ){
            res.send({data: "pls enter valid name",status: false,responsecode: 0})
            return;
        }
        if(!isSet(salary)){
            res.send(JSON.stringify({data: "pls enter grno ",status: false,responsecode: 0}))
            return
        }
        if(salary == ' ' ||  !salary.match(stemp))
        {
            res.send(JSON.stringify({data: "pls enter valid grno",status: false,responsecode: 0}))
            return;
        }
        oneUser.update(obj,(err)=>{
            if(err){
                res.status(300).json({"msg":"Something went wrong","error":err});
            }
            else{
                res.status(200).json({"msg":"user created sucessfully",status: true,responsecode: 1});
            }
        })
    },
    demoUser(obj,res){
        var userRefdemo=db.ref("users");
        var no = obj.roll
        var stemp = /^[0-9]*\.?[0-9]*$/
        if(!isSet(no)){
            res.send(JSON.stringify({"message": "pls enter grno ",status: false,responsecode: 0}))
            return
        }
        if(no == ' ' ||  !no.match(stemp))
        {
            res.send(JSON.stringify({"message": "pls enter valid grno",status: false,responsecode: 0}))
            return;
        }
        var oneUser=userRefdemo.child(obj.roll);
        var alfa = /^[a-zA-Z()]+$/
        var firstname = obj.name
        var salary = obj.grno
        if(!isSet(firstname)){
            res.send({"message": "pls enter name",status: false,responsecode: 0})
            return;
        }
        if( firstname == ' ' ||  !firstname.match(alfa)  ){
            res.send({"message": "pls enter valid name",status: false,responsecode: 0})
            return;
        }
        if(!isSet(salary)){
            res.send(JSON.stringify({"message": "pls enter grno ",status: false,responsecode: 0}))
            return
        }
        if(salary == ' ' ||  !salary.match(stemp))
        {
            res.send(JSON.stringify({"message": "pls enter valid grno",status: false,responsecode: 0}))
            return;
        }
        console.log(obj)
        oneUser.push(obj,(err)=>{
            if(err){
                res.status(300).json({"message":"Something went wrong","error":err});
            }
            else{
                res.status(200).json({"message":"user created sucessfully",status: true,responsecode: 1});
            }
        })
    },
    getUsers(res){
        userRef.once('value',function(snap){
            console.log(snap.val())
            res.status(200).json({"users":snap.val()});
        })
    },
    getOneUser(obj,res){
        var userRefdemo=db.ref("users");
        var no = obj.roll
        var stemp = /^[0-9]*\.?[0-9]*$/
        if(!isSet(no)){
            res.send(JSON.stringify({"message": "pls enter roll ",status: false,responsecode: 0}))
            return
        }
        if(no == ' ' ||  !no.match(stemp))
        {
            res.send(JSON.stringify({"message": "pls enter valid roll",status: false,responsecode: 0}))
            return;
        }
        var oneUser=userRefdemo.child(obj.roll);
        oneUser.once('value',function(snap){
            res.status(200).json({"user":snap.val()});
        })
    },
    deleteUser(obj,res){
        var userRefdemo=db.ref("users");
        var no = obj.roll
        var stemp = /^[0-9]*\.?[0-9]*$/
        if(!isSet(no)){
            res.send(JSON.stringify({"message": "pls enter roll ",status: false,responsecode: 0}))
            return
        }
        if(no == ' ' ||  !no.match(stemp))
        {
            res.send(JSON.stringify({"message": "pls enter valid roll",status: false,responsecode: 0}))
            return;
        }
        var oneUser=userRefdemo.child(obj.roll);
        oneUser.remove().then((err)=>{
            if(err){
                res.status(300).json({"msg":"Something went wrong","error":err});
              
            }
            else{
                res.status(200).json({"msg":"user deleted sucessfully"});
                // console.log("data",data)
            }

        })
    }
}

module.exports=userOperation;