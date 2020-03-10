import React from "react";
import { Container } from "@material-ui/core";
import cuteTv from "../../cute-tv-cropped.jpg";

function Landing() {
  return (
    <Container>
      <h1> Track your time in front of the telly</h1>
      <img
        src={cuteTv}
        style={{ width: "100%", marginTop: "64px" }}
        alt="Old orange television against a bright mint background"
      />
    </Container>
  );
}

export default Landing;
