import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { authState } from "../../../context/AuthContext";
import NavBar from "../NavBar";

describe("Navigation bar", () => {
  test("it has a home link", () => {
    const { getByText } = render(
      <authState.Provider value={{ state: { loggedIn: false } }}>
        <Router>
          <NavBar />
        </Router>
      </authState.Provider>
    );

    expect(getByText(/telly tracker/i)).toBeInTheDocument();
  });

  test("it has an icon", () => {
    const { getByTestId } = render(
      <authState.Provider value={{ state: { loggedIn: false } }}>
        <Router>
          <NavBar />
        </Router>
      </authState.Provider>
    );

    expect(getByTestId("cameraIcon")).toBeInTheDocument();
  });
});
