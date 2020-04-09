nav = function() {
    const container = document.getElementById("nav-container");
    var collapse_shown = false;

    /**
     * Function to display colapsed menu item while in collapse mode (i.e small screen)
     */
    document.getElementById("nav-toggle").addEventListener('click', () => {
        if (collapse_shown) container.style.height = "50px";
        else container.style.height = "auto";
        collapse_shown = !collapse_shown;
    }, false);

    /**
     * To Home page
     */
    document.getElementById("home-btn").addEventListener('click', () => {
        location.href = "./index.html";
    }, false);

    /**
     * To contests page
     */
    document.getElementById("contests-btn").addEventListener('click', () => {
        location.href = "./contests.html";
    }, false);

    /**
     * To problems page
     */
    document.getElementById("problems-btn").addEventListener('click', () => {
        location.href = "./problems.html";
    }, false);

    /**
     * To user profile page or account page for registration if not logged in
     */
    document.getElementById("profile-btn").addEventListener('click', () => {
        // check if user is logged in
        location.href = "./account.html";
    }, false);

}();

