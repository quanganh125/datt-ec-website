import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAiGSrScywYI_b1b4FMsGbVZ06LToz6H_0",
    authDomain: "itss-japanese-2-42948.firebaseapp.com",
    databaseURL: "https://itss-japanese-2-42948-default-rtdb.firebaseio.com",
    projectId: "itss-japanese-2-42948",
    storageBucket: "itss-japanese-2-42948.appspot.com",
    messagingSenderId: "940337418912",
    appId: "1:940337418912:web:62992f9b6e546103f06fc5",
    measurementId: "G-FGJRXFYP0L",
};

firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();

export default storage;
