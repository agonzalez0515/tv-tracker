import React from "react";
import { render } from "@testing-library/react";
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
    const { getByRole } = render(
      <LoginForm handleChange={handleChange} handleSubmit={handleSubmit} />
    );
    const loginButton = getByRole("button");

    expect(loginButton.textContent).toBe("Login");
  });
});
