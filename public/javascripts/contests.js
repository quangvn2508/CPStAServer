var middle = document.getElementById("middle");

var xmlhttp = new XMLHttpRequest();
var getUrl = window.location;
var url = getUrl.protocol + "//" + getUrl.host + "/users/admin";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
        if (this.status === 200) {
            middle.classList.remove("two-column");
            middle.classList.add("three-column");
            document.getElementById("admin").style.visibility = "visible";
        }
    }
};

xmlhttp.open("GET", url, true);
xmlhttp.setRequestHeader('Authorization', 'bearer ' + localStorage.getItem('token'));
xmlhttp.send();