import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import GenreInput from "./GenreInput";
import TimeSpentWatchingInput from "./TimeSpentWatchingInput";

export function NewShowForm(props) {
  return (
    <form onSubmit={props.handleSubmit} data-testid="newShowForm">
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
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </DialogActions>
    </form>
  );
}
