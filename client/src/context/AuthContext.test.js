import React from "react";
import { mount } from "enzyme";
import { useAuth, AuthProvider } from "./AuthContext";

describe("useAuth context", () => {
  const TestComponent = () => {
    const { isLoggedIn, login, logout } = useAuth();

    return (
      <div>
        <p className="loggedIn">{isLoggedIn.toString()}</p>
        <button className="loginButton" onClick={login}>
          Set login true
        </button>
        <button className="logoutButton" onClick={logout}>
          Set login false
        </button>
      </div>
    );
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
  });

  it("has isLoggedIn set to false", () => {
    expect(wrapper.find(".loggedIn").text()).toBe("false");
  });

  it("can set isLoggedIn to true", () => {
    const button = wrapper.find(".loginButton");
    button.simulate("click");

    expect(wrapper.find(".loggedIn").text()).toBe("true");
  });

  it("can set isLoggedIn to false", () => {
    const loginButton = wrapper.find(".loginButton");
    loginButton.simulate("click");
    expect(wrapper.find(".loggedIn").text()).toBe("true");

    const logoutButton = wrapper.find(".logoutButton");
    logoutButton.simulate("click");
    expect(wrapper.find(".loggedIn").text()).toBe("false");
  });
});
