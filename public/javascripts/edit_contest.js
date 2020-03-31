function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

var objName = ["name", "rule", "description", "startTime", "endTime", "testers", "problems"];
var elements = {};

for (var i = 0; i < objName.length; i++) {
    elements[objName[i]] = document.getElementById(objName[i]);
}

var contestId = getUrlVars()['id'];
var initialObj;
// Load page
var xmlhttp = new XMLHttpRequest();
var getUrl = window.location;
var url = getUrl.protocol + "//" + getUrl.host + "/contest/" + contestId;

xmlhttp.onreadystatechange = function() {
    
    if (this.readyState == 4) {
        initialObj = JSON.parse(this.response);
        updateElements();
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.setRequestHeader('Authorization', 'bearer ' + localStorage.getItem('token'));
xmlhttp.send();
// end load page

function updateElements() {
    elements['name'].innerHTML = initialObj['name'];
    elements['rule'].innerHTML = initialObj['rule'];
    elements['description'].innerHTML = initialObj['description'];
    elements['startTime'].defaultValue = initialObj['startTime'].substring(0, 16);
    elements['endTime'].defaultValue = initialObj['endTime'].substring(0, 16);
    for (var i = 0; i < initialObj['testers'].length; i++) {
        elements['testers'].innerHTML += '<li id=\"' + initialObj['testers'][i]['_id'] + '\">'+initialObj['testers'][i]['username']+'<img onclick="deleteTester(\'' + initialObj['testers'][i]['_id'] + '\')" src=\"./resource/delete.svg\"></li>'
    }

    for (var i = 0; i < initialObj['problems'].length; i++) {
        elements['problems'].innerHTML += '<li id=\"' + initialObj['problems'][i]['_id'] + '\">'+initialObj['problems'][i]['name']+'<img src=\"./resource/delete.svg\"></li>'
    }
}

function getList(list_id) {
    var items = elements[list_id].getElementsByTagName("li");
    var id_list = [];
    for (var i = 0; i < items.length; ++i) {
        id_list.push(items[i].id);
    }
    return id_list;
}

function addTester(event) {
    if (event.keyCode !== 13) return;
    var xmlhttp = new XMLHttpRequest();
    var getUrl = window.location;
    var url = getUrl.protocol + "//" + getUrl.host + "/users/" + event.target.value;

    console.log(url);
    xmlhttp.onreadystatechange = function() {
        
        if (this.readyState === 4) {
            var obj = JSON.parse(this.response);
            if (this.status === 200) {
                elements['testers'].innerHTML += '<li id=\"' + obj['_id'] + '\">'+ obj['username']+'<img onclick="deleteTester(\'' + obj['_id'] + '\')" src=\"./resource/delete.svg\"></li>';
            }
            else if (this.status === 404) {
                // username not found
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader('Authorization', 'bearer ' + localStorage.getItem('token'));
    xmlhttp.send();
}

function deleteTester(tester_id) {
    elements['testers'].removeChild(document.getElementById(tester_id));
}

function addProblem(event) {

}

function update() {
    var reqobj = {};
    reqobj['nam'] = elements['name'].innerHTML;
    reqobj['rule'] = elements['rule'].innerHTML;
    reqobj['description'] = elements['description'].innerHTML;
    reqobj['startTime'] = elements['startTime'].value;
    reqobj['endTime'] = elements['endTime'].value;
    reqobj['testers'] = getList('testers');
    reqobj['problems'] = getList('problems');

    console.log(reqobj);

    var xmlhttp = new XMLHttpRequest();
    var getUrl = window.location;
    var url = getUrl.protocol + "//" + getUrl.host + "/contest/" + contestId;

    xmlhttp.onreadystatechange = function() {
        
        if (this.readyState == 4) {
            var obj = JSON.parse(this.response);
            console.log(obj);
        }
    };

    xmlhttp.open("PUT", url, true);
    xmlhttp.setRequestHeader('Authorization', 'bearer ' + localStorage.getItem('token'));
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(reqobj));
}