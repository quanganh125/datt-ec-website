import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import searchReducer from "./searchReducer";

export default combineReducers({
    user: userReducer,
    product: productReducer,
    search: searchReducer,
});
