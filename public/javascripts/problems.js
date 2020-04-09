problems = function(){
    /**
     * Go to past problems
     */
    document.getElementById("past-id").addEventListener('click', () => {
        console.log("past contests button");
    }, false);
    
    /**
     * go to git webpage
     */
    document.getElementById("git-id").addEventListener('click', () => {
        window.open("https://github.com/Leader-board/St-Andrews-Competitive-Programming", '_blank');
    }, false);
}();