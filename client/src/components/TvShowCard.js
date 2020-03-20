import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import { formatResponseDate } from "../utils/helpers";

const useStyles = makeStyles(() => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardContent: {
    flexGrow: 1
  }
}));

function TvShowCard({ showInfo }) {
  const classes = useStyles();
  const { name, date_started, genre, time_watching } = showInfo;

  return (
    <Grid item key={name} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography>
            Started Watching: {formatResponseDate(date_started)}
          </Typography>
          <Typography>Time spent watching: {time_watching}</Typography>
          <Chip size="small" label={genre} color="primary" />
        </CardContent>
      </Card>
    </Grid>
  );
}

TvShowCard.propTypes = {
  showInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    date_started: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    time_watching: PropTypes.string.isRequired
  })
};
export default TvShowCard;
