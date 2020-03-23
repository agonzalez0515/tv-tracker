import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { NewShowForm } from "../NewShowForm";

describe("New Tv Show form", () => {
  let handleClose = jest.fn();
  let handleSubmit = jest.fn();

  test("it has a name input", () => {
    const { getByLabelText } = render(
      <NewShowForm handleSubmit={handleSubmit} handleClose={handleClose} />
    );
    const input = getByLabelText(/Name/i);

    expect(input).toBeInTheDocument();
  });

  test("it has a date started watching input", () => {
    const { getByLabelText } = render(
      <NewShowForm handleSubmit={handleSubmit} handleClose={handleClose} />
    );
    const input = getByLabelText(/Date you started watching/i);

    expect(input).toBeInTheDocument();
  });

  test("it has a genre dropdown", () => {
    const { getByLabelText } = render(
      <NewShowForm handleSubmit={handleSubmit} handleClose={handleClose} />
    );
    const input = getByLabelText(/Genre/i);

    expect(input).toBeInTheDocument();
  });

  test("it has buttons to add and subtract time watching", () => {
    const { getAllByText } = render(
      <NewShowForm handleSubmit={handleSubmit} handleClose={handleClose} />
    );
    const buttons = getAllByText(/30 min/i);

    expect(buttons.length).toBe(2);
  });

  test("it has a submit button", () => {
    const { getByText } = render(
      <NewShowForm handleSubmit={handleSubmit} handleClose={handleClose} />
    );
    const button = getByText(/Submit/i);

    expect(button).toBeInTheDocument();
  });

  test("clicking submit calls submit handler", () => {
    const { getByTestId } = render(
      <NewShowForm handleSubmit={handleSubmit} handleClose={handleClose} />
    );
    fireEvent.submit(getByTestId("newShowForm"));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  test("it has a cancel button", () => {
    const { getByText } = render(
      <NewShowForm handleSubmit={handleSubmit} handleClose={handleClose} />
    );
    const button = getByText(/Cancel/i);

    expect(button).toBeInTheDocument();
  });

  test("clicking cancel button calls close handler", () => {
    const { getByText } = render(
      <NewShowForm handleSubmit={handleSubmit} handleClose={handleClose} />
    );
    fireEvent.click(getByText(/Cancel/i).closest("button"));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
