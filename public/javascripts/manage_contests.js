manage_contests = function() {
    const table_element = document.getElementById("contests-table");
    const create_btn = document.getElementById("create-btn-id");
    const URL = window.location;
    var xmlhttp, url, res, newtr;

    /**
     * Get list of contests owned by user
     */
    init = function(){
        xmlhttp = new XMLHttpRequest();
        url = URL.protocol + "//" + URL.host + "/contest/admin";
        
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                res = JSON.parse(this.response);
                if (this.status === 200) {
                    for (var i = 0; i < res.length; i++) {
                        newtr =  table.add_row(res[i]['_id'], [res[i]['name'], new Date(res[i]['createdAt']).toUTCString(), res[i]['owner']['nickname']], ["table-row", "table-body"], table_element);
                        newtr.onclick = toEditContest;
                    }
                }
                else if (this.status === 401) {
                    // not logged in
                    alert(res.msg);
                    location.href = "./account.html";
                }
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.setRequestHeader('Authorization', 'bearer ' + localStorage.getItem('token'));
        xmlhttp.send();
    }();

    /**
     * Redirect to edit contest page with web parameter
     */
    function toEditContest() {
        location.href = "./edit_contest.html?id=" + this.id;
    };

    /**
     * Add function on click to create button
     */
    create_btn.addEventListener('click', () => {
        location.href = './create_contest.html'
    }, false);
}();