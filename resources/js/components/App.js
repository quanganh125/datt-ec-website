import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Fragment } from "react";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Navigation from "./layouts/Navigation";
import ProductManager from "./pages/ProductManager";
toast.configure();
import ProductList from "./layouts/ProductList/index";

export default function App() {
    console.log("App");
    return (
        <Fragment>
            <Router>
                <Navigation />
                <Switch>
                    <Route exact path="/" render={() => <Home />} />
                    <Route
                        exact
                        path="/product/manager"
                        render={() => <ProductManager />}
                    />
                    <Route exact path="/login" render={() => <Signin />} />
                    <Route exact path="/register" render={() => <Signup />} />
                </Switch>
            </Router>
        </Fragment>
    );
}
