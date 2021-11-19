import axios from "axios";
import { setCookie, getCookie } from "../../utils/cookie";
const apiUser = "http://127.0.0.1:8000/api/auth/user-profile";

export const loginUser = () => async (dispatch) => {};

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
            localStorage.setItem("auth", true);
            dispatch(setUser(user));
        })
        .catch((error) => {
            localStorage.setItem("auth", false);
            console.error(error);
            dispatch(setUser(null));
        });
};

export const setUser = (user) => {
    return { type: "USER_PROFILE", payload: user };
};
