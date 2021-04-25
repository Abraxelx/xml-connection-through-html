
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
       xmlToJson(this);
    }
  };
  xmlhttp.open("GET", "xml/news.xml", true);
  xmlhttp.send();
}




function loadJsonDoc() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      xml2json(this, " ");
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



function xml2json(xml, tab) {
  var X = {
     toObj: function(xml) {
        var o = {};
        if (xml.nodeType==1) {   // element node ..
           if (xml.attributes.length)   // element with attributes  ..
              for (var i=0; i<xml.attributes.length; i++)
                 o["@"+xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue||"").toString();
           if (xml.firstChild) { // element has child nodes ..
              var textChild=0, cdataChild=0, hasElementChild=false;
              for (var n=xml.firstChild; n; n=n.nextSibling) {
                 if (n.nodeType==1) hasElementChild = true;
                 else if (n.nodeType==3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
                 else if (n.nodeType==4) cdataChild++; // cdata section node
              }
              if (hasElementChild) {
                 if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
                    X.removeWhite(xml);
                    for (var n=xml.firstChild; n; n=n.nextSibling) {
                       if (n.nodeType == 3)  // text node
                          o["#text"] = X.escape(n.nodeValue);
                       else if (n.nodeType == 4)  // cdata node
                          o["#cdata"] = X.escape(n.nodeValue);
                       else if (o[n.nodeName]) {  // multiple occurence of element ..
                          if (o[n.nodeName] instanceof Array)
                             o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                          else
                             o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                       }
                       else  // first occurence of element..
                          o[n.nodeName] = X.toObj(n);
                    }
                 }
                 else { // mixed content
                    if (!xml.attributes.length)
                       o = X.escape(X.innerXml(xml));
                    else
                       o["#text"] = X.escape(X.innerXml(xml));
                 }
              }
              else if (textChild) { // pure text
                 if (!xml.attributes.length)
                    o = X.escape(X.innerXml(xml));
                 else
                    o["#text"] = X.escape(X.innerXml(xml));
              }
              else if (cdataChild) { // cdata
                 if (cdataChild > 1)
                    o = X.escape(X.innerXml(xml));
                 else
                    for (var n=xml.firstChild; n; n=n.nextSibling)
                       o["#cdata"] = X.escape(n.nodeValue);
              }
           }
           if (!xml.attributes.length && !xml.firstChild) o = null;
        }
        else if (xml.nodeType==9) { // document.node
           o = X.toObj(xml.documentElement);
        }
        else
           alert("unhandled node type: " + xml.nodeType);
        return o;
     },
     toJson: function(o, name, ind) {
        var json = name ? ("\""+name+"\"") : "";
        if (o instanceof Array) {
           for (var i=0,n=o.length; i<n; i++)
              o[i] = X.toJson(o[i], "", ind+"\t");
           json += (name?":[":"[") + (o.length > 1 ? ("\n"+ind+"\t"+o.join(",\n"+ind+"\t")+"\n"+ind) : o.join("")) + "]";
        }
        else if (o == null)
           json += (name&&":") + "null";
        else if (typeof(o) == "object") {
           var arr = [];
           for (var m in o)
              arr[arr.length] = X.toJson(o[m], m, ind+"\t");
           json += (name?":{":"{") + (arr.length > 1 ? ("\n"+ind+"\t"+arr.join(",\n"+ind+"\t")+"\n"+ind) : arr.join("")) + "}";
        }
        else if (typeof(o) == "string")
           json += (name&&":") + "\"" + o.toString() + "\"";
        else
           json += (name&&":") + o.toString();
        return json;
     },
     innerXml: function(node) {
        var s = ""
        if ("innerHTML" in node)
           s = node.innerHTML;
        else {
           var asXml = function(n) {
              var s = "";
              if (n.nodeType == 1) {
                 s += "<" + n.nodeName;
                 for (var i=0; i<n.attributes.length;i++)
                    s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue||"").toString() + "\"";
                 if (n.firstChild) {
                    s += ">";
                    for (var c=n.firstChild; c; c=c.nextSibling)
                       s += asXml(c);
                    s += "</"+n.nodeName+">";
                 }
                 else
                    s += "/>";
              }
              else if (n.nodeType == 3)
                 s += n.nodeValue;
              else if (n.nodeType == 4)
                 s += "<![CDATA[" + n.nodeValue + "]]>";
              return s;
           };
           for (var c=node.firstChild; c; c=c.nextSibling)
              s += asXml(c);
        }
        return s;
     },
     escape: function(txt) {
        return txt.replace(/[\\]/g, "\\\\")
                  .replace(/[\"]/g, '\\"')
                  .replace(/[\n]/g, '\\n')
                  .replace(/[\r]/g, '\\r');
     },
     removeWhite: function(e) {
       // e.normalize();
        for (var n = e.firstChild; n; ) {
           if (n.nodeType == 3) {  // text node
              if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
                 var nxt = n.nextSibling;
                 e.removeChild(n);
                 n = nxt;
              }
              else
                 n = n.nextSibling;
           }
           else if (n.nodeType == 1) {  // element node
              X.removeWhite(n);
              n = n.nextSibling;
           }
           else                      // any other node
              n = n.nextSibling;
        }
        return e;
     }
  };
  if (xml.nodeType == 9) // document node
     xml = xml.documentElement;
  var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
  return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
}