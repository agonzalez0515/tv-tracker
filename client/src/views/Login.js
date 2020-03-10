import React, { useState, useContext } from "react";
import { authState } from "../context/AuthContext";
import LoginForm from "../components/auth/LoginForm";

function Login(props) {
  const defaultInput = {
    email: "",
    password: "",
    errors: {}
  };
  const [input, setInput] = useState(defaultInput);
  const { dispatch } = useContext(authState);

  const handleChange = e =>
    setInput({ ...input, [e.target.id]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    const userData = {
      email: input.email,
      password: input.password
    };

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
          dispatch({ type: "login", payload: true });
          console.log(props);
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
