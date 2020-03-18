import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../../context/auth/AuthContext";

const useStyles = makeStyles(() => ({
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

function NavBarLinks({ logOut }) {
  const classes = useStyles();
  const { isLoggedIn } = useAuth();

  return (
    <ul className={classes.navLinksContainer}>
      {isLoggedIn ? (
        <>
          <li>
            <Link to="/dashboard"> dashboard </Link>
          </li>
          <li>
            <Link to="/watching"> watching </Link>
          </li>
          <li>
            <button className={classes.logOutButton} onClick={logOut}>
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

NavBarLinks.propTypes = {
  logOut: PropTypes.func.isRequired
};

export default NavBarLinks;
