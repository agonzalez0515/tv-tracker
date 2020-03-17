import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LoginForm from "../LoginForm";

describe("Login Form", () => {
  let handleChange = jest.fn();
  let handleSubmit = jest.fn();

  test("Form has an email field", () => {
    const { getByLabelText } = render(
      <LoginForm handleChange={handleChange} handleSubmit={handleSubmit} />
    );
    const emailField = getByLabelText(/Email Address/i);
    expect(emailField).toBeInTheDocument();
  });

  test("Form has an password field", () => {
    const { getByLabelText } = render(
      <LoginForm handleChange={handleChange} handleSubmit={handleSubmit} />
    );
    const passwordField = getByLabelText(/Password/i);
    expect(passwordField).toBeInTheDocument();
  });

  test("Form has login button", () => {
    const { getAllByText } = render(
      <LoginForm handleChange={handleChange} handleSubmit={handleSubmit} />
    );
    const Logins = getAllByText(/Login/i);
    //todo fix this using sibling selector
    expect(Logins.length).toBeGreaterThan(0);
  });
});
