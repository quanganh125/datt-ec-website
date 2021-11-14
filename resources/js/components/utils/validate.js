export const validateEmail = (email) => {
    let error = "";
    let state = true;
    const emailVali =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.length == 0) {
        error = "*Email không được để trống!";
        state = false;
    } else if (!emailVali.test(String(email).toLowerCase())) {
        error = "*Email sai định dạng!";
        state = false;
    } else {
        error = "";
        state = true;
    }
    return { error, state };
};

export const validateName = (name) => {
    let error = "";
    let state = true;
    if (name.length == 0) {
        error = "*Username không được để trống!";
        state = false;
    } else {
        error = "";
        state = true;
    }
    return { error, state };
};

export const validatePassword = (password) => {
    let error = "";
    let state = true;
    if (password.length == 0) {
        error = "*Password không được để trống!";
        state = false;
    } else {
        error = "";
        state = true;
    }
    return { error, state };
};

export const validateMobile = (mobile) => {
    let error = "";
    const mobileValidate =
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    let state = true;
    if (mobile.length == 0) {
        error = "*Số điện thoại không được để trống!";
        state = false;
    } else if (!mobileValidate.test(String(mobile))) {
        error = "*Số điện thoại không đúng định dạng!";
        state = false;
    } else {
        error = "";
        state = true;
    }
    return { error, state };
};
