import React from "react";
import { MemoryRouter } from "react-router-dom";
import { shallow, mount } from "enzyme";
import App from "./App";
import Dashboard from "./views/Dashboard";
import Watching from "./views/Watching/Watching";
import { AuthContext } from "./context/AuthContext";

it("has a title", () => {
  const wrapper = shallow(<App />);

  expect(wrapper.find(".title").text()).toEqual("Hello World");
});

it("navigates to dashboard page", () => {
  const wrapper = mount(
    <AuthContext.Provider value={{ isLoggedIn: true }}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </AuthContext.Provider>
  );

  const link = wrapper.find("a.navbar__dashboard-link");
  link.simulate("click", { button: 0 });

  expect(wrapper.find(Dashboard)).toHaveLength(1);
});

it("navigates to watching page", () => {
  const wrapper = mount(
    <AuthContext.Provider value={{ isLoggedIn: true }}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </AuthContext.Provider>
  );

  const link = wrapper.find("a.navbar__watching-link");
  link.simulate("click", { button: 0 });

  expect(wrapper.find(Watching)).toHaveLength(1);
});
