import React from "react";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import Register from "./Register";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { registerUser } from "../../api/users";

jest.mock("../../api/users");

function fillOutAndSubmitForm(wrapper, email, pw, confirmPw) {
  wrapper
    .find("#email")
    .simulate("change", { target: { value: email, id: "email" } });
  wrapper
    .find("#password")
    .simulate("change", { target: { value: pw, id: "password" } });
  wrapper.find("#confirmPassword").simulate("change", {
    target: { value: confirmPw, id: "confirmPassword" }
  });
  wrapper.find("form").simulate("submit");
}

describe("<Register />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter initialEntries={["/register"]}>
        <Register />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("has a register form", () => {
    expect(wrapper.find(RegisterForm).exists()).toBe(true);
  });

  it("does not display any errors at initial mounting", () => {
    expect(wrapper.find(".error").exists()).toBe(false);
  });

  it("captures user input when form is submitted", () => {
    registerUser.mockResolvedValueOnce("yay");

    fillOutAndSubmitForm(wrapper, "test@email.com", "myPassword", "myPassword");

    expect(registerUser).toHaveBeenCalledTimes(1);
    expect(registerUser).toHaveBeenCalledWith({
      email: "test@email.com",
      password: "myPassword"
    });
  });

  it("shows an error when the password and confirm password do not match", () => {
    fillOutAndSubmitForm(
      wrapper,
      "test@email.com",
      "myPassword",
      "wrongPassword"
    );

    expect(registerUser).not.toHaveBeenCalled();
    expect(wrapper.find(".error").exists()).toBe(true);
  });

  it("does not show an error when the password and confirm password match", () => {
    registerUser.mockResolvedValueOnce("yay");
    fillOutAndSubmitForm(wrapper, "test@email.com", "myPassword", "myPassword");

    expect(wrapper.find(".error").exists()).toBe(false);
  });

  it("displays an error if there was an error response from the API", async () => {
    registerUser.mockRejectedValueOnce("This is an error");

    wrapper.find("#email").simulate("change", {
      target: { value: "email", id: "email" }
    });
    wrapper.find("#password").simulate("change", {
      target: { value: "pw", id: "password" }
    });
    wrapper.find("#confirmPassword").simulate("change", {
      target: { value: "pw", id: "confirmPassword" }
    });

    await act(async () => {
      await wrapper.find("form").simulate("submit");
    });
    wrapper.update();

    expect(registerUser).toHaveBeenCalledTimes(1);
    expect(wrapper.find(".error").exists()).toBe(true);
    expect(wrapper.find(".error").text()).toEqual("This is an error");
  });

  it("redirects when registering is successful", async () => {
    registerUser.mockResolvedValueOnce("yay");

    wrapper
      .find("#email")
      .simulate("change", { target: { value: "email", id: "email" } });
    wrapper
      .find("#password")
      .simulate("change", { target: { value: "pw", id: "password" } });
    wrapper.find("#confirmPassword").simulate("change", {
      target: { value: "pw", id: "confirmPassword" }
    });

    await act(async () => {
      wrapper.find("form").simulate("submit");
    });
    wrapper.update();

    expect(registerUser).toHaveBeenCalledTimes(1);
    expect(wrapper.find("Router").prop("history").location.pathname).toEqual(
      "/login"
    );
  });
});
