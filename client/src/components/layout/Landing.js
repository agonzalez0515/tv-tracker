import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import cuteTv from "../../cute-tv-cropped.jpg";

const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundImage: `url(${cuteTv})`,
    backgroundPosition: "initial",
    backgroundSize: "cover",
    minHeight: "100vh",
    padding: theme.spacing(8, 0, 6)
  },
  heroText: {
    marginLeft: 0,
    marginTop: "7rem"
  }
}));

function Landing() {
  const classes = useStyles();

  return (
    <div className={classes.heroContent} data-testid="heroImage">
      <Container maxWidth="sm" className={classes.heroText}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Telly Tracker
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Track all the shows you watch and how much time you spent in front of
          the tv.
        </Typography>
        {/* TODO add more info about the project */}
      </Container>
    </div>
  );
}

export default Landing;
