import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAYBIMR09S3F-30m3E5XxAK7nNRgdkNcak",
    authDomain: "test-eeb45.firebaseapp.com",
    databaseURL: "https://test-eeb45.firebaseio.com",
    projectId: "test-eeb45",
    storageBucket: "test-eeb45.appspot.com",
    messagingSenderId: "959491208426",
    appId: "1:959491208426:web:1ee2f09f8e75bcdb14d393",
    measurementId: "G-3V7R6HZ1MN",
};

firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();

export default storage;
