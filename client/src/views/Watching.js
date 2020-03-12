import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { authState } from "../context/AuthContext";
import TvShowCard from "../components/TvShowCard";

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  }
}));

function Watching() {
  const {
    state: { email }
  } = useContext(authState);

  const { data, loading, error } = useQuery(TV_SHOWS, {
    variables: { email }
  });
  const classes = useStyles();

  if (loading) return <CircularProgress />;
  if (error) return <p>Error :(</p>;

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {data.user.tv_shows.length > 0 ? (
          data.user.tv_shows.map(details => (
            <TvShowCard showInfo={details} key={details.name} />
          ))
        ) : (
          <div>
            <p>no tv shows. how about you add one?</p>
          </div>
        )}
      </Grid>
      {/* <Link to="/tvShows/new"> add new show</Link> */}
    </Container>
  );
}

const TV_SHOWS = gql`
  query TvShows($email: String!) {
    user(email: $email) {
      tv_shows {
        name
        genre
        date_started
        date_finished
        time_spent
      }
    }
  }
`;

export default Watching;
