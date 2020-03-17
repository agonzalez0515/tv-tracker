import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import { formatDate } from "../utils/helpers";

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
          <Typography>Started Watching: {formatDate(date_started)}</Typography>
          <Typography>Time spent watching: {time_watching}</Typography>
          <Chip size="small" label={genre} color="primary" />
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Add Time Spent Watching
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default TvShowCard;
