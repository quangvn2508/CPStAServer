account = function(){
    const login_card = document.getElementById("login-card");
    const signup_card = document.getElementById("signup-card");
    const login_form = document.getElementById("login-form");
    const signup_form = document.getElementById("signup-form");
    const URL = window.location;
    const letterNumber = /^[0-9a-zA-Z]+$/;
    var flip = false;
    var formObj, msg, xmlhttp, url, res;
    document.getElementById("login-card-btn").addEventListener('click', flip_card, false);
    document.getElementById("signup-card-btn").addEventListener('click', flip_card, false);

    /**
     * add and remove classes to hide and show elements
     * @param {element to be shown} show 
     * @param {element to be hidden} hide 
     */
    function addremove(show, hide) {
        show.classList.remove("hide-card");
        hide.classList.remove("show-card");
        show.classList.add("show-card");
        hide.classList.add("hide-card");
    }

    /**
     * invoke when sign up or loggin toggle button is clicked
     */
    function flip_card() {
        if (!flip) {
            addremove(signup_card, login_card);
            form.resetForm(login_form.elements);
        }
        else {
            addremove(login_card, signup_card);
            form.resetForm(signup_form.elements);
        }
        flip = !flip;
    }

    /**
     * Check if user's input is valid
     * @param {JSON} obj 
     */
    function validate(obj) {
        for (var p in obj) {
            if (obj[p] === "") return "Please fill all input fields";
            if (obj[p].length < 5) return "Input too short";
        }
        if (!obj['username'].match(letterNumber)) {
            return "Username cannot have special characteres";
        }
        return null;
    }

    /**
     * submit login info
     */
    document.getElementById("login-submit-btn").addEventListener('click', () => {
        formObj = form.formToJSON(login_form.elements);
        msg = validate(formObj);
        if (msg !== null) {
            alert(msg);
            return;
        }


        // REST
        xmlhttp = new XMLHttpRequest();
        url = URL.protocol + "//" + URL.host + "/users/login";
        
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                res = JSON.parse(this.response);
                // console.log(res);
                alert(res.msg);
                if (this.status === 200) {
                    localStorage.setItem('token', res.token);
                    location.href = '/profile.html?username=' + res.username;
                }
            }
        };
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(formObj));
    }, false);

    /**
     * submit sign up info
     */
    document.getElementById("signup-submit-btn").addEventListener('click', () => {
        formObj = form.formToJSON(signup_form.elements);
        msg = validate(formObj);
        if (msg !== null) {
            alert(msg);
            return;
        }

        if (formObj['password'] !== formObj['repassword']) {
            alert("Password not matched");
            return;
        }
        
        // REST
        xmlhttp = new XMLHttpRequest();
        url = URL.protocol + "//" + URL.host + "/users/signup";
        
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status === 200) {
                    alert("Register successfully");
                    flip_card();
                }
                else  alert(JSON.parse(this.response).err.message);
            }
        };
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(formObj));
    }, false);
}();