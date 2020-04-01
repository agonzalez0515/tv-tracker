import React from "react";
import { shallow } from "enzyme";
import RegisterForm from "./RegisterForm";

describe("<RegisterForm />", () => {
  let wrapper;
  let handleSubmit = jest.fn();
  let handleChange = jest.fn();
  let formValues = {
    email: "test",
    password: "random password",
    confirmPassword: "another password"
  };

  beforeEach(() => {
    wrapper = shallow(
      <RegisterForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formValues={formValues}
      />
    );
  });

  it("has an email input field", () => {
    const emailInput = wrapper.find("#email");

    expect(emailInput.exists()).toBe(true);
    expect(emailInput.prop("name")).toEqual("email");
    expect(emailInput.prop("type")).toEqual("email");
  });

  it("has a label for the email input field", () => {
    const label = wrapper.find("[htmlFor='email']");

    expect(label.exists()).toBe(true);
    expect(label.text()).toEqual("Email Address:");
  });

  it("has a password input field", () => {
    const passwordInput = wrapper.find("#password");

    expect(passwordInput.exists()).toBe(true);
    expect(passwordInput.prop("name")).toEqual("password");
    expect(passwordInput.prop("type")).toEqual("password");
  });

  it("has a label for the password input field", () => {
    const label = wrapper.find("[htmlFor='password']");

    expect(label.exists()).toBe(true);
    expect(label.text()).toEqual("Password:");
  });

  it("has a confirm password input field", () => {
    const confirmPwInput = wrapper.find("#confirmPassword");

    expect(confirmPwInput.exists()).toBe(true);
    expect(confirmPwInput.prop("name")).toEqual("confirmPassword");
    expect(confirmPwInput.prop("type")).toEqual("password");
  });

  it("has a label for the confirm password input field", () => {
    const label = wrapper.find("[htmlFor='confirmPassword']");

    expect(label.exists()).toBe(true);
    expect(label.text()).toEqual("Confirm Password:");
  });

  it("has a submit button", () => {
    const button = wrapper.find(".registerButton");

    expect(button.exists()).toBe(true);
    expect(button.text()).toEqual("Submit");
  });

  it("calls submit handler when form is submitted", () => {
    const form = wrapper.find("form");
    form.simulate("submit");

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("calls change handler when fields value change", () => {
    const emailInput = wrapper.find("#email");
    emailInput.simulate("change", { target: { value: "test" } });
    const passwordInput = wrapper.find("#password");
    passwordInput.simulate("change", { target: { value: "test password" } });
    const confirmPwInput = wrapper.find("#confirmPassword");
    confirmPwInput.simulate("change", { target: { value: "test password" } });

    expect(handleChange).toHaveBeenCalledTimes(3);
  });

  it("has input values", () => {
    const emailInput = wrapper.find("#email");
    const passwordInput = wrapper.find("#password");
    const confirmPwInput = wrapper.find("#confirmPassword");

    expect(emailInput.prop("value")).toEqual("test");
    expect(passwordInput.prop("value")).toEqual("random password");
    expect(confirmPwInput.prop("value")).toEqual("another password");
  });
});
