import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// import { seedDatabase } from "../seed";

// here we will import  seed database value

const config = {
  apiKey: "AIzaSyBOdHUo0Q_I1EFuV0r-ozNpJjUgYb2nxfs",
  authDomain: "instagram-react-8710b.firebaseapp.com",
  projectId: "instagram-react-8710b",
  storageBucket: "instagram-react-8710b.appspot.com",
  messagingSenderId: "758165353154",
  appId: "1:758165353154:web:af724960bd0009ce3c415b",
};
const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// console.log("firebase", firebase);

// for 1 time seed database call

export { firebase, FieldValue };
// seedDatabase(firebase);
