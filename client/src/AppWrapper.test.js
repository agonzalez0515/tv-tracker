import React from "react";
import { shallow } from "enzyme";
import AppWrapper from "./AppWrapper";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";

describe("<AppWrapper/>", () => {
  it("has an Auth Provider ", () => {
    const wrapper = shallow(<AppWrapper />);

    expect(wrapper.find(AuthProvider).exists()).toBe(true);
  });

  it("has a Browser Router ", () => {
    const wrapper = shallow(<AppWrapper />);

    expect(wrapper.find(BrowserRouter).exists()).toBe(true);
  });
});
