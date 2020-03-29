function toProfile() {
    var xmlhttp = new XMLHttpRequest();
    var getUrl = window.location;
    var url = getUrl.protocol + "//" + getUrl.host + "/profile";

    xmlhttp.onreadystatechange = function() {

        if (this.readyState == 4) {
            location.href = this.response;
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader('Authorization', 'bearer ' + localStorage.getItem('token') );
    xmlhttp.send();
}

function toIndex() {
    location.href = '/';
}

function toContest() {
    location.href = '/contests.html';
}

function toProblem() {
    location.href = '/problems.html';
}

function logout() {
    localStorage.removeItem('token');
    location.href = './register.html';
}