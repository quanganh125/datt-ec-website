import { SET_TITLE } from "../reducers/searchReducer";

export const setSearchTittle = (title) => {
    return { type: SET_TITLE, payload: title };
};
