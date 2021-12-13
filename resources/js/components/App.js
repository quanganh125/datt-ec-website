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
import Footer from "./layouts/Footer";
import ProductManager from "./pages/ProductManager";
toast.configure();
import { getCookie } from "./utils/cookie";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import StoreCreate from "./pages/StoreCreate";
import ShowStore from "./pages/StoreShow";
import EditStore from "./pages/StoreEdit";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, setShowNav } from "../components/redux/actions/userActions";
import ProductDetail from "./pages/ProductDetail";
import Error from "./pages/Error";

export default function App() {
    const dispatch = useDispatch();
    const [login, setLogin] = useState(false);
    const [isShowSearch, setIsShowSearch] = useState(true);

    const checkAuth = () => {
        if (getCookie("access_token") != "") {
            dispatch(fetchUser(getCookie("access_token")));
        }
    };
    const showNav = () => {
        // dispatch(setShowNav());
    };

    const setShowSearch = () => {
        setIsShowSearch(window.location.pathname == "/home");
    };

    useEffect(() => {
        setShowSearch();
        showNav();
        checkAuth();
    }, []);

    const userProfile = useSelector((state) => state.user.user);
    const loginState = useSelector((state) => state.user.loginState);
    const isShowNav = useSelector((state) => state.user.isShowNav);
    const shop_id = useSelector((state) => state.user.shop_id);
    useEffect(() => {
        setLogin(loginState);
    }, [loginState]);
    return (
        <Fragment>
            <Router>
                {isShowNav ? (
                    <Navigation
                        userProfile={userProfile}
                        loginState={login}
                        isShowSearch={isShowSearch}
                    />
                ) : null}
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
                        path="/home"
                        render={() => {
                            return <Home />;
                        }}
                    />
                    <Route
                        exact
                        path="/"
                        render={() => {
                            return <Redirect to="/home" />;
                        }}
                    />
                    <Route
                        exact
                        path="/product/manager"
                        render={() => {
                            return getCookie("access_token") != "" ? (
                                <ProductManager />
                            ) : (
                                <Redirect to="/home" />
                            );
                        }}
                    />
                    <Route
                        exact
                        path="/product/create"
                        render={() => <CreateProduct />}
                    />
                    <Route
                        exact
                        path="/product/:id/edit"
                        component={EditProduct}
                    />
                    <Route
                        exact
                        path="/product/:id/detail"
                        render={() => {
                            return <ProductDetail userProfile={userProfile} />;
                        }}
                    />
                    <Route
                        exact
                        path="/store/:id/edit"
                        // component={EditStore}
                        render={(props) => {
                            return getCookie("access_token") != "" ? (
                                <EditStore {...props} />
                            ) : (
                                <Redirect to="/home" />
                            );
                        }}
                    />
                    <Route
                        exact
                        path="/store/create"
                        render={() => {
                            return getCookie("access_token") != "" &&
                                !shop_id ? (
                                <StoreCreate />
                            ) : (
                                <Redirect to="/home" />
                            );
                        }}
                    />
                    <Route exact path="/store/:id" component={ShowStore} />
                    <Route
                        exact
                        path="/:nothing"
                        render={() => {
                            return <Error />;
                        }}
                    />
                </Switch>
                {isShowNav ? <Footer /> : null}
            </Router>
        </Fragment>
    );
}
