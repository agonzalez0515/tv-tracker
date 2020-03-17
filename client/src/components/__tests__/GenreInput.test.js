import React from "react";
import { render, fireEvent } from "@testing-library/react";
import GenreInput from "../GenreInput";

describe("Genre Select Input", () => {
  test("it renders without a problem", () => {
    const { getByLabelText } = render(<GenreInput />);
    const select = getByLabelText(/Genre/i);

    expect(select).toBeInTheDocument();
  });

  test("it displays options when clicked", () => {
    const { getByLabelText } = render(<GenreInput />);
    const select = getByLabelText(/Genre/i);
    fireEvent.change(select, { target: { value: "action" } });

    expect(select.value).toBe("action");
  });
});
