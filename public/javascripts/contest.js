contest = function(){
    const problem_list = document.getElementById("problem-list");

    function toProblem() {
        location.href = './problem.html?id=' + this.id;
    }

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


    // example of adding problem list
    for (var i = 0; i < 5; i++) {
        var temp = createProblemLi("prob-id" + i, "problem name" + i, 10*i);
        temp.onclick = toProblem;
        problem_list.appendChild(temp);
    }
}();