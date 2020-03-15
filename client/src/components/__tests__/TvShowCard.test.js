import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TvShowCard from "../TvShowCard";

describe("Tv Show Card", () => {
  let showInfo = {
    name: "Mad Men",
    genre: "drama",
    time_watching: "60",
    date_started: "1584148623470"
  };

  test("it has a title", () => {
    const { getByText } = render(<TvShowCard showInfo={showInfo} />);
    const title = getByText(/Mad Men/i);

    expect(title).toBeInTheDocument();
  });

  test("it has a date started watching", () => {
    const { getByText } = render(<TvShowCard showInfo={showInfo} />);
    const date = getByText(/3-14-2020/i);

    expect(date).toBeInTheDocument;
  });

  test("it has a time spent watching", () => {
    const { getByText } = render(<TvShowCard showInfo={showInfo} />);
    const time = getByText(/60/i);

    expect(time).toBeInTheDocument;
  });

  test("it has a genre watching", () => {
    const { getByText } = render(<TvShowCard showInfo={showInfo} />);
    const genre = getByText(/drama/i);

    expect(genre).toBeInTheDocument;
  });

  test("it has a button to add more timr", () => {
    const { getByText } = render(<TvShowCard showInfo={showInfo} />);
    const button = getByText(/Add Time Spent Watching/i);

    expect(button).toBeInTheDocument;
  });
});
