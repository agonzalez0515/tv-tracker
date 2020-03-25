import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./navBar.css";

export default function NavBar() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="navbar__container">
      <h1>
        <Link className="navbar__home-link" to="/">
          Telly Tracker
        </Link>
      </h1>
      <nav className="navbar__links-list">
        <ul>
          {isLoggedIn ? (
            <React.Fragment>
              <li>
                <Link className="navbar__dashboard-link" to="/dashboard">
                  dashboard
                </Link>
              </li>
              <li>
                <Link className="navbar__watching-link" to="/watching">
                  watching
                </Link>
              </li>
              <li>
                <button className="navbar__logout-link">logout</button>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li>
                <Link className="navbar__register-link" to="/register">
                  register
                </Link>
              </li>
              <li>
                <Link className="navbar__login-link" to="/login">
                  login
                </Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
    </div>
  );
}
