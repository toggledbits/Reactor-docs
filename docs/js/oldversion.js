var loc = document.location.pathname.replace( /\/docs\/[^\/]+\//, "/docs/" );
var m = document.createElement('div');
m.innerHTML = '<p style="font-size: 20px; color: red;"><b>You are reading the documentation for an older version of Reactor. To read documentation for the current version, please go <a href="' + loc + '">here</a>.</b></p>';
// var content = document.getElementsByClassName("md-content")[0];
// content.parentElement.insertBefore(m, content);
var content = document.getElementsByTagName("article")[0];
content.insertBefore(m, content.children[0]);