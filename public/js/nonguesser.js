
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
const reloadButton = document.getElementById("reload-button");
const hideButton = document.getElementById("hide-button");
let hidden = false;

const wikiPage = document.getElementById('random-wikipedia');


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

    fb.on("value", updateArticleNameList);
    fb1.on("value", highlightSelectedArticle)

    thisUsersEntry.addEventListener("input", updateMyArticleName);

    sendButton.addEventListener("click", sendRandomArticle);

    reloadButton.addEventListener("click", reloadWiki);

    hideButton.addEventListener("click", toggleHidden);


    function updateMyArticleName(e) {
        myUpdate = {};

        myUpdate.name = thisUsersEntry.value;

        try {
            fb.child(user.uid).set(myUpdate);
        } catch (error) {
            
        }
    }

    function updateArticleNameList(received) {
        
        let retrieved = received.val();

        articleNameField.innerHTML = "";

        for (let key in retrieved) {
            let articleName = retrieved[key].name;
            articleNameField.innerHTML += "<h4 class=\"grey-text text-darken-1\" style=\"font-style:italic;\">" + articleName + "</h4>";
        }
    }

    function sendRandomArticle(e) {
        
        let listOfArticleNames = articleNameField.childNodes;

        let rand = Math.floor(Math.random() * listOfArticleNames.length);
        console.log(rand);
        let selected = listOfArticleNames[rand];
        console.log(selected);
        
        let sel = {}
        sel.selectedArticle = selected.innerHTML;

        fb1.set(sel);
    }

    function highlightSelectedArticle(received){

        let retrieved = received.val();
        let listOfArticleNames = articleNameField.childNodes;

        let selected;
        for (let i = 0 ; i < listOfArticleNames.length ; i++) {
            if(listOfArticleNames[i].innerHTML == retrieved["selectedArticle"]) {
                selected = listOfArticleNames[i];
                selected.classList.remove("grey-text");
                selected.classList.add("green-text");
                setTimeout(function () { 
                    selected.classList.remove("green-text");
                    selected.classList.add("grey-text");
                }, 3000);
                break;
            }
        }
    }

    function clear() {
        try {
            fb.child(user.uid).remove();
        } catch (e) {
        }
    }

    function reloadWiki() {
        wikiPage.src = wikiPage.src;
    }

    function toggleHidden(e) {
        if(hidden){
            hidden = false;
            wikiPage.height = "500";
            hideButton.innerHTML = "hide<i class=\"material-icons right\">arrow_upward</i>";
        }
        else{
            hidden = true;
            wikiPage.height = "1";
            hideButton.innerHTML = "reveal<i class=\"material-icons right\">arrow_downward</i>";
        }
    }

    window.addEventListener("unload", clear);
}