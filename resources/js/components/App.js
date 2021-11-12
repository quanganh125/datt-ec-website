import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Fragment } from "react";
import Home from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
    console.log("App");
    return (
        <Fragment>
            <Router>
                <Switch>
                    <Route exact path="/" render={() => <Home />} />
                </Switch>
            </Router>
        </Fragment>
    );
}
