contests = function(){
    const bar_container = document.getElementById("bar-container-id");

    /**
     * Go to next weekly contest page
     */
    document.getElementById("weekly-id").addEventListener('click', () => {
        location.href = "./contest.html";
    }, false);
    
    /**
     * Go to past contests
     */
    document.getElementById("past-id").addEventListener('click', () => {
        console.log("past contests button");
    }, false);
    
    /**
     * Go to edit contest manage page for all contests
     */
    document.getElementById("manage-id").addEventListener('click', () => {
        location.href = "./manage_contests.html";
    }, false);
    
    /**
     * Modify bar to show all 3 options (for admin only)
     */
    function three_to_two() {
        bar_container.classList.remove("two-sec-bar-container-2-col");
        bar_container.classList.add("two-sec-bar-container-3-col");
    }
}();
