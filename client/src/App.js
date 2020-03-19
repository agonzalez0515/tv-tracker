import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./App.css";
import { useAuth } from "./context/auth/AuthContext";
import { checkToken } from "./api/authentication";
import NavBar from "./components/layout/NavBar";
import Theme from "./theme/theme";
import Dashboard from "./views/Dashboard";
import Landing from "./components/layout/Landing";
import Login from "./views/Login";
import Register from "./views/Register";
import Watching from "./views/Watching";

function App() {
  const { login, setUserEmail } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkToken()
      .then(body => {
        login();
        setUserEmail(body.email);
      })
      .catch(() => {});
    setIsLoading(false);
  }, [login, setUserEmail]);

  return (
    <Theme>
      <Router>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute path="/dashboard">
                <Dashboard />
              </PrivateRoute>
              <PrivateRoute path="/watching">
                <Watching />
              </PrivateRoute>
            </Switch>
          </>
        )}
      </Router>
    </Theme>
  );
}

function PrivateRoute({ children, ...rest }) {
  const { isLoggedIn } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
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
  children: PropTypes.node.isRequired
};

export default App;
