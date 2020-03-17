import React, { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

function GenreInput() {
  const [genre, setGenre] = useState("");

  const handleChange = event => setGenre(event.target.value);

  return (
    <div>
      <FormControl style={{ minWidth: "120" }}>
        <InputLabel htmlFor="tv-show-genre">Genre</InputLabel>
        <NativeSelect
          inputProps={{
            id: "tv-show-genre",
            name: "genre"
          }}
          value={genre}
          onClick={handleChange}
          margin="dense"
          required
        >
          <option value="action">Action</option>
          <option value="sci-fi">Sci-fi</option>
          <option value="comedy">Comedy</option>
          <option value="drama">Drama</option>
          <option value="horror">Horror</option>
          <option value="rom-com">Rom-com</option>
        </NativeSelect>
      </FormControl>
    </div>
  );
}

export default GenreInput;
