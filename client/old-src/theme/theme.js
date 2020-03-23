import React from "react";
import PropTypes from "prop-types";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#64b2b4"
    },
    secondary: {
      main: "#fba933"
    }
  }
});

function Theme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

Theme.propTypes = {
  children: PropTypes.node.isRequired
};

export default Theme;
