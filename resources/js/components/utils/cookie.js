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
    document.cookie = cname + "=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};
