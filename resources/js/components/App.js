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
import { toast } from "react-toastify";
import Navigation from "./layouts/Navigation";
import ProductManager from "./pages/ProductManager";
toast.configure();
import { getCookie } from "./utils/cookie";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import StoreProfile from "./pages/StoreProfile";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../components/redux/actions/userActions";

export default function App() {
    const dispatch = useDispatch();
    const [param, setParam] = useState("");

    const checkAuth = () => {
        getCookie("access_token") &&
            dispatch(fetchUser(getCookie("access_token")));
    };
    const userProfile = useSelector((state) => state.user.user);
    console.log(userProfile);
    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        setParam(window.location.pathname);
        return () => {
            setParam("");
        };
    }, [param]);

    return (
        <Fragment>
            <Router>
                <Navigation userProfile={userProfile} />
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
                            return localStorage.getItem("auth") ? (
                                <ProductManager />
                            ) : (
                                <Redirect to="/" />
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
