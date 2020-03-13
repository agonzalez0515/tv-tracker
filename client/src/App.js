import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./App.css";
import { authState } from "./context/AuthContext";
import Theme from "./theme/theme";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./views/Dashboard";
import Watching from "./views/Watching";
import Register from "./views/Register";
import Login from "./views/Login";

function App() {
  const {
    state: { loggedIn },
    dispatch
  } = useContext(authState);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchToken() {
      try {
        const res = await fetch(process.env.REACT_APP_CHECK_TOKEN_ENDPOINT, {
          credentials: "include"
        });

        if (res.status === 200) {
          const body = await res.json();
          if (body) {
            dispatch({
              type: "login",
              payload: { loggedIn: true, email: body.email }
            });
          }
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsError(true);
      }
    }

    fetchToken();
  }, []);

  return (
    <Theme>
      <Router>
        {isError && <div>Something went wrong ...</div>}
        {isLoading ? (
          <h1>loading </h1>
        ) : (
          <Fragment>
            <Navbar />
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
          </Fragment>
        )}
      </Router>
    </Theme>
  );
}

function PrivateRoute({ children, ...rest }) {
  const {
    state: { loggedIn }
  } = useContext(authState);

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

export default App;
