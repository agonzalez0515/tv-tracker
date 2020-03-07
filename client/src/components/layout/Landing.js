import React from "react";
import { Link } from "react-router-dom";
import { Container } from "@material-ui/core";

function Landing() {
  return (
    <Container>
      <div>
        <Link
          to="/register"
          style={{
            width: "140px",
            borderRadius: "3px",
            letterSpacing: "1.5px"
          }}>
          Register
        </Link>
      </div>
      <div>
        <Link
          to="/login"
          style={{
            width: "140px",
            borderRadius: "3px",
            letterSpacing: "1.5px"
          }}>
          Log In
        </Link>
      </div>
    </Container>
  );
}

export default Landing;
