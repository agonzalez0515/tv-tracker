import React, { useState } from "react";
import RegisterForm from "../components/auth/RegisterForm";

function Register(props) {
  const defaultInput = {
    email: "",
    password: "",
    confirmPassword: "",
    errors: ""
  };
  const [input, setInput] = useState(defaultInput);

  const handleChange = e =>
    setInput({ ...input, [e.target.id]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    if (input.password !== input.confirmPassword) {
      setInput({ ...input, errors: "Passwords do not match" });
      return;
    }

    const newUser = {
      email: input.email,
      password: input.password
    };

    fetch("/users/register", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status === 200) {
          props.history.push("/login");
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  return (
    <RegisterForm
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      errors={input.errors}
    />
  );
}

export default Register;
