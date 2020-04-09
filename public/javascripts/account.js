account = function(){
    const login_card = document.getElementById("login-card");
    const signup_card = document.getElementById("signup-card");
    const login_form = document.getElementById("login-form");
    const signup_form = document.getElementById("signup-form");
    var flip = false;
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
            resetForm(login_form.elements);
        }
        else {
            addremove(login_card, signup_card);
            resetForm(signup_form.elements);
        }
        flip = !flip;
    }

    /**
     * Get value in form and convert to JSON object
     * @param {*} elements 
     */
    const formToJSON = (elements) => [].reduce.call(elements, (JSONobj, element) => {
        JSONobj[element.name] = element.value;
        return JSONobj;
    }, {});

    /**
     * Reset all input field in form
     * @param {*} elements in form
     */
    const resetForm = (elements) => [].reduce.call(elements, (data, element) => {
        element.value = "";
        return data;
    }, {});

    /**
     * Check if user's input is valid
     * @param {JSON} obj 
     */
    function validate(obj) {
        var letterNumber = /^[0-9a-zA-Z]+$/;
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
        var formObj, msg;
        formObj = formToJSON(login_form.elements);
        msg = validate(formObj);
        if (msg !== null) {
            alert(msg);
        }
    }, false);

    /**
     * submit sign up info
     */
    document.getElementById("signup-submit-btn").addEventListener('click', () => {
        var formObj, msg;
        formObj = formToJSON(signup_form.elements);
        msg = validate(formObj);
        if (msg !== null) {
            alert(msg);
        }
    }, false);
}();