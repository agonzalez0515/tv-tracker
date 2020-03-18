import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { useAuth } from "../context/auth/AuthContext";
import { GET_TV_SHOWS } from "../api/graphqlQueries";
import TvShowCard from "../components/TvShowCard";
import NewShowDialog from "../components/NewShowDialog";

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  }
}));

function Watching() {
  const { email } = useAuth();
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const { data, loading, error } = useQuery(GET_TV_SHOWS, {
    variables: { email }
  });

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  if (loading) return <CircularProgress data-testid="loadingState" />;
  if (error) return <p>Error :(</p>;

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {data.user.tv_shows.length > 0 ? (
          data.user.tv_shows.map(details => (
            <TvShowCard showInfo={details} key={details.name + details.id} />
          ))
        ) : (
          <div>
            <p>no tv shows. how about you add one?</p>
          </div>
        )}
      </Grid>
      <div>
        <Button variant="outlined" color="primary" onClick={handleOpen}>
          Add New Tv Show
        </Button>
        {isOpen && <NewShowDialog handleClose={handleClose} isOpen={isOpen} />}
      </div>
    </Container>
  );
}

export default Watching;
