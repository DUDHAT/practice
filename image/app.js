const express = require('express');
const app = express();
const storage = require('@google-cloud/storage');
const Multer = require('multer');

const admin=require('firebase-admin');


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

// const gcs = storage({
//   projectId: "crud-32c2f",
//   type: "service_account",
//   keyFilename:serviceAccount
// });

const bucket =admin.storage().bucket("crud-32c2f.appspot.com") 

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});

app.listen(3000, () => {
  console.log('App listening to port 3000');
});

/**
 * Adding new file to the storage
 */
app.post('/upload', multer.single('file'), (req, res) => {
//   console.log('Upload Image');

  let file = req.file;
  if (file) {
    uploadImageToStorage(file).then((success) => {
        res.send({ status: true, responsecode: 1,"message":"upload successfully"})
        // { status: true, responsecode: 1, "message": "data successfully inserted.",
    //   res.status(200).json({
    //     status: 'success'
    //   });
    }).catch((error) => {
      console.error(error);
    });
  }
});

/**
 * Upload the image file to Google Storage
 * @param {File} file object that will be uploaded to Google Storage
 */
const uploadImageToStorage = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No image file');
    }
    let newFileName = `${file.originalname}_${Date.now()}`;

    let fileUpload = bucket.file(newFileName);
    // console.log(bucket)
    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    blobStream.on('error', (error) => {
      reject('Something is wrong! Unable to upload at the moment.');
    });

    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
      resolve(url);
    });
   
    blobStream.end(file.buffer);
   
  });
}