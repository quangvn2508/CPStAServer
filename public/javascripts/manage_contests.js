var contestList = document.getElementById("contest-list");

function getList() {
    
    var xmlhttp = new XMLHttpRequest();
    var getUrl = window.location;
    var url = getUrl.protocol + "//" + getUrl.host + "/contest/manage_contests";
    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            var obj = JSON.parse(this.response);
            console.log(obj);
            if (this.status === 200) {
                var list = "";
                for (var i = 0; i < obj.length; i++) {
                    list += "<tr onclick=\"location.href='/edit_contest.html?id=" + obj[i]['_id'] + "';\"><td>" + obj[i]['name'] + "</td><td>" + new Date(obj[i]['createdAt']).toUTCString() + "</td><td>" + obj[i]['owner']['nickname'] + "</td></tr>";
                }
                contestList.innerHTML = list + contestList.innerHTML;
            }
            else if (this.status === 401) {
                // not logged in
                toProfile();
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader('Authorization', 'bearer ' + localStorage.getItem('token'));
    xmlhttp.send();
}


getList();

