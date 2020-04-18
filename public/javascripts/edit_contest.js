edit_contest = function(){
    const form_ids = [ "name", "startTime", "endTime", "description", "rule", "testers", "problems"];
    const submit_btn = document.getElementById("submit-btn");
    const tester_add = document.getElementById("tester-add");
    const problem_add = document.getElementById("problem-add");
    const params = nav.getUrlParams();
    const URL = window.location;
    var xmlhttp, url, res;
    var elements = {};

    init = function(){
        form_ids.forEach((key) => {
            elements[key] = document.getElementById(key);
        });

        xmlhttp = new XMLHttpRequest();
        url = URL.protocol + "//" + URL.host + "/contest/admin/" + params['id'];
        
        xmlhttp.onreadystatechange = function() {
            
            if (this.readyState == 4) {
                res = JSON.parse(this.response);
                console.log(res);
                if (this.status === 200) setForm(res);
                else alert(res.msg);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.setRequestHeader('Authorization', 'bearer ' + localStorage.getItem('token'));
        xmlhttp.send();
    }();

    /**
     * Create a node in 'tester' list with pre-define format
     * @param {string} _id 
     * @param {string} _nickname 
     * @returns {Element} new element
     */
    function createTesterLi(_id, _nickname) {
        var li = document.createElement("li");
        li.id = _id;
        li.classList.add("list-item", "edit-contest-list-style");
        li.innerHTML =  "<div class=\"list-item-left\">" + _nickname + "</div>" +
                        "<div class=\"list-item-right\" onclick=\"edit_contest.deleteItem(\'" + _id + "\')\"><img src=\"/static/resource/delete.svg\"></div>";
        return li;
    }

    /**
     * Create a node in 'problems' list with pre-define format
     * @param {string} _id 
     * @param {string} _name 
     * @param {number} _score default 0
     * @returns {Element} new element
     */
    function createProblemLi(_id, _name, _score = 0) {
        var li = document.createElement("li");
        li.id = _id;
        li.classList.add("list-item", "edit-contest-list-style");
        li.innerHTML =  "<div class=\"list-item-left\">" + _name + "</div>" + 
                        "<div class=\"list-item-right\" onclick=\"edit_contest.deleteItem(\'" + _id + "\')\"><img src=\"/static/resource/delete.svg\"></div>" +
                        "<div class=\"list-item-right\" onclick=\"edit_contest.goToEditProblem(\'" + _id + "\')\"><img src=\"/static/resource/edit.svg\"></div>" +
                        "<div class=\"list-item-right\"><input class=\"edit-contest-input\" type=\"text\" placeholder=\"Max score\" value = \"" + _score + "\"></div>";
        return li;
    }

    /**
     * Delete an entry in list with id _id
     * @param {string} _id 
     */
    function deleteItem(_id) {
        var e = document.getElementById(_id);
        e.parentNode.removeChild(e);
    }
    
    /**
     * Navigate to edit_problem page and pass _id as url parameter
     * @param {string} _id 
     */
    function goToEditProblem(_id) {
        location.href = "./edit_problem.html?id=" + _id;
    }

    /**
     * Update contest info
     */
    function update() {
        xmlhttp = new XMLHttpRequest();
        url = URL.protocol + "//" + URL.host + "/contest/admin/" + params['id'];
    
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                res = JSON.parse(this.response);
                if (this.status === 200) {
                    alert("Update successfully");
                }
                else alert(res.msg);
            }
        };
    
        xmlhttp.open("PUT", url, true);
        xmlhttp.setRequestHeader('Authorization', 'bearer ' + localStorage.getItem('token'));
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        console.log(getForm());
        xmlhttp.send(JSON.stringify(getForm()));
    }
    submit_btn.addEventListener('click', update, false);
    
    /**
     * Add tester with username
     */
    tester_add.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) return;

        xmlhttp = new XMLHttpRequest();
        url = URL.protocol + "//" + URL.host + "/users/admin/" + event.target.value;

        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                res = JSON.parse(this.response);
                if (this.status === 200) elements['testers'].appendChild(createTesterLi(res['_id'], res['username']));
                else alert(res.msg);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.setRequestHeader('Authorization', 'bearer ' + localStorage.getItem('token'));
        xmlhttp.send();
        event.target.value = "";
    }, false);

    /**
     * Create problem and add to this contest
     */
    problem_add.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) return;

        xmlhttp = new XMLHttpRequest();
        url = URL.protocol + "//" + URL.host + "/problem/admin";
    
        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                res = JSON.parse(this.response);
                if (this.status === 200) elements['problems'].appendChild(createProblemLi(res['_id'], res['name']));
                else alert(res.msg);
            }
        };
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader('Authorization', 'bearer ' + localStorage.getItem('token'));
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.send(JSON.stringify({contestId: params['id'], name: event.target.value}));
        event.target.value = "";
    }, false);

    /**
     * Update data from server when load page
     * @param {object} _obj 
     */
    function setForm(_obj) {
        var i;
        elements['name'].innerHTML = _obj['name'];
        elements['startTime'].defaultValue = _obj['startTime'].substring(0, 16);
        elements['endTime'].defaultValue = _obj['endTime'].substring(0, 16);
        elements['description'].value = _obj['description'];
        elements['rule'].value = _obj['rule'];

        for (i = 0; i <  _obj['testers'].length; i++) {
            elements['testers'].appendChild(createTesterLi(_obj['testers'][i]['_id'], _obj['testers'][i]['username']));
        }

        for (i = 0; i < _obj['problems'].length; i++) {
            elements['problems'].appendChild(createProblemLi(_obj['problems'][i]['_id'], _obj['problems'][i]['name'], _obj['score'][i]));
        }
    }
    
    /**
     * Get current information from form and save as JSON object
     * @returns {Object}
     */
    function getForm() {
        var obj = {}, i, temp;
        obj['name'] = elements['name'].innerHTML;
        if (elements['startTime'].value !== "" && elements['endTime'].value !== "") {
            obj['startTime'] = elements['startTime'].value;
            obj['endTime'] = elements['endTime'].value;
        }
        obj['description'] = elements['description'].value;
        obj['rule'] = elements['rule'].value;
        obj['testers'] = [];
        temp = elements['testers'].getElementsByTagName("li");
        for (i = 0; i < temp.length; i++) {
            obj['testers'].push(temp[i].id);
        }
        obj['problems'] = [];
        obj['score'] = [];
        temp = elements['problems'].getElementsByTagName("li");
        for (i = 0; i < temp.length; i++) {
            obj['problems'].push(temp[i].id);
            obj['score'].push(temp[i].getElementsByTagName("input")[0].value);
        }
        console.log(obj);
        return obj;
    }

    return {
        // for edit_contest.html
        deleteItem: deleteItem,
        goToEditProblem: goToEditProblem
    };
}();
