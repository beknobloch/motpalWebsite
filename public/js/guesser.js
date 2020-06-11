
// guesser.js

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


const yourWordHeader = document.getElementById("your-word-header");
const yourWord = document.getElementById("your-word");



function app() {
    
    let fb = firebase.database().ref("chosen-article");

    fb.on("value", updateWord);

    function updateWord(received){
        try{
            let sel = received.val()["selectedArticle"];
            if(sel != ""){
                yourWordHeader.innerHTML = "The article's name:";
                yourWord.innerHTML = received.val()["selectedArticle"];
            }
            else{
                clear();
            }
        }catch(error){
            clear();
        }
    }

    function clear(){
        yourWordHeader.innerHTML = "Waiting for article title...";
        yourWord.innerHTML = "";
        try {
            fb.child("selectedArticle").remove();
        } catch (e) {
        }
    }

    window.addEventListener("unload", clear);

}


window.onload = app;