const initialState = {
    loginState: false,
    user: {},
    isShowNav: true,
    shop_id: null,
};

const USER_PROFILE = "USER_PROFILE";
const LOGIN_STATE = "LOGIN_STATE";
const SHOW_NAV = "SHOW_NAV";
const HIDE_NAV = "HIDE_NAV";
const SET_SHOP_ID = "SET_SHOP_ID";

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_STATE:
            return {
                ...state,
                loginState: action.payload,
            };
        case USER_PROFILE:
            return {
                ...state,
                user: action.payload,
            };
        case SHOW_NAV:
            return {
                ...state,
                isShowNav: true,
            };
        case HIDE_NAV:
            return {
                ...state,
                isShowNav: false,
            };
        case SET_SHOP_ID:
            console.log("shop");
            return {
                ...state,
                shop_id: action.payload,
            };

        default:
            return state;
    }
};

export default userReducer;
