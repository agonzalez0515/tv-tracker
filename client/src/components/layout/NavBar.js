import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../api/authentication";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useAuth } from "../../context/auth/AuthContext";
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
    "& a": {
      textTransform: "uppercase"
    },
    "& p,a": {
      fontWeight: "bold"
    },
    width: "100%"
  }
}));

function NavBar() {
  const classes = useStyles();
  const { logout, setUserEmail } = useAuth();

  const handleLogOut = () => {
    logoutUser()
      .then(() => {
        logout();
        setUserEmail("");
      })
      .catch(err => console.log(err));
  };

  return (
    <AppBar position="relative">
      <Toolbar>
        <LiveTvIcon className={classes.icon} data-testid="cameraIcon" />
        <nav className={classes.nav}>
          <Typography
            component="p"
            variant="h6"
            color="inherit"
            noWrap
            style={{ width: "50%" }}
          >
            <Link to="/">telly tracker</Link>
          </Typography>
          <NavBarLinks logOut={handleLogOut} />
        </nav>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
