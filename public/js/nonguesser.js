
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
const articleNameField = document.getElementById("article-name-field");
const sendButton = document.getElementById("send-button");


firebase.auth().signInAnonymously().catch(function (e) { console.log(e) });

firebase.auth().onAuthStateChanged(stateChange);

function stateChange(user) {
    if(user){
        app(user);
    }
    else{
        console.log("signed-out")
    }
}

function app(user) {
    
    let fb = firebase.database().ref("list-of-article-names");
    let fb1 = firebase.database().ref("chosen-article");

    fb.onWrite(updateArticleNameList);

    thisUsersEntry.addEventListener("input", updateMyArticleName);

    sendButton.addEventListener("click", sendRandomArticle);


    function updateMyArticleName(e) {
        myUpdate = {};

        myUpdate.name = thisUsersEntry.value;

        fb.child(user.uid).set(myUpdate);
    }

    function updateArticleNameList(received) {
        
        let retrieved = received.val();

        articleNameField.innerHTML = "";

        for (let key in retrieved) {
            let articleName = retreived[key].name;
            articleNameField.innerHTML += "<h4 class=\"grey-text text-darken-1\" style=\"font-style:italic;\">" + articleName + "</h4><br>";
        }
    }

    function sendRandomArticle(e) {
        
        let listOfArticleNames = articleNameField.childNodes;

        let rand = Math.floor(Math.random() * listOfArticleNames.length);
        let selected = listOfArticleNames[rand];
        selected.classList.add("green-text");

        fb1.set(selected);
    }

    function clear() {
        try {
            fb.child(user.uid).remove();
        } catch (e) {
            console.log(e);
        }
    }

    window.onunload = clear;
}

window.onload = app;

