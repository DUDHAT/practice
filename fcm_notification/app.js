var FCM = require('fcm-node');
var express = require('express');
var serverKey = 'AAAAWMH3m64:APA91bFMMxn1tpPs5XbVoEZnLvELKnATBQ2Hd_Qp6p6SR8zja8q3cpAu0JP17ZwYYcia-P4uX2XC4tQqK3UFm93rPobJVELuc8Pv4YizXgHB6_r7LZDWnznakO2TNwQrQe9DZEca55SL';
// var fcm = new FCM(serverKey);
const topicName = 'industry-tech';

var app = express();
var port = 3000;
app.listen(3000,()=>{
  console.log('listening on port',port);
})

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.post("/fcm",(req,res,next)=>{
  try{
    var fcm = new FCM(serverKey);
    let message = {
      to:'eRtmAoLJRiqf2uyGDeT0eR:APA91bEskWQSwP2FDYPJnBUUmyeTmpQ11WrfJJMLfVAHPypGxzreebaXcYfpmyrPjRqb99qrfSJVLUSAnaAFBmnm6WFNtO8Eg0OAK4ImjWsdjFebZaDkF9tjaJWUn8-HKwlc1Ezufqic',
      notification :{
        title: 'NotifcatioTestAPP',
        image:"https://picsum.photos/200/300",
        body:"hello",
        sound :"default",
        "click_action":"FCM_PLUGIN_ACTIVITY",
        "icon":"fcm_push_icon",
      }
    }
  fcm.send(message, function(err, response) {
    if (err) {
        console.log("Something has gone wrong!"+err);
        console.log("Respponse:! "+response);
        
    } else {
        // showToast("Successfully sent with response");
        console.log("Successfully sent with response: ", response);
        res.send("hello")
    }

});
  }catch(error){
    next(error);
  }

})


// var message = {
// to:'eRtmAoLJRiqf2uyGDeT0eR:APA91bEskWQSwP2FDYPJnBUUmyeTmpQ11WrfJJMLfVAHPypGxzreebaXcYfpmyrPjRqb99qrfSJVLUSAnaAFBmnm6WFNtO8Eg0OAK4ImjWsdjFebZaDkF9tjaJWUn8-HKwlc1Ezufqic',
    // notification: {
    //     title: 'NotifcatioTestAPP',
    //     // body: 'helloworld',
    //     imageURL:"https://picsum.photos/200/300",
    //     imageUrl:"https://picsum.photos/200/300",
    // },

    // data: { //you can send only notification or only data(or include both)
    //     title: 'ok cdfsdsdfsd',
    //     body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}',
    //     imageURL:"https://i.picsum.photos/id/109/200/300.jpg?hmac=wtAwGwuVC3CUO3okhkSJZKm-wZY_evzXIo1F46OtKKo",
    //     imageUrl:"https://i.picsum.photos/id/109/200/300.jpg?hmac=wtAwGwuVC3CUO3okhkSJZKm-wZY_evzXIo1F46OtKKo",

    // }
    
    // notification: {
    //     title: 'Sparky says hello!'
    //   },
    //   android: {
    //     notification: {
    //       imageUrl: 'https://foo.bar.pizza-monster.png'
    //     }
    //   },
    //   apns: {
    //     payload: {
    //       aps: {
    //         'mutable-content': 1
    //       }
    //     },
    //     fcm_options: {
    //       image: 'https://foo.bar.pizza-monster.png'
    //     }
    //   },
    //   webpush: {
    //     headers: {
    //       image: 'https://foo.bar.pizza-monster.png'
    //     }
    //   },
    //   topic: topicName,

// };


// fcm.send(message, function(err, response) {
//     if (err) {
//         console.log("Something has gone wrong!"+err);
//         console.log("Respponse:! "+response);
//     } else {
//         // showToast("Successfully sent with response");
//         console.log("Successfully sent with response: ", response);
//     }

// });



// var message = {
//   to:'eRtmAoLJRiqf2uyGDeT0eR:APA91bEskWQSwP2FDYPJnBUUmyeTmpQ11WrfJJMLfVAHPypGxzreebaXcYfpmyrPjRqb99qrfSJVLUSAnaAFBmnm6WFNtO8Eg0OAK4ImjWsdjFebZaDkF9tjaJWUn8-HKwlc1Ezufqic',

// }