export const validateEmail = (email) => {
    let error = "";
    let state = true;
    const emailVali =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.length == 0) {
        error = "*メールを空白にすることはできません!";
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
        error = "*ユーザー名を空白にすることはできません!";
        state = false;
    } else if (name.length < 4) {
        error = "*ユーザー名は4文字以上である必要があります!";
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
        error = "*パスワードを空白のままにすることはできません!";
        state = false;
    } else if (password.length < 4) {
        error = "*パスワードは4文字以上である必要があります!";
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
        error = "*電話番号を空白のままにすることはできません!";
        state = false;
    } else if (!mobileValidate.test(String(mobile))) {
        error = "*電話番号が正しい形式ではありません!";
        state = false;
    } else {
        error = "";
        state = true;
    }
    return { error, state };
};
