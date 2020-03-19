import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useAuth, AuthProvider } from "./AuthContext";

describe("logged in state", () => {
  let TestComponent = () => {
    const { login, isLoggedIn, logout } = useAuth();
    return (
      <>
        <div data-testid="loggedInStatus">{isLoggedIn.toString()}</div>
        <button data-testid="loginButton" onClick={login}>
          Login
        </button>
        <button data-testid="logoutButton" onClick={logout}>
          logout
        </button>
      </>
    );
  };

  describe("login", () => {
    test("calling login() sets isLoggedIn to true", () => {
      const { getByTestId } = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
      const loginStatus = getByTestId("loggedInStatus");
      const loginButton = getByTestId("loginButton");

      expect(loginStatus.textContent).toBe("false");
      fireEvent.click(loginButton);

      expect(loginStatus.textContent).toBe("true");
    });
  });

  describe("logout", () => {
    test("calling logout() sets isLoggedIn to false", () => {
      const { getByTestId } = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
      const loginStatus = getByTestId("loggedInStatus");
      const loginButton = getByTestId("loginButton");
      const logoutButton = getByTestId("logoutButton");

      expect(loginStatus.textContent).toBe("false");
      fireEvent.click(loginButton);
      expect(loginStatus.textContent).toBe("true");
      fireEvent.click(logoutButton);
      expect(loginStatus.textContent).toBe("false");
    });
  });
});

describe("email state", () => {
  let TestComponent = () => {
    const { email, setUserEmail } = useAuth();

    const handleEmail = () => setUserEmail("test@test.com");

    return (
      <>
        <div data-testid="email">{email}</div>
        <button data-testid="emailButton" onClick={handleEmail}>
          Add Email
        </button>
      </>
    );
  };

  test("it sets the email to a string", () => {
    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    const emailText = getByTestId("email");
    const emailButton = getByTestId("emailButton");

    fireEvent.click(emailButton);

    expect(emailText.textContent).toBe("test@test.com");
  });
});
