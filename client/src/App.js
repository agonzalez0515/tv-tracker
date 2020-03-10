import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { authState } from "./context/AuthContext";
import Theme from "./theme/theme";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import ProtectedDashboard from "./views/Dashboard";
import Register from "./views/Register";
import Login from "./views/Login";

function App() {
  const { state, dispatch } = useContext(authState);

  useEffect(() => {
    fetch("http://localhost:8000/checkToken", {
      credentials: "include"
    })
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: "login", payload: true });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [state.loggedIn, dispatch]);

  return (
    <Theme>
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={ProtectedDashboard} />
          </Switch>
        </div>
      </Router>
    </Theme>
  );
}

export default App;
