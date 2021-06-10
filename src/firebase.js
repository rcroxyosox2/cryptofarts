import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyBe44U9SQMYvatdD2jCnFgJLn2V0bd0ptY",
  authDomain: "cryptofarts-b14a8.firebaseapp.com",
  projectId: "cryptofarts-b14a8",
  storageBucket: "cryptofarts-b14a8.appspot.com",
  messagingSenderId: "818104446854",
  appId: "1:818104446854:web:c08cdd0981f58dee91c607",
  measurementId: "G-ZQP28XFYRB"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
