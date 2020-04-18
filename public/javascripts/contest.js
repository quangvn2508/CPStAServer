contest = function(){
    const problem_list = document.getElementById("problem-list");
    const timer = document.getElementById("timer")
    const elements_id = ["name", "time", "description", "rule"];
    const params = nav.getUrlParams();
    const URL = window.location;
    var xmlhttp, url, res, i, elements = {}, startTime, endTime;

    /**
     * Go to problem page
     */
    function toProblem() {
        location.href = './problem.html?id=' + this.id;
    }

    init = function(){
        for (i = 0; i < elements_id.length; i++) {
            elements[elements_id[i]] = document.getElementById(elements_id[i]);
        }

        xmlhttp = new XMLHttpRequest();
        url = URL.protocol + "//" + URL.host + "/contest";
        if (params['id'] !== undefined) {
            url = url + '/' +  params['id'];
        }
        
        xmlhttp.onreadystatechange = function() {
            
            if (this.readyState == 4) {
                res = JSON.parse(this.response);
                console.log(res);
                if (this.status === 200) setupPage(res);
                else alert(res.msg);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.setRequestHeader('Authorization', 'bearer ' + localStorage.getItem('token'));
        xmlhttp.send();
    }();

    /**
     * Create problem as list item then return this
     * @param {string} _id 
     * @param {string} _name 
     * @param {number} _score 
     */
    function createProblemLi(_id, _name, _score) {
        var li = document.createElement("li");
        li.id = _id;
        li.classList.add("list-item", "contest-list-style");
        li.innerHTML =  "<div class=\"list-item-left\">" + _name + "</div>" + 
                        "<div class=\"list-item-right\">" + _score + " pts </div>";
        return li;
    }

    function setupPage(_obj) {
        console.log(_obj);
        console.log(_obj['problems']);
        startTime = new Date(_obj['startTime']);
        endTime = new Date(_obj['endTime']);
        elements['name'].innerHTML = _obj['name'];
        elements['time'].innerHTML = startTime.toLocaleString() + " - " + endTime.toLocaleString();
        elements['description'].innerHTML = _obj['description'];
        elements['rule'].innerHTML = _obj['rule'];
        for (i = 0; i < _obj['score'].length; i++) {
            var temp;
            if (_obj['problems'].length <= i) {
                temp = createProblemLi("prob-id" + i, "problem " + i, _obj['score'][i]);
            }
            else {
                temp = createProblemLi(_obj['problems'][i]['_id'], _obj['problems'][i]['name'], _obj['score'][i]);
                temp.onclick = toProblem;
            }
            problem_list.appendChild(temp);
        }
    }
}();