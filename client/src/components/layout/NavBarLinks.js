import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { authState } from "../../context/AuthContext";

const useStyles = makeStyles(theme => ({
  navLinksContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "50%",
    "& a": {
      fontSize: "14px",
      textTransform: "uppercase"
    }
  },
  logOutButton: {
    background: "none",
    border: "none",
    fontSize: "14px",
    fontWeight: "bold",
    textTransform: "uppercase"
  }
}));

function NavBarLinks(props) {
  const classes = useStyles();
  const {
    state: { loggedIn }
  } = useContext(authState);

  return (
    <div className={classes.navLinksContainer}>
      {loggedIn ? (
        <>
          <Link to="/dashboard"> Dashboard </Link>
          <Link to="/watching"> Watching </Link>
          <button className={classes.logOutButton} onClick={props.logOut}>
            log out
          </button>
        </>
      ) : (
        <>
          <Link to="/register"> register </Link>
          <Link to="/login"> login </Link>
        </>
      )}
    </div>
  );
}

export default NavBarLinks;
