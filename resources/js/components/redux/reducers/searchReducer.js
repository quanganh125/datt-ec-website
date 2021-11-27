const initialState = {
    search_title: "",
};

export const SET_TITLE = "SET_TITLE";

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TITLE:
            return {
                ...state,
                search_title: action.payload,
            };
        default:
            return state;
    }
};

export default searchReducer;
