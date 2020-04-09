edit_contest = function(){
    const form_ids = [ "name", "startTime", "endTime", "description", "rule", "testers", "problems"];
    var elements = {};

    /**
     * Get all the neccessary element
     */
    form_ids.forEach((key) => {
        elements[key] = document.getElementById(key);
    });

    /**
     * Create a node in 'tester' list with pre-define format
     * @param {string} _id 
     * @param {string} _nickname 
     * @returns {Element} new element
     */
    function createTesterLi(_id, _nickname) {
        var li = document.createElement("li");
        li.id = _id;
        li.classList.add("list-item", "edit-contest-list-style");
        li.innerHTML =  "<div class=\"list-item-left\">" + _nickname + "</div>" +
                        "<div class=\"list-item-right\" onclick=\"edit_contest.deleteItem(\'" + _id + "\')\"><img src=\"/static/resource/delete.svg\"></div>";
        return li;
    }

    /**
     * Create a node in 'problems' list with pre-define format
     * @param {string} _id 
     * @param {string} _name 
     * @param {number} _score default 0
     * @returns {Element} new element
     */
    function createProblemLi(_id, _name, _score = 0) {
        var li = document.createElement("li");
        li.id = _id;
        li.classList.add("list-item", "edit-contest-list-style");
        li.innerHTML =  "<div class=\"list-item-left\">" + _name + "</div>" + 
                        "<div class=\"list-item-right\" onclick=\"edit_contest.deleteItem(\'" + _id + "\')\"><img src=\"/static/resource/delete.svg\"></div>" +
                        "<div class=\"list-item-right\" onclick=\"edit_contest.goToEditProblem(\'" + _id + "\')\"><img src=\"/static/resource/edit.svg\"></div>" +
                        "<div class=\"list-item-right\"><input class=\"edit-contest-input\" type=\"text\" placeholder=\"Max score\" value = \"" + _score + "\"></div>";
        return li;
    }

    /**
     * Delete an entry in list with id _id
     * @param {string} _id 
     */
    function deleteItem(_id) {
        var e = document.getElementById(_id);
        e.parentNode.removeChild(e);
    }
    
    /**
     * Navigate to edit_problem page and pass _id as url parameter
     * @param {string} _id 
     */
    function goToEditProblem(_id) {
        location.href = "./edit_problem.html?id=" + _id;
    }

    /**
     * Update data from server when load page
     * @param {object} _obj 
     */
    function setForm(_obj) {
        elements['name'].innerHTML = _obj['name'];
        elements['startTime'].defaultValue = _obj['startTime'].substring(0, 16);
        elements['endTime'].defaultValue = _obj['endTime'].substring(0, 16);
        elements['description'].innerHTML = _obj['description'];
        elements['rule'].innerHTML = _obj['rule'];
        _obj['testers'].forEach((entry) => {
            elements['testers'].innerHTML += createTesterLi(entry['_id'], entry['username']);
        });
            
        _obj['problems'].forEach((entry) => {
            elements['testers'].innerHTML += createProblemLi(entry['_id'], entry['score'] , entry['username']);
        });
    }
    
    /**
     * Get current information from form and save as JSON object
     * @returns {Object}
     */
    function getForm() {
        var obj = {}, i, temp;
        obj['name'] = elements['name'].innerHTML;
        obj['startTime'] = elements['startTime'].value;
        obj['endTime'] = elements['endTime'].value;
        obj['description'] = elements['description'].innerHTML;
        obj['rule'] = elements['rule'].innerHTML;
        obj['testers'] = [];
        temp = elements['testers'].getElementsByTagName("li");
        for (i = 0; i < temp.length; i++) {
            obj['testers'].push(temp[i].id);
        }
        obj['problems'] = [];
        temp = elements['problems'].getElementsByTagName("li");
        for (i = 0; i < temp.length; i++) {
            obj['problems'].push({
                id: temp[i].id,
                score: temp[i].getElementsByTagName("input")[0].value
            });
        }
        console.log(obj);
        return obj;
    }

    elements["testers"].appendChild(createTesterLi("myId", "nickname")); // to be removed
    elements["problems"].appendChild(createProblemLi("myId", "problem name", 234)); // to be removed
    
    
    return {
        deleteItem: deleteItem,
        goToEditProblem: goToEditProblem
    };
}();
