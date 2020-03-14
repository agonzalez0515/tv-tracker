import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { authState } from "../context/AuthContext";
import LoginForm from "../components/auth/LoginForm";

function Login() {
  const defaultInput = {
    email: "",
    password: "",
    errors: {}
  };
  const [input, setInput] = useState(defaultInput);
  const { dispatch } = useContext(authState);
  const history = useHistory();

  const handleChange = e =>
    setInput({ ...input, [e.target.id]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    const userData = {
      email: input.email,
      password: input.password
    };

    fetch("/users/login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(response => response.json())
      .then(body => {
        history.push("/");
        dispatch({
          type: "login",
          payload: { loggedIn: true, email: body.email }
        });
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  return <LoginForm handleChange={handleChange} handleSubmit={handleSubmit} />;
}

export default Login;
