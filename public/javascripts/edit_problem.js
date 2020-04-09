edit_problem = function(){
    /**
     * Upload file and insert link to editor
     * @param {SimpleMDE} editor 
     */
    function customeInsertImage(editor) {
        editor.codemirror.replaceSelection("![](url)");
        console.log("insert image");
    }

    // set up MarkDown editor
    const statment_editor = new SimpleMDE({
        element: document.getElementById("statement-editor"),
        toolbar: ["preview", "|", "bold", "italic", "strikethrough", "horizontal-rule", "|", "link", {
            name: "image",
            action: customeInsertImage,
            className: "fa fa-image",
            title: "Insert image",
        }],
        initialValue: "Your statment here...\n\n#### Input format:\n\n##### Constraints :\n\n#### Output format:",
        insertTexts: {
            horizontalRule: ["", "\n\n-----\n\n"],
            image: ["![](http://", ")"],
            link: ["[", "](http://)"]
        },
        tabSize: 4
    });

    /**
     * update new info for problem
     */
    document.getElementById("update-btn").addEventListener('click', () => {
        console.log(statment_editor.value().toString());
    }, false);
}();