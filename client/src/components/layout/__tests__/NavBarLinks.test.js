import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { authState } from "../../../context/AuthContext";
import NavBarLinks from "../NavBarLinks";

describe("Navbar links", () => {
  let logOut = jest.fn();

  test("it displays logged out links when user is logged out", () => {
    const { getByText, queryByText } = render(
      <authState.Provider value={{ state: { loggedIn: false } }}>
        <Router>
          <NavBarLinks logOut={logOut} />>
        </Router>
      </authState.Provider>
    );

    expect(getByText(/register/i)).toBeInTheDocument();
    expect(getByText(/login/i)).toBeInTheDocument();
    expect(queryByText(/dashboard/i)).not.toBeInTheDocument();
  });

  test("it displays logged in links when user is logged in", () => {
    const { getByText, queryByText } = render(
      <authState.Provider value={{ state: { loggedIn: true } }}>
        <Router>
          <NavBarLinks logOut={logOut} />>
        </Router>
      </authState.Provider>
    );

    expect(getByText(/dashboard/i)).toBeInTheDocument();
    expect(getByText(/watching/i)).toBeInTheDocument();
    expect(getByText(/log out/i)).toBeInTheDocument();
    expect(queryByText(/register/i)).not.toBeInTheDocument();
  });

  test("it calls log out function when log out button is clicked", async () => {
    const { getByText } = render(
      <authState.Provider value={{ state: { loggedIn: true } }}>
        <Router>
          <NavBarLinks logOut={logOut} />>
        </Router>
      </authState.Provider>
    );
    fireEvent.click(getByText(/log out/i));

    expect(logOut).toHaveBeenCalledTimes(1);
  });

  test("the links are all uppercase", () => {
    const { getByText } = render(
      <authState.Provider value={{ state: { loggedIn: true } }}>
        <Router>
          <NavBarLinks logOut={logOut} />>
        </Router>
      </authState.Provider>
    );
    const link = getByText(/dashboard/i);

    expect(link).toHaveStyle(`text-transform: uppercase`);
  });
});
