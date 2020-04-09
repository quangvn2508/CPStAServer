table = function() {
    /**
     * Create a row in table with id: _id.
     *  each text in element text correspond to a column,
     *  the row will have classes.
     * Finally add to table element and return this.
     * 
     * @param {string} _id 
     * @param {Array.string} elements_text 
     * @param {Array.string} classes 
     * @param {Element} table_element 
     */
    function add_row(_id, elements_text, classes, table_element) {
        var tr = document.createElement("tr");
        tr.id = _id;
        for (var i = 0; i < classes.length; i++) {
            tr.classList.add(classes[i]);
        }
    
        for (var i = 0; i < elements_text.length; i++) {
            var td = document.createElement("td");
            var node = document.createTextNode(elements_text[i]);
            td.appendChild(node);
            tr.appendChild(td);
        }
        table_element.appendChild(tr);
        return tr;
    }

    return {
        add_row: add_row
    };
}();