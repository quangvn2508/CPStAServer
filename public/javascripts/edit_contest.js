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
var url = getUrl.protocol + "//" + getUrl.host + "/contest/admin/" + contestId;

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

function createTesterLi(_id, username) {
    return '<li id=\"' + _id + '\">' + username + '<div class="tool-bar"><img onclick="deleteTester(\'' + _id  + '\')" src=\"./resource/delete.svg\"></div></li>'
}

function createProblemLi(_id, name) {
    return '<li id=\"'+_id+'\">' + name + '<div class="tool-bar"><img onclick="deleteProblem(\'' + _id  + '\')" src="./resource/delete.svg"><img onclick="editProblem(\'' + _id  + '\')" src="./resource/edit.svg"></div></li>'
}

function updateElements() {
    elements['name'].innerHTML = initialObj['name'];
    elements['rule'].innerHTML = initialObj['rule'];
    elements['description'].innerHTML = initialObj['description'];
    elements['startTime'].defaultValue = initialObj['startTime'].substring(0, 16);
    elements['endTime'].defaultValue = initialObj['endTime'].substring(0, 16);
    for (var i = 0; i < initialObj['testers'].length; i++) {
        elements['testers'].innerHTML += createTesterLi(initialObj['testers'][i]['_id'], initialObj['testers'][i]['username']);
    }

    for (var i = 0; i < initialObj['problems'].length; i++) {
        elements['problems'].innerHTML += createProblemLi(initialObj['problems'][i]['_id'], initialObj['problems'][i]['name']);
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

    xmlhttp.onreadystatechange = function() {
        
        if (this.readyState === 4) {
            var obj = JSON.parse(this.response);
            if (this.status === 200) {
                elements['testers'].innerHTML += createTesterLi(obj['_id'], obj['username']);
            }
            else if (this.status === 404) {
                displayAlert("Error: " + obj.status);
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader('Authorization', 'bearer ' + localStorage.getItem('token'));
    xmlhttp.send();
    event.target.value = "";
}


function addProblem(event) {
    if (event.keyCode !== 13) return;

    var xmlhttp = new XMLHttpRequest();
    var getUrl = window.location;
    var url = getUrl.protocol + "//" + getUrl.host + "/problem/admin";

    xmlhttp.onreadystatechange = function() {
        
        if (this.readyState === 4) {
            var obj = JSON.parse(this.response);
            if (this.status === 200) {
                elements['problems'].innerHTML += createProblemLi(obj['_id'], obj['name']);
            }
            else {
                displayAlert("Error: " + obj.status);
            }
        }
    };
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader('Authorization', 'bearer ' + localStorage.getItem('token'));
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    var data = {contestId: contestId, name: event.target.value};
    xmlhttp.send(JSON.stringify(data));
    event.target.value = "";
}


function deleteTester(tester_id) {
    var c = confirm("Are you sure you want to delete?");
    if (c) {
        elements['testers'].removeChild(document.getElementById(tester_id));
    }
}

function deleteProblem(problem_id) {
    var c = confirm("Are you sure you want to delete?");
    if (c) {
        elements['problems'].removeChild(document.getElementById(problem_id));
    }
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
    var url = getUrl.protocol + "//" + getUrl.host + "/contest/admin/" + contestId;

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