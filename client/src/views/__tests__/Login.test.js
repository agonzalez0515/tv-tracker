import React from "react";
import { cleanup, fireEvent, wait } from "@testing-library/react";
import renderWithRouter from "../../setupTests";
import { AuthProvider } from "../../context/auth/AuthContext";
import Login from "../Login";

describe("Login page", () => {
  afterEach(() => {
    fetch.resetMocks();
    cleanup();
  });

  test("it redirects after login successful", async () => {
    fetch.mockResponseOnce(JSON.stringify({ body: "testEmail" }));
    const { history, getByRole, getByLabelText } = renderWithRouter(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );
    const emailInput = getByLabelText(/Email Address/i);
    fireEvent.change(emailInput, { target: { value: "test@email.com" } });
    const pwInput = getByLabelText(/Password/i);
    fireEvent.change(pwInput, { target: { value: "test" } });
    const loginButton = getByRole("button");
    fireEvent.click(loginButton);

    await wait(() => expect(history.location.pathname).toEqual("/"));
  });

  test("it displays an error when login is not successful", async () => {
    fetch.mockReject(() => Promise.reject("fake error message"));
    const { getByRole, getByLabelText, getByText } = renderWithRouter(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );
    const emailInput = getByLabelText(/Email Address/i);
    fireEvent.change(emailInput, { target: { value: "test@email.com" } });
    const pwInput = getByLabelText(/Password/i);
    fireEvent.change(pwInput, { target: { value: "test" } });
    const loginButton = getByRole("button");
    fireEvent.click(loginButton);

    await wait(() =>
      expect(getByText(/Oops/).textContent).toEqual("Oops, fake error message")
    );
  });
});
