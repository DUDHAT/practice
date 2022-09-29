const admin = require("firebase-admin");
let serviceAccount = require("./admin.json");

const admins = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  apiKey: "AIzaSyB2MTk86p3H0Gvc85XZFkZdRHWLIxb3FBc",
  authDomain: "crud-32c2f.firebaseapp.com",
  databaseURL: "https://crud-32c2f-default-rtdb.firebaseio.com",
  projectId: "crud-32c2f",
  storageBucket: "crud-32c2f.appspot.com",
  messagingSenderId: "123687039680",
  appId: "1:123687039680:web:a1d055c616f629ee30b325",
});

const GOOGLE_CLIENT_ID =
  "130652274525-2007t725q258s9nak2neqbqehkim2tl5.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

module.exports = {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  admins,
};
