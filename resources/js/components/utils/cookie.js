// Hàm thiết lập Cookie
export const setCookie = (cname, cvalue, exTime) => {
    if (exTime) {
        var d = new Date();
        d.setTime(d.getTime() + exTime * 1000);
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    } else {
        document.cookie = cname + "=" + cvalue;
    }
};

// Hàm lấy Cookie
export const getCookie = (cname) => {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
};

// Hàm xóa Cookie
export const deleteCookie = (cname) => {
    document.cookie =
        cname + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=[something];";
};

export const deleteAllCookies = () => {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
};
