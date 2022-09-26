const { initializeApp } = require("@firebase/app");
const { getStorage } = require("@firebase/storage");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2MTk86p3H0Gvc85XZFkZdRHWLIxb3FBc",
  authDomain: "crud-32c2f.firebaseapp.com",
  databaseURL: "https://crud-32c2f-default-rtdb.firebaseio.com",
  projectId: "crud-32c2f",
  storageBucket: "crud-32c2f.appspot.com",
  messagingSenderId: "123687039680",
  appId: "1:123687039680:web:a1d055c616f629ee30b325",
};

const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
module.exports = getStorage(firebaseApp);