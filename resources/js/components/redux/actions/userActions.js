import axios from "axios";
import { setCookie, getCookie } from "../../utils/cookie";
import { api } from "../../constant";
const apiUser = `${api}api/auth/user-profile`;

const USER_PROFILE = "USER_PROFILE";
const LOGIN_STATE = "LOGIN_STATE";
const SHOW_NAV = "SHOW_NAV";
const HIDE_NAV = "HIDE_NAV";

export const fetchUser = (access_token) => async (dispatch) => {
    const headers = {
        "Content-type": "application/json",
        Authorization: `Bearer ${access_token}`,
    };
    await axios
        .get(apiUser, {
            headers: headers,
        })
        .then((res) => {
            const user = res.data;
            dispatch(setLogin(true));
            dispatch(setUser(user));
        })
        .catch((error) => {
            console.error(error);
            dispatch(setLogin(false));
            dispatch(setUser(null));
        });
};

export const setUser = (user) => {
    return { type: USER_PROFILE, payload: user };
};

export const setLogin = (state) => {
    return { type: LOGIN_STATE, payload: state };
};

export const setShowNav = () => {
    return { type: SHOW_NAV };
};

export const setHideNav = () => {
    console.log("hide hide");
    return { type: HIDE_NAV };
};
