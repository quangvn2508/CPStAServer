function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function onload() {
    var xmlhttp = new XMLHttpRequest();
    var getUrl = window.location;
    var url = getUrl.protocol + "//" + getUrl.host + "/profile/" + getUrlVars()['username'];

    xmlhttp.onreadystatechange = function() {
        
        if (this.readyState == 4) {
            var obj = JSON.parse(this.response);
            document.getElementById("profile-name").innerHTML = obj.nickname;
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader('Authorization', 'bearer ' + localStorage.getItem('token'));
    xmlhttp.send();
}

onload();
