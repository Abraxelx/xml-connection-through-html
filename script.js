
var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = "http://code.jquery.com/jquery-2.2.1.min.js";

// Then bind the event to the callback function.
// There are several events for cross browser compatibility.
script.onreadystatechange = handler;
script.onload = handler;

// Fire the loading
head.appendChild(script);

function handler(){
  console.log('jquery added :)');
}


const btnHam = document.querySelector('.ham-btn');
const btnTimes = document.querySelector('.times-btn');
const navBar = document.getElementById('nav-bar');
var twitter = [];
var ms = [];
var gradle = [];
var kubs = [];


btnHam.addEventListener('click', function(){
    if(btnHam.className !== ""){
        btnHam.style.display = "none";
        btnTimes.style.display = "block";
        navBar.classList.add("show-nav");
    }
})

btnTimes.addEventListener('click', function(){
    if(btnHam.className !== ""){
        this.style.display = "none";
        btnHam.style.display = "block";
        navBar.classList.remove("show-nav");
    }
})
function loadXMLDoc() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        getXML(this);
    }
  };
  xmlhttp.open("GET", "xml/news.xml", true);
  xmlhttp.send();
}


function getXML(xml) {
  var xmlDoc = xml.responseXML;
  var x = xmlDoc.getElementsByTagName("item");
    twitter.title = x[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    $('#tweetTitle').text(twitter.title);
    twitter.altTitle = x[0].getElementsByTagName("altTitle")[0].childNodes[0].nodeValue;
    $('#tweetAltTitle').text(twitter.altTitle);
    twitter.content = x[0].getElementsByTagName("content")[0].childNodes[0].nodeValue;
    $('#tweetContent').text(twitter.content);
    twitter.createDate = x[0].getElementsByTagName("createdDate")[0].childNodes[0].nodeValue;
    $('#tweetDate').text(twitter.createDate);
    twitter.category = x[0].getElementsByTagName("category")[0].childNodes[0].nodeValue;
    $('#tweetCategory').text(twitter.category);

    ms.title = x[1].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    $('#msTitle').text(ms.title);
    ms.altTitle = x[1].getElementsByTagName("altTitle")[0].childNodes[0].nodeValue;
    $('#msAltTitle').text(ms.altTitle);
    ms.content = x[1].getElementsByTagName("content")[0].childNodes[0].nodeValue;
    $('#msContent').text(ms.content);
    ms.createDate = x[1].getElementsByTagName("createdDate")[0].childNodes[0].nodeValue;
    $('#msDate').text(ms.createDate);
    ms.category = x[1].getElementsByTagName("category")[0].childNodes[0].nodeValue;
    $('#msCategory').text(ms.category);

    gradle.title = x[2].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    $('#gradleTitle').text(gradle.title);
    gradle.altTitle = x[2].getElementsByTagName("altTitle")[0].childNodes[0].nodeValue;
    $('#gradleAltTitle').text(gradle.altTitle);
    gradle.content = x[2].getElementsByTagName("content")[0].childNodes[0].nodeValue;
    $('#gradleContent').text(gradle.content);
    gradle.createDate = x[2].getElementsByTagName("createdDate")[0].childNodes[0].nodeValue;
    $('#gradleDate').text(gradle.createDate);
    gradle.category = x[2].getElementsByTagName("category")[0].childNodes[0].nodeValue;
    $('#gradleCategory').text(gradle.category);

    kubs.title = x[3].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    $('#kubsTitle').text(kubs.title);
    kubs.altTitle = x[3].getElementsByTagName("altTitle")[0].childNodes[0].nodeValue;
    $('#kubsAltTitle').text(kubs.altTitle);
    kubs.content = x[3].getElementsByTagName("content")[0].childNodes[0].nodeValue;
    $('#kubsContent').text(kubs.content);
    kubs.createDate = x[3].getElementsByTagName("createdDate")[0].childNodes[0].nodeValue;
    $('#kubsDate').text(kubs.createDate);
    kubs.category = x[3].getElementsByTagName("category")[0].childNodes[0].nodeValue;
    $('#kubsCategory').text(kubs.category);

}