import React from "react";
import { Link, useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import NavBarLinks from "./NavBarLinks";

const useStyles = makeStyles(theme => ({
  nav: {
    alignItems: "center",
    display: "flex",
    height: "10vh",
    justifyContent: "space-between",
    padding: "0 1rem",
    "& p,a": {
      color: theme.palette.primary.main,
      fontWeight: "bold"
    }
  }
}));

function Navbar() {
  const classes = useStyles();
  const history = useHistory();

  const handleLogOut = () => {
    fetch("http://localhost:8000/logout", {
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(response => {
        if (response.status === 200) {
          console.log(history);
          if (history.location.pathname === "/") {
            window.location.reload();
          } else {
            history.push("/");
          }
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <nav className={classes.nav}>
      <div className="title-container">
        <Typography component="p" variant="h5">
          <Link to="/">TELLY TRACKER</Link>
        </Typography>
      </div>
      <NavBarLinks logOut={handleLogOut} />
    </nav>
  );
}

export default Navbar;
