const initialState = {
    login: false,
    user: {},
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USER_PROFILE":
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
