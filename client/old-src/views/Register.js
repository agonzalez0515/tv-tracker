import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";
import { registerUser } from "../api/authentication";

function Register() {
  const defaultInput = {
    email: "",
    password: "",
    confirmPassword: "",
    errors: ""
  };
  const [input, setInput] = useState(defaultInput);
  const history = useHistory();

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

    registerUser(newUser)
      .then(() => {
        history.push("/login");
      })
      .catch(error => setInput({ ...input, errors: error }));
  };

  return (
    <div>
      <RegisterForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        errors={input.errors}
      />
    </div>
  );
}

export default Register;
