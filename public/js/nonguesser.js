
// nonguesser.js

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB0lvb0taAemlGk0eseaW95JL9R3LnKXP0",
    authDomain: "motpal-d9cbc.firebaseapp.com",
    databaseURL: "https://motpal-d9cbc.firebaseio.com",
    projectId: "motpal-d9cbc",
    storageBucket: "motpal-d9cbc.appspot.com",
    messagingSenderId: "422524865236",
    appId: "1:422524865236:web:0b5c246ebe01db7b240941",
    measurementId: "G-TZPC6MQ7JK"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const thisUsersEntry = document.getElementById("article-name");
const sendButton = document.getElementById("send-button");


function app() {

}

window.onload = app;