import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../../context/AuthContext";

const useStyles = makeStyles(theme => ({
  navLinksContainer: {
    display: "flex",
    justifyContent: "space-between",
    listStyleType: "none",
    width: "50%",
    "& a": {
      fontSize: "14px",
      textTransform: "uppercase"
    }
  },
  logOutButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    textTransform: "uppercase"
  }
}));

function NavBarLinks(props) {
  const classes = useStyles();
  const {
    state: { loggedIn }
  } = useAuth();

  return (
    <ul className={classes.navLinksContainer}>
      {loggedIn ? (
        <>
          <li>
            <Link to="/dashboard"> dashboard </Link>
          </li>
          <li>
            <Link to="/watching"> watching </Link>
          </li>
          <li>
            <button className={classes.logOutButton} onClick={props.logOut}>
              log out
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/register"> register </Link>
          </li>
          <li>
            <Link to="/login"> login </Link>
          </li>
        </>
      )}
    </ul>
  );
}

export default NavBarLinks;
