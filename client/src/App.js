import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Dashboard from "./views/Dashboard";
import Watching from "./views/Watching/Watching";

export default function App() {
  return (
    <React.Fragment>
      <Router>
        <NavBar />
        <h1 className="title">Hello World</h1>
        <div>
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/watching" component={Watching} />
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  );
}
