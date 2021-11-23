import axios from "axios";
import { setCookie, getCookie } from "../../utils/cookie";
const apiUser = "http://127.0.0.1:8000/api/auth/user-profile";

const USER_PROFILE = "USER_PROFILE";
const LOGIN_STATE = "LOGIN_STATE";

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
