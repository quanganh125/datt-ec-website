import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import React, { useState, useEffect, Fragment } from "react";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Navigation from "./layouts/Navigation";
import ProductManager from "./pages/ProductManager";
toast.configure();
import axios from "axios";
import { getCookie } from "./utils/cookie";

const apiUser = "http://127.0.0.1:8000/api/auth/user-profile";

import ProductList from "./layouts/ProductList/index";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import StoreProfile from "./pages/StoreProfile";
export default function App() {
    const [user, setUser] = useState(null);
    const [auth, setauth] = useState(false);

    const setIsAuth = (state) => {
        setauth(state);
    };

    const checkAuth = async () => {
        const headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${getCookie("access_token")}`,
        };
        getCookie("access_token") &&
            (await axios
                .get(apiUser, {
                    headers: headers,
                })
                .then((res) => {
                    const user = res.data;
                    setUser(user);
                    setIsAuth(true);
                    localStorage.setItem("auth", true);
                })
                .catch((error) => {
                    setIsAuth(false);
                    localStorage.setItem("auth", false);
                    console.error(error);
                }));
    };

    useEffect(() => {
        checkAuth();
    }, [auth]);

    console.log("chuyen huong");
    return (
        <Fragment>
            <Router>
                <Navigation auth={auth} />
                <Switch>
                    <Route
                        exact
                        path="/login"
                        render={() => {
                            return <Signin />;
                        }}
                    />
                    <Route
                        exact
                        path="/register"
                        render={() => {
                            return <Signup />;
                        }}
                    />
                    <Route
                        exact
                        path="/"
                        render={() => {
                            return <Home />;
                        }}
                    />
                    <Route
                        exact
                        path="/product/manager"
                        render={() => {
                            return auth ? (
                                <ProductManager />
                            ) : (
                                <Redirect to="/login" />
                            );
                        }}
                    />
                    <Route
                        exact
                        path="/create/product"
                        render={() => <CreateProduct />}
                    />
                    <Route
                        exact
                        path="/edit/product"
                        render={() => <EditProduct />}
                    />
                    <Route
                        exact
                        path="/store/profile"
                        render={() => <StoreProfile />}
                    />
                </Switch>
            </Router>
        </Fragment>
    );
}
