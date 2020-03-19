import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(() => ({
  loading: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    height: "100vh"
  }
}));

function Loading() {
  const classes = useStyles();
  return (
    <div className={classes.loading}>
      <CircularProgress data-testid="loadingState" />
    </div>
  );
}

export default Loading;
