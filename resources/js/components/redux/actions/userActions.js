import axios from "axios";
import { setCookie, getCookie } from "../../utils/cookie";
import { apiAuthUserProfile, apiGetShop } from "../../constant";

const USER_PROFILE = "USER_PROFILE";
const LOGIN_STATE = "LOGIN_STATE";
const SHOW_NAV = "SHOW_NAV";
const HIDE_NAV = "HIDE_NAV";
const SET_SHOP_ID = "SET_SHOP_ID";

export const fetchUser = (access_token) => async (dispatch) => {
    const headers = {
        "Content-type": "application/json",
        Authorization: `Bearer ${access_token}`,
    };
    await axios
        .get(apiAuthUserProfile, {
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
    return { type: HIDE_NAV };
};

export const fetchShopId = (user_id) => async (dispatch) => {
    const headers = {
        "Content-type": "application/json",
        Authorization: `Bearer ${getCookie("access_token")}`,
    };
    userProfile.id &&
        (await axios
            .get(`${apiGetShop}/${user_id}`, {
                headers: headers,
            })
            .then((res) => {
                const id = res.data;
                dispatch(setShopId(id));
            })
            .catch((error) => {
                console.error(error);
            }));
};

export const setShopId = (state) => {
    return { type: SET_SHOP_ID, payload: state };
};
