import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import searchReducer from "./searchReducer";
import eventReducer from "./eventReducers";

export default combineReducers({
    user: userReducer,
    product: productReducer,
    search: searchReducer,
    event: eventReducer,
});
