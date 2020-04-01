const loginField =  document.getElementById("login");
const signupField =  document.getElementById("signup");
const SIresult = document.getElementById("login-result");
const SUresult = document.getElementById("signup-result");
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

function reset() {
    SIresult.innerHTML = "";
    SUresult.innerHTML = "";
    $("#login-form")[0].reset();
    $("#signup-form")[0].reset();
}

var isSignup = false;
function addremove(show, hide) {
    reset();
    show.classList.remove("hide");
    hide.classList.remove("show");
    show.classList.add("show");
    hide.classList.add("hide");
}

function flip() {
    if (!isSignup)
        addremove(signupField, loginField);
    else
        addremove(loginField, signupField);
    isSignup = !isSignup;
}
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

function validate(obj) {
    for (var p in obj) {
        if (obj[p] === "") return "Please fill all input fields";
        if (obj[p].length < 5) return "Input too short";
        if (p !== 'nickname')
            if (/\s/g.test(obj[p])) return "Username or password contains white space";
    }
    return null;
}

const formToJSON = elements => [].reduce.call(elements, (data, element) => {
    data[element.name] = element.value;
    return data;
}, {});

function checkUsername(username) {
    // Check username
    return new Promise((resolve, reject) => {
        var xmlhttp = new XMLHttpRequest();
        var getUrl = window.location;
        var url = getUrl.protocol + "//" + getUrl.host + "/users/login_username";
        
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status !== 200) {
                    reject("Username not existed");
                } else {
                    resolve();
                }
            }
        };
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify({username: username}));
    });
}

function login() {
    SIresult.innerHTML = "";
    var formObj = formToJSON(loginForm.elements);
    var err = validate(formObj);

    if (err !== null) {
        printText(SIresult.id, err);
        return;
    }
    
    var xmlhttp = new XMLHttpRequest();
        var getUrl = window.location;
        var url = getUrl.protocol + "//" + getUrl.host + "/users/login";
        
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                var obj = JSON.parse(this.response);
                console.log(obj);
                printText(SIresult.id, obj.status);
                if (this.status === 200) {
                    localStorage.setItem('token', obj.token);
                    toProfile();
                }
            }
        };
        xmlhttp.open("POST", url, true);
    
        xmlhttp.setRequestHeader("Content-Type", "application/json");
    
        xmlhttp.send(JSON.stringify(formObj));
}

function signup() {
    SUresult.innerHTML = "";
    var formObj = formToJSON(signupForm.elements);
    var err = validate(formObj);

    if (err !== null) {
        printText(SUresult.id, err);
        return;
    } else if (formObj.password !== formObj.repassword) {
        printText(SUresult.id, "Password not match");
        return;
    }

    var xmlhttp = new XMLHttpRequest();
    var getUrl = window.location;
    var url = getUrl.protocol + "//" + getUrl.host + "/users/signup";
    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status === 200) {
                printText(SUresult.id, "Register successfully");
            } else {
                printText(SUresult.id, JSON.parse(this.response).err.message);
            }
        }
    };
    xmlhttp.open("POST", url, true);

    xmlhttp.setRequestHeader("Content-Type", "application/json");

    xmlhttp.send(JSON.stringify(formObj));
}
    