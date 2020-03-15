import React, { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import GenreInput from "../components/GenreInput";
import TimeSpentWatchingInput from "../components/TimeSpentWatchingInput";
import { authState } from "../context/AuthContext";

function FormDialog(props) {
  const {
    state: { email }
  } = useContext(authState);

  const [addNewTvShow] = useMutation(ADD_TV_SHOW, {
    update(cache, { data: { newTvShow } }) {
      const {
        user: { tv_shows }
      } = cache.readQuery({
        query: TV_SHOWS,
        variables: { email }
      });
      newTvShow.__typename = "TvShow";
      cache.writeQuery({
        query: TV_SHOWS,
        variables: { email },
        data: {
          user: {
            __typename: "User",
            tv_shows: [...tv_shows, newTvShow]
          }
        }
      });
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
    const name = e.currentTarget[0].value;
    const dateStarted = e.currentTarget[1].value;
    const genre = e.currentTarget[2].value;
    const time = e.currentTarget[3].value;

    addNewTvShow({ variables: { name, dateStarted, genre, time } });
    props.handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">
          Add a new tv show to track!
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              margin="dense"
              id="name"
              label="Name"
              fullWidth
              required
            />
            <TextField
              defaultValue={Date.now()}
              id="date_started"
              label="Date you started watching"
              margin="dense"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              required
            />
            <GenreInput />
            <TimeSpentWatchingInput />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

const TV_SHOWS = gql`
  query TvShows($email: String!) {
    user(email: $email) {
      tv_shows {
        id
        name
        genre
        date_started
        time_watching
      }
    }
  }
`;

const ADD_TV_SHOW = gql`
  mutation addNewTvShow(
    $name: String!
    $dateStarted: String!
    $genre: String!
    $time: String!
  ) {
    newTvShow(
      name: $name
      date_started: $dateStarted
      genre: $genre
      time_watching: $time
    ) {
      id
      name
      genre
      date_started
      date_finished
      time_watching
    }
  }
`;

export default FormDialog;
