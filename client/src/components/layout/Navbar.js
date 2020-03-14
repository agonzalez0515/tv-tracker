import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import NavBarLinks from "./NavBarLinks";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  nav: {
    alignItems: "center",
    display: "flex",
    height: "10vh",
    justifyContent: "space-between",
    padding: "0 1rem",
    "& p,a": {
      fontWeight: "bold"
    },
    width: "100%"
  }
}));

function Navbar() {
  const classes = useStyles();

  const handleLogOut = () => {
    fetch("/logout", {
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(response => {
        if (response.status === 200) {
          window.location.reload();
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <AppBar position="relative">
      <Toolbar>
        <LiveTvIcon className={classes.icon} />
        <nav className={classes.nav}>
          <Typography
            component="p"
            variant="h6"
            color="inherit"
            noWrap
            style={{ width: "50%" }}
          >
            <Link to="/">TELLY TRACKER</Link>
          </Typography>
          <NavBarLinks logOut={handleLogOut} />
        </nav>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
