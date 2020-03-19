import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./App.css";
import { useAuth } from "./context/auth/AuthContext";
import { checkToken } from "./api/authentication";
import NavBar from "./components/layout/NavBar";
import Theme from "./theme/theme";
import Dashboard from "./views/Dashboard";
import Landing from "./components/layout/Landing";
import Loading from "./components/Loading";
import Login from "./views/Login";
import Register from "./views/Register";
import Watching from "./views/Watching";

function App() {
  const { login, setUserEmail, isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkToken()
      .then(body => {
        login();
        setUserEmail(body.email);
      })
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [login, setUserEmail]);

  if (isLoading) return <Loading />;

  return (
    <Theme>
      <Router>
        <>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute path="/dashboard" loggedIn={isLoggedIn}>
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/watching" loggedIn={isLoggedIn}>
              <Watching />
            </PrivateRoute>
          </Switch>
        </>
      </Router>
    </Theme>
  );
}

function PrivateRoute({ children, loggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  loggedIn: PropTypes.bool.isRequired
};

export default App;
