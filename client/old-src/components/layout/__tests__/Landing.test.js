import React from "react";
import { render } from "@testing-library/react";
import Landing from "../Landing";
import cuteTv from "../../../cute-tv-cropped.jpg";

describe("Landing page", () => {
  test("it has a title", () => {
    const { getByText } = render(<Landing />);
    const title = getByText(/Telly Tracker/i);

    expect(title).toBeInTheDocument();
  });

  test("it has a subtitle", () => {
    const { getByText } = render(<Landing />);
    const subtitle = getByText(/all the shows/i);

    expect(subtitle).toBeInTheDocument();
    expect(subtitle.textContent).toBe(
      "Track all the shows you watch and how much time you spent in front of the tv."
    );
  });

  test("it has a background image", () => {
    const { getByTestId } = render(<Landing />);
    const background = getByTestId("heroImage");

    expect(background).toHaveStyle(`background-image: url(${cuteTv})`);
  });
});
