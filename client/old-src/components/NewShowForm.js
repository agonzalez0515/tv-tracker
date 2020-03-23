import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import GenreInput from "./GenreInput";
import TimeSpentWatchingInput from "./TimeSpentWatchingInput";

export function NewShowForm({ handleSubmit, handleClose }) {
  return (
    <form onSubmit={handleSubmit} data-testid="newShowForm">
      <DialogContent>
        <TextField
          name="showName"
          margin="dense"
          id="name"
          label="Name"
          fullWidth
          required
        />
        <TextField
          defaultValue={Date.now()}
          id="date_started"
          name="date_started"
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
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </DialogActions>
    </form>
  );
}

NewShowForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};
