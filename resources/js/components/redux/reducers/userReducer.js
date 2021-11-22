const initialState = {
    login: false,
    user: {},
};

const USER_PROFILE = "USER_PROFILE";

const userReducer = (state = initialState, action) => {
    switch (action.type) {
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
