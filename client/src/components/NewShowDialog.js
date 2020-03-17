import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { authState } from "../context/AuthContext";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TV_SHOWS } from "../views/Watching";
import { NewShowForm } from "./NewShowForm";
// import { updateTvShowCache } from "../api/updateTvShowsCache";

export function NewShowDialog(props) {
  const {
    state: { email }
  } = useContext(authState);

  const [message, setMessage] = useState("");

  function updateTvShowCache(cache, { data }) {
    const {
      user: { tv_shows }
    } = cache.readQuery({
      query: TV_SHOWS,
      variables: { email }
    });
    data.newTvShow.__typename = "TvShow";
    cache.writeQuery({
      query: TV_SHOWS,
      variables: { email },
      data: {
        user: {
          __typename: "User",
          tv_shows: [...tv_shows, data.newTvShow]
        }
      }
    });
  }

  const [addNewTvShow] = useMutation(ADD_TV_SHOW, {
    update: updateTvShowCache
  });

  const handleSubmit = e => {
    e.preventDefault();
    e.persist();
    console.log(e.currentTarget.name);
    const name = e.currentTarget.name.value;
    const dateStarted = e.currentTarget.date_started.value;
    const genre = e.currentTarget.genre.value;
    const time = e.currentTarge.time_watching.value;

    addNewTvShow({ variables: { name, dateStarted, genre, time } })
      .then(() => {
        setMessage("Saved!");
        const timer = setTimeout(() => {
          props.handleClose();
        }, 1500);
        return () => clearTimeout(timer);
      })
      .catch(() => {
        setMessage("There was an error saving your entry. Please try again.");
      });
  };

  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">
          Add a new tv show to track!
        </DialogTitle>
        <NewShowForm
          handleClose={props.handleClose}
          handleSubmit={handleSubmit}
        />
        {message && <p>{message}</p>}
      </Dialog>
    </div>
  );
}

export const ADD_TV_SHOW = gql`
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
