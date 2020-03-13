import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

function TimeSpentWatchingInput() {
  const [time, setTime] = useState(30);
  const [error, setError] = useState("");

  const addTime = () => setTime(time + 30);

  const removeTime = () => {
    if (time === 0) {
      setError("Value cannot be negative");
      return;
    }
    setTime(time - 30);
  };

  return (
    <div style={{ display: "flex" }}>
      {error && <p>{error}</p>}
      <TextField
        id="time_watching"
        label="How many minutes did you watch today?"
        inputProps={{
          readOnly: true
        }}
        value={time}
        fullWidth
      />
      <Button onClick={addTime}>+ 30 min</Button>
      <Button onClick={removeTime}>- 30 min</Button>
    </div>
  );
}

export default TimeSpentWatchingInput;
