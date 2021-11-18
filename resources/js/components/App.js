import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Fragment } from "react";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./layouts/Navigation";
import ProductManager from "./pages/ProductManager";
import ProductList from "./layouts/ProductList/index";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import StoreProfile from "./pages/Store's Profile";
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
                    <Route exact path="/create/product" render={() => <CreateProduct />} />
                    <Route exact path="/edit/product" render={() => <EditProduct />} />
                    <Route exact path="/store/profile" render={() => <StoreProfile />} />
                </Switch>
            </Router>
        </Fragment>
    );
}
