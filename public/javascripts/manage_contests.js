manage_contests = function() {
    const table_element = document.getElementById("contests-table");
    const create_btn = document.getElementById("create-btn-id");

    function toEditProblem() {
        location.href = "./edit_contest.html?id=" + this.id;
    };

    // example of add a contest record to table
    var tr =  table.add_row("contest-id", ["contest beta", "today", "admin"], ["table-row", "table-body"], table_element);
    tr.onclick = toEditProblem;
}();