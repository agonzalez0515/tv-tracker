import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import { useAuth } from "../context/auth/AuthContext";
import { ADD_TV_SHOW, GET_TV_SHOWS } from "../api/graphqlQueries";
import { makeStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { NewShowForm } from "./NewShowForm";

const useStyles = makeStyles(() => ({
  dialogCard: {
    minHeight: "365px"
  },
  savedMessage: {
    fontSize: "4rem",
    textAlign: "center"
  }
}));

function NewShowDialog({ isOpen, handleClose }) {
  const classes = useStyles();
  const { email } = useAuth();

  const [error, setError] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  function updateTvShowCache(cache, { data }) {
    const {
      user: { tv_shows }
    } = cache.readQuery({
      query: GET_TV_SHOWS,
      variables: { email }
    });
    data.newTvShow.__typename = "TvShow";
    cache.writeQuery({
      query: GET_TV_SHOWS,
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
    const name = e.currentTarget.name.value;
    const dateStarted = e.currentTarget.date_started.value;
    const genre = e.currentTarget.genre.value;
    const time = e.currentTarget.time_watching.value;

    addNewTvShow({ variables: { name, dateStarted, genre, time } })
      .then(() => {
        setIsSaved(true);
        const timer = setTimeout(() => {
          handleClose();
        }, 1200);
        return () => clearTimeout(timer);
      })
      .catch(() => {
        setError("There was an error saving your entry. Please try again.");
      });
  };

  return (
    <div>
      <Dialog
        classes={{ paper: classes.dialogCard }}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">
          Add a new tv show to track!
        </DialogTitle>
        {isSaved ? (
          <p className={classes.savedMessage}>Saved!</p>
        ) : (
          <>
            <NewShowForm
              handleClose={handleClose}
              handleSubmit={handleSubmit}
            />
            {error && <p>{error}</p>}
          </>
        )}
      </Dialog>
    </div>
  );
}

NewShowDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default NewShowDialog;
