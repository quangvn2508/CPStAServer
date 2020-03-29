const result = document.getElementById("result");
const inputForm = document.getElementById('input-form');

var outputSlowly;
function printText(_object_id, _text) {     
    clearInterval(outputSlowly);
    $('#' + _object_id).innerHTML = "";
    var $message = _text.split('').reverse();
    var $timeout = 10;
    outputSlowly = setInterval(function() {
        $('#' + _object_id).append($message.pop());
        if ($message.length === 0) {            
            clearInterval(outputSlowly);   
        }
    }, $timeout);
}

function isEpmty(obj) {
    return obj['name'] === ""|| obj['startTime'] === "" || obj['endTime'] === "";
}

function validDate(obj) {
    var sd = new Date(obj['startTime']);
    var ed = new Date(obj['endTime']);
    console.log(sd.getTime() + " " + ed.getTime());
    return sd.getTime() < ed.getTime();
}

const formToJSON = elements => [].reduce.call(elements, (data, element) => {
    data[element.name] = element.value;
    return data;
}, {});

function creatContest() {
    result.innerHTML = "";
    var formObj = formToJSON(inputForm.elements);

    formObj['name'].replace(/\s/g, '-');
    
    if (isEpmty(formObj)) {
        printText(result.id, "Please fille all input fields");
        return;
    }
    if (!validDate(formObj)) {
        printText(result.id, "End time must be after start end");
        return;
    }

    var xmlhttp = new XMLHttpRequest();
    var getUrl = window.location;
    var url = getUrl.protocol + "//" + getUrl.host + "/contest/create";
    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            var obj = JSON.parse(this.response);
            console.log(obj);

            printText(result.id, obj.status);
            if (this.status === 200) {
                // to contest edit page
            }
        }
    };
    xmlhttp.open("POST", url, true);

    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.setRequestHeader('Authorization', 'bearer ' + localStorage.getItem('token'));
    

    xmlhttp.send(JSON.stringify(formObj));

    console.log(formObj);
}