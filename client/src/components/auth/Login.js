import React, { useState } from "react";
import LoginForm from "./LoginForm";

function Login(props) {
  const defaultInput = {
    email: "",
    password: "",
    errors: {}
  };
  const [input, setInput] = useState(defaultInput);

  const handleChange = e =>
    setInput({ ...input, [e.target.id]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    const userData = {
      email: input.email,
      password: input.password
    };

    console.log(userData);

    fetch("http://localhost:8000/users/login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(response => {
        if (response.status === 200) {
          props.history.push("/");
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  return <LoginForm handleChange={handleChange} handleSubmit={handleSubmit} />;
}

export default Login;
