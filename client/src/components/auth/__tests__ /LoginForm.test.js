import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LoginForm from "../LoginForm";

describe("Login Form", () => {
  test("Form has an email field", () => {
    const handleChange = jest.fn();
    const handleSubmit = jest.fn();

    const { getByLabelText } = render(
      <LoginForm handleChange={handleChange} handleSubmit={handleSubmit} />
    );
    const emailField = getByLabelText(/Email Address/i);
    expect(emailField).toBeInTheDocument();
  });

  test("Form has an password field", () => {
    const handleChange = jest.fn();
    const handleSubmit = jest.fn();

    const { getByLabelText } = render(
      <LoginForm handleChange={handleChange} handleSubmit={handleSubmit} />
    );
    const passwordField = getByLabelText(/Password/i);
    expect(passwordField).toBeInTheDocument();
  });

  test("Form has login button", () => {
    const handleChange = jest.fn();
    const handleSubmit = jest.fn();

    const { getAllByText } = render(
      <LoginForm handleChange={handleChange} handleSubmit={handleSubmit} />
    );
    const Logins = getAllByText(/Login/i);

    expect(Logins.length).toBeGreaterThan(0);
  });
});
