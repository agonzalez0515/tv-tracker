import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { loginUser } from "../api/authentication";
import { useAuth } from "../context/auth/AuthContext";
import LoginForm from "../components/auth/LoginForm";

function Login() {
  const defaultInput = {
    email: "",
    password: "",
    error: ""
  };
  const [input, setInput] = useState(defaultInput);
  const { login, setUserEmail } = useAuth();
  const history = useHistory();

  const handleChange = e =>
    setInput({ ...input, [e.target.id]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    const userData = {
      email: input.email,
      password: input.password
    };

    loginUser(userData)
      .then(body => {
        history.push("/");
        login();
        setUserEmail(body.email);
      })
      .catch(error => setInput({ ...input, error: `Oops, ${error}` }));
  };

  return (
    <div>
      <LoginForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        error={input.error}
      />
    </div>
  );
}

export default Login;
