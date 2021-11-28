const initialState = {
    loginState: false,
    user: {},
    isShowNav: true,
};

const USER_PROFILE = "USER_PROFILE";
const LOGIN_STATE = "LOGIN_STATE";
const SHOW_NAV = "SHOW_NAV";
const HIDE_NAV = "HIDE_NAV";

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
            console.log("chay vao set show");
            return {
                ...state,
                isShowNav: true,
            };
        case HIDE_NAV:
            console.log("chay vao set hide");
            return {
                ...state,
                isShowNav: false,
            };
        default:
            return state;
    }
};

export default userReducer;
