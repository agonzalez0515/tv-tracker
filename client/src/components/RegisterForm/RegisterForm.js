import React from "react";
import PropTypes from "prop-types";
import "./registerForm.css";

export default function RegisterForm({
  handleChange,
  handleSubmit,
  formValues
}) {
  return (
    <div className="register__container">
      <form className="register__form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={formValues.email}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
            value={formValues.password}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            value={formValues.confirmPassword}
            required
          />
        </div>
        <button type="submit" className="registerButton">
          Submit
        </button>
      </form>
    </div>
  );
}

RegisterForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formValues: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired
  })
};
