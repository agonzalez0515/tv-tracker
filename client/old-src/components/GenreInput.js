import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

function GenreInput() {
  const [genre, setGenre] = useState("");

  const handleChange = event => setGenre(event.target.value);

  return (
    <div>
      <FormControl style={{ minWidth: "120" }}>
        <InputLabel htmlFor="tv-show-genre">Genre</InputLabel>
        <Select
          inputProps={{
            id: "tv-show-genre",
            name: "genre",
            "data-testid": "genre-input"
          }}
          value={genre}
          onClick={handleChange}
          margin="dense"
          required
        >
          <MenuItem value="action">Action</MenuItem>
          <MenuItem value="sci-fi">Sci-fi</MenuItem>
          <MenuItem value="comedy">Comedy</MenuItem>
          <MenuItem value="drama">Drama</MenuItem>
          <MenuItem value="horror">Horror</MenuItem>
          <MenuItem value="rom-com">Rom-com</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default GenreInput;
