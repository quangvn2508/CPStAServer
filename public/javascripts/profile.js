profile = function(){
    const image = document.getElementById("profile-img-id");
    const nickname = document.getElementById("profile-nickname-id");
    const params = nav.getUrlParams();
    const URL = window.location;
    var xmlhttp, url, res;

    /**
     * Get user basic info
     */
    init = function(){
        xmlhttp = new XMLHttpRequest();
        url = URL.protocol + "//" + URL.host + "/profile/" + params['username'];

        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                res = JSON.parse(this.response);
                if (this.status === 200)
                    nickname.innerHTML = res.nickname;
            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.setRequestHeader('Authorization', 'bearer ' + localStorage.getItem('token'));
        xmlhttp.send();

    }();
}();