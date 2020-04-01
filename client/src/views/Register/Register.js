import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { registerUser } from "../../api/users";

export default function Register() {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = e => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (input.password !== input.confirmPassword) {
      setErrors([...errors, "Passwords do not match"]);
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
      .catch(err => {
        setErrors([...errors, err]);
      });
  };

  return (
    <div>
      <p>register page</p>
      {!!errors.length && <Errors errors={errors} />}
      <RegisterForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formValues={input}
      />
    </div>
  );
}

function Errors({ errors }) {
  return errors.map(error => (
    <p className="error" key={error}>
      {error}
    </p>
  ));
}
