import React from "react";
import { shallow } from "enzyme";
import Watching from "./Watching";

describe("Watching page", () => {
  it("return a string", () => {
    const wrapper = shallow(<Watching />);

    expect(wrapper.find("p").text()).toEqual("watching stuff");
  });
});
