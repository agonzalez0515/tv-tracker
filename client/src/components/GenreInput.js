import React, { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

function GenreInput() {
  const [genre, setGenre] = useState("");

  const handleChange = event => setGenre(event.target.value);

  return (
    <div>
      <FormControl style={{ minWidth: "120" }}>
        <InputLabel id="tv-show-genre">Genre</InputLabel>
        <Select
          labelId="tv-show-genre"
          id="genre"
          value={genre}
          onChange={handleChange}
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
