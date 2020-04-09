problem = function(){
    const themeStorageID = "themeIndex";
    const modeStorageID = "modeIndex";
    const editorStorageID = "editor"; // need to change for problem ID, userID;
    const themeList = ["ambiance", "base16-dark", "darcula", "eclipse", "elegant", "icecoder", "idea", "isotope", "material-darker", "mdn-like", "monokai", "neo"];
    const modeList = [
        {value: "text/x-c++src", name: "C++14"},
        {value: "text/x-c++src", name: "C++11"},
        {value: "text/x-java", name: "Java 8"},
        {value: "text/javascript", name: "JavaScript"},
        {value: "text/x-python", name: "Python 2.7"},
        {value: "text/x-python", name: "Python 3.5"}
    ];
    const theme_selector = document.getElementById("theme-selector");
    const mode_selector = document.getElementById("mode-selector");
    theme_selector.addEventListener('change', changeTheme, false);
    mode_selector.addEventListener('change', changeMode, false);
    
    /**
     * Create code editor with initial value
     */
    var Editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
        lineNumbers: true,
        matchBrackets: true,
        mode: "text/text",
        theme: "default"
    });

    /**
     * Initialise fields
     */
    init = function() {
        var i;
        theme_selector.innerHTML = "<option>default</option>";
        mode_selector.innerHTML = "<option value=\"text/text\">text</option>";

        // add option to theme selector
        for (i = 0; i < themeList.length; i++) {
            theme_selector.innerHTML += "<option selected>" + themeList[i] + "</option>";
        }

        // add option to mode selector
        for (i = 0; i < modeList.length; i++) {
            mode_selector.innerHTML += "<option value=\"" + modeList[i]['value'] + "\">" + modeList[i]['name'] + "</option>";
        }

        if (localStorage.getItem(themeStorageID) === null) localStorage.setItem(themeStorageID, "0");
        if (localStorage.getItem(modeStorageID) === null) localStorage.setItem(modeStorageID, "0");
        if (localStorage.getItem(editorStorageID) === null) localStorage.setItem(editorStorageID, "");

        
        theme_selector.selectedIndex = localStorage.getItem(themeStorageID);
        mode_selector.selectedIndex = localStorage.getItem(modeStorageID);
        changeTheme();
        changeMode();
        Editor.setValue(localStorage.getItem(editorStorageID));

        // render problem statement
        renderMD("*Loading problem statment...*");
    }();

    /**
     * Change theme of editor
     */
    function changeTheme() {
        var theme = theme_selector.options[theme_selector.selectedIndex].textContent;
        Editor.setOption("theme", theme);
        localStorage.setItem(themeStorageID, theme_selector.selectedIndex);
    }

    /**
     * change language
     */
    function changeMode() {
        var mode = mode_selector.options[mode_selector.selectedIndex].value;
        Editor.setOption("mode", mode);
        localStorage.setItem(modeStorageID, mode_selector.selectedIndex);
    }
    
    Editor.on('changes', () => {
        localStorage.setItem(editorStorageID, Editor.getValue());
    });

    /**
     * Render md file and display in web
     * @param {.md} md 
     */
    function renderMD(md) {
        document.getElementById("preview").innerHTML = marked(md);
    }
}();
/*
url : https://codemirror.net/demo/theme.html#default
*/