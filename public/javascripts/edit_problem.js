edit_problem = function(){
    const page_name = document.getElementById("name");
    const params = nav.getUrlParams();
    const URL = window.location;
    var xmlhttp, url, res;

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

    init = function(){
        xmlhttp = new XMLHttpRequest();
        url = URL.protocol + "//" + URL.host + "/problem/admin/" + params['id'];
        
        xmlhttp.onreadystatechange = function() {
            
            if (this.readyState == 4) {
                res = JSON.parse(this.response);
                if (this.status === 200) setPage(res);
                else alert(res.msg);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.setRequestHeader('Authorization', 'bearer ' + localStorage.getItem('token'));
        xmlhttp.send();
    }();

    function setPage(_obj) {
        page_name.innerHTML = _obj['name'];
        if (_obj['statement'] !== "")
            statment_editor.value(_obj['statement']);
    }

    function getPage() {
        var obj = {};
        obj['statement'] = statment_editor.value().toString();
        return obj;
    }

    /**
     * update new info for problem
     */
    document.getElementById("update-btn").addEventListener('click', () => {
        xmlhttp = new XMLHttpRequest();
        url = URL.protocol + "//" + URL.host + "/problem/admin/" + params['id'];
        
        xmlhttp.onreadystatechange = function() {
            
            if (this.readyState == 4) {
                res = JSON.parse(this.response);
                console.log(res);
                if (this.status === 200) alert("Update successfully");
                else alert(res.msg);
            }
        };
        xmlhttp.open("PUT", url, true);
        xmlhttp.setRequestHeader('Authorization', 'bearer ' + localStorage.getItem('token'));
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(getPage()));
    }, false);
}();