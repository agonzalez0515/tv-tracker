import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import RegisterForm from "../RegisterForm";

describe("Register Form", () => {
  test("it has an email field", () => {
    const handleChange = jest.fn();
    const handleSubmit = jest.fn();

    const { getByLabelText } = render(
      <Router>
        <RegisterForm handleChange={handleChange} handleSubmit={handleSubmit} />
      </Router>
    );
    const emailField = getByLabelText(/Email Address/i);
    expect(emailField).toBeInTheDocument();
  });

  test("it has an password field", () => {
    const handleChange = jest.fn();
    const handleSubmit = jest.fn();

    const { getAllByLabelText } = render(
      <Router>
        <RegisterForm handleChange={handleChange} handleSubmit={handleSubmit} />
      </Router>
    );
    const passwordField = getAllByLabelText("Password", { exact: false });
    expect(passwordField[0]).toBeInTheDocument();
  });

  test("it has a confirm password field", () => {
    const handleChange = jest.fn();
    const handleSubmit = jest.fn();

    const { getByLabelText } = render(
      <Router>
        <RegisterForm handleChange={handleChange} handleSubmit={handleSubmit} />
      </Router>
    );
    const confirmPasswordField = getByLabelText(/Confirm your Password/i);
    expect(confirmPasswordField).toBeInTheDocument();
  });

  test("it has a Register button", () => {
    const handleChange = jest.fn();
    const handleSubmit = jest.fn();

    const { getAllByText } = render(
      <Router>
        <RegisterForm handleChange={handleChange} handleSubmit={handleSubmit} />
      </Router>
    );
    const Register = getAllByText(/Register/i);

    expect(Register.length).toBeGreaterThan(0);
  });

  test("it has a link to login page", () => {
    const handleChange = jest.fn();
    const handleSubmit = jest.fn();

    const { getByText } = render(
      <Router>
        <RegisterForm handleChange={handleChange} handleSubmit={handleSubmit} />
      </Router>
    );
    const loginLink = getByText(/Login/i);

    expect(loginLink).toBeInTheDocument();
  });

  test("it displays an error", () => {
    const handleChange = jest.fn();
    const handleSubmit = jest.fn();
    const error = "this is an error";

    const { getByText } = render(
      <Router>
        <RegisterForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          errors={error}
        />
      </Router>
    );
    const errorText = getByText(/this is an error/i);

    expect(errorText).toBeInTheDocument();
  });
});
