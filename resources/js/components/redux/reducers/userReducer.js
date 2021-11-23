const initialState = {
    loginState: false,
    user: {},
};

const USER_PROFILE = "USER_PROFILE";
const LOGIN_STATE = "LOGIN_STATE";

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
        default:
            return state;
    }
};

export default userReducer;
