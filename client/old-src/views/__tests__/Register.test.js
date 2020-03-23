import React from "react";
import { cleanup, fireEvent, wait } from "@testing-library/react";
import renderWithRouter from "../../setupTests";
import Register from "../Register";

describe("Register page", () => {
  afterEach(() => {
    fetch.resetMocks();
    cleanup();
  });

  test("it displays an error when passwords don't match", () => {
    const {
      getByRole,
      getAllByLabelText,
      getByLabelText,
      getByText
    } = renderWithRouter(<Register />);
    const emailInput = getByLabelText(/Email Address/i);
    fireEvent.change(emailInput, { target: { value: "test@email.com" } });
    const pwInput = getAllByLabelText(/Password/i);
    fireEvent.change(pwInput[0], { target: { value: "test" } });
    fireEvent.change(pwInput[1], { target: { value: "different" } });
    const registerButton = getByRole("button");
    fireEvent.click(registerButton);

    expect(getByText(/Passwords do not match/i)).toBeInTheDocument();
  });

  test("it redirects after registration is successful", async () => {
    fetch.mockResponseOnce(JSON.stringify({ body: "testEmail" }));
    const {
      history,
      getByRole,
      getAllByLabelText,
      getByLabelText
    } = renderWithRouter(<Register />);
    const emailInput = getByLabelText(/Email Address/i);
    fireEvent.change(emailInput, { target: { value: "test@email.com" } });
    const pwInput = getAllByLabelText(/Password/i);
    fireEvent.change(pwInput[0], { target: { value: "test" } });
    fireEvent.change(pwInput[1], { target: { value: "test" } });
    const registerButton = getByRole("button");
    fireEvent.click(registerButton);

    await wait(() => expect(history.location.pathname).toEqual("/login"));
  });

  test("it displays an error when register is not successful", async () => {
    fetch.mockReject("fake error message");
    const {
      getByRole,
      getByLabelText,
      getByText,
      getAllByLabelText
    } = renderWithRouter(<Register />);
    const emailInput = getByLabelText(/Email Address/i);
    fireEvent.change(emailInput, { target: { value: "test@email.com" } });
    const pwInput = getAllByLabelText(/Password/i);
    fireEvent.change(pwInput[0], { target: { value: "test" } });
    fireEvent.change(pwInput[1], { target: { value: "test" } });
    const registerButton = getByRole("button");
    fireEvent.click(registerButton);

    await wait(() =>
      expect(getByText(/fake error message/i)).toBeInTheDocument()
    );
  });
});
