import React from "react";
import { shallow } from "enzyme";
import NavBar from "./NavBar";
import { useAuth } from "../../context/AuthContext";
jest.mock("../../context/AuthContext");

describe("<NavBar />", () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("has a title that links to the homepage if isLoggedIn is false", () => {
    useAuth.mockReturnValue({ isLoggedIn: false });
    const wrapper = shallow(<NavBar />);
    const link = wrapper.find(".navbar__home-link");

    expect(link.exists()).toBe(true);
    expect(link.text()).toEqual("Telly Tracker");
    expect(link.props().to).toBe("/");
  });

  it("has a title that links to the homepage if isLoggedIn is true", () => {
    useAuth.mockReturnValue({ isLoggedIn: true });
    const wrapper = shallow(<NavBar />);
    const link = wrapper.find(".navbar__home-link");

    expect(link.exists()).toBe(true);
    expect(link.text()).toEqual("Telly Tracker");
    expect(link.props().to).toBe("/");
  });

  it("has a register link if isLoggedIn is false", () => {
    useAuth.mockReturnValue({ isLoggedIn: false });
    const wrapper = shallow(<NavBar />);
    const link = wrapper.find(".navbar__register-link");

    expect(link.exists()).toBe(true);
    expect(link.text()).toEqual("register");
    expect(link.props().to).toBe("/register");
  });

  it("does not have a register link if isLoggedIn is true", () => {
    useAuth.mockReturnValue({ isLoggedIn: true });
    const wrapper = shallow(<NavBar />);
    const link = wrapper.find(".navbar__register-link");

    expect(link.exists()).toBe(false);
  });

  it("has a login link if isLoggedIn is false", () => {
    useAuth.mockReturnValue({ isLoggedIn: false });
    const wrapper = shallow(<NavBar />);
    const link = wrapper.find(".navbar__login-link");

    expect(link.exists()).toBe(true);
    expect(link.text()).toEqual("login");
    expect(link.props().to).toBe("/login");
  });

  it("does not have a login link if isLoggedIn is true", () => {
    useAuth.mockReturnValue({ isLoggedIn: true });
    const wrapper = shallow(<NavBar />);
    const link = wrapper.find(".navbar__login-link");

    expect(link.exists()).toBe(false);
  });

  it("has a logout button if isLoggedIn is true", () => {
    useAuth.mockReturnValue({ isLoggedIn: true });
    const wrapper = shallow(<NavBar />);
    const link = wrapper.find(".navbar__logout-link");

    expect(link.exists()).toBe(true);
    expect(link.text()).toEqual("logout");
  });

  it("does not have a logout button if isLoggedIn is false", () => {
    useAuth.mockReturnValue({ isLoggedIn: false });
    const wrapper = shallow(<NavBar />);
    const link = wrapper.find(".navbar__logout-link");

    expect(link.exists()).toBe(false);
  });

  it("has a watching link if isLoggedIn is true", () => {
    useAuth.mockReturnValue({ isLoggedIn: true });
    const wrapper = shallow(<NavBar />);
    const link = wrapper.find(".navbar__watching-link");

    expect(link.exists()).toBe(true);
    expect(link.text()).toEqual("watching");
    expect(link.props().to).toBe("/watching");
  });

  it("does not have a watching link if isLoggedIn is false", () => {
    useAuth.mockReturnValue({ isLoggedIn: false });
    const wrapper = shallow(<NavBar />);
    const link = wrapper.find(".navbar__watching-link");

    expect(link.exists()).toBe(false);
  });

  it("has a dashboard link if isLoggedIn is true", () => {
    useAuth.mockReturnValue({ isLoggedIn: true });
    const wrapper = shallow(<NavBar />);
    const link = wrapper.find(".navbar__dashboard-link");

    expect(link.exists()).toBe(true);
    expect(link.text()).toEqual("dashboard");
    expect(link.props().to).toBe("/dashboard");
  });

  it("does not have a dashboard link if isLoggedIn is false", () => {
    useAuth.mockReturnValue({ isLoggedIn: false });
    const wrapper = shallow(<NavBar />);
    const link = wrapper.find(".navbar__dashboard-link");

    expect(link.exists()).toBe(false);
  });
});
