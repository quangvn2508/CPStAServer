create_contest = function(){
    const contest_form = document.getElementById("contest-form");
    const create_btn = document.getElementById("create-btn");
    const URL = window.location;
    var formObj, msg, xmlhttp, url, res;

    function validate(obj) {
        if (obj['name'] === ""|| obj['startTime'] === "" || obj['endTime'] === "") return "Please fill all input fields";
        if ((new Date(obj['startTime']).getTime()) >= (new Date(obj['endTime']).getTime())) return "End time must be after start end";
        return null;
    }

    create_btn.addEventListener('click', () => {
        formObj = form.formToJSON(contest_form);
        msg = validate(formObj);
        if (msg !== null) {
            alert(msg);
            return
        }
        
        // REST
        xmlhttp = new XMLHttpRequest();
        url = URL.protocol + "//" + URL.host + "/contest/admin/";
        
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                res = JSON.parse(this.response);
                if (this.status === 200) location.href = "./manage_contests.html";
                else alert(res.msg);
            }
        };
        xmlhttp.open("POST", url, true);
    
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.setRequestHeader('Authorization', 'bearer ' + localStorage.getItem('token'));
        xmlhttp.send(JSON.stringify(formObj));
        
    }, false);

}();