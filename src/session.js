function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return void 0;
}

export class SessionHelper {
    static id() {
    	let id = getCookie('parrot_session_id')

    	if (id === void 0) {
    		id = Math.random().toString(36).substr(2, 10)
    		setCookie('parrot_session_id', id)
    	}

    	return id
    }
}