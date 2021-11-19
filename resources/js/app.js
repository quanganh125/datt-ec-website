require("./bootstrap");
import React from "react";
import App from "./components/App";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import store from "./components/redux/store";
import { Provider } from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
);
