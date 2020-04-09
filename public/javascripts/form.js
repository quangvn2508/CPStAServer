form = function(){
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

    return {
        formToJSON: formToJSON,
        resetForm: resetForm
    };
}();