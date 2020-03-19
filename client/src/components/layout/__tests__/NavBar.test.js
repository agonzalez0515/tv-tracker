import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import renderWithRouter from "../../../setupTests";
import { AuthContext } from "../../../context/auth/AuthContext";
import NavBar from "../NavBar";

describe("Navigation bar", () => {
  test("it has a home link", () => {
    const { getByText } = render(
      <AuthContext.Provider value={{ isLoggedIn: false }}>
        <Router>
          <NavBar />
        </Router>
      </AuthContext.Provider>
    );

    expect(getByText(/telly tracker/i)).toBeInTheDocument();
  });

  test("it has an icon", () => {
    const { getByTestId } = render(
      <AuthContext.Provider value={{ isLoggedIn: false }}>
        <Router>
          <NavBar />
        </Router>
      </AuthContext.Provider>
    );

    expect(getByTestId("cameraIcon")).toBeInTheDocument();
  });

  test("user is redirected to home page after clicking logout button", async () => {
    fetch.mockResponseOnce(JSON.stringify({ status: 200 }));
    const { getByText, history } = renderWithRouter(
      <AuthContext.Provider value={{ isLoggedIn: true }}>
        <NavBar />
      </AuthContext.Provider>
    );
    const button = getByText(/log out/i);
    fireEvent.click(button);

    await wait(() => expect(history.location.pathname).toEqual("/"));
  });
});
