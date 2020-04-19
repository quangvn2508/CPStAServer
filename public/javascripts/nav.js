nav = function() {
    const container = document.getElementById("nav-container");
    const nav_toggle = document.getElementById("nav-toggle");
    const home_btn = document.getElementById("home-btn");
    const contest_btn = document.getElementById("contests-btn");
    const problem_btn = document.getElementById("problems-btn");
    const logout_btn = document.getElementById("logout-btn");
    const profile_btn = document.getElementById("profile-btn");
    const URL = window.location;
    var xmlhttp, url;
    var collapse_shown = false;

    /**
     * Function to display colapsed menu item while in collapse mode (i.e small screen)
     */
    nav_toggle.addEventListener('click', () => {
        if (collapse_shown) container.style.height = "50px";
        else container.style.height = "auto";
        collapse_shown = !collapse_shown;
    }, false);

    /**
     * To Home page
     */
    home_btn.addEventListener('click', () => {
        location.href = "./index.html";
    }, false);

    /**
     * To contests page
     */
    contest_btn.addEventListener('click', () => {
        location.href = "./contests.html";
    }, false);

    /**
     * To problems page
     */
    problem_btn.addEventListener('click', () => {
        location.href = "./problems.html";
    }, false);

     /**
     * Logout
     */
    if (logout_btn !== null) {
        logout_btn.addEventListener('click', () => {
            localStorage.removeItem('token');
            location.href = "./account.html";
        }, false);        
    }

    /**
     * To user profile page or account page for registration if not logged in
     */
    if (profile_btn !== null) {
        profile_btn.addEventListener('click', () => {
            xmlhttp = new XMLHttpRequest();
            url = URL.protocol + "//" + URL.host + "/profile";
            
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status === 200) {
                        res = JSON.parse(this.response);
                        location.href = '/profile.html?username=' + res.username;
                    }
                    else {
                        location.href = "./account.html"; 
                    }
                }
            };
    
            xmlhttp.open("GET", url, true);
            xmlhttp.setRequestHeader('Authorization', 'bearer ' + localStorage.getItem('token') );
            xmlhttp.send();
        }, false);
    }
    
    /**
     * Get page params from url
     */
    function getUrlParams() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }

    return {
        getUrlParams: getUrlParams
    };
}();

