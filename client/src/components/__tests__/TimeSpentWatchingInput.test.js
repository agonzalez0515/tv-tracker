import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TimeSpentWatchingInput from "../TimeSpentWatchingInput";

describe("Time Spent Watching Input", () => {
  test("it has a readonly input", () => {
    const { getByLabelText } = render(<TimeSpentWatchingInput />);
    const input = getByLabelText(/How many minutes/i);

    expect(input).toHaveAttribute("readonly");
    expect(input.value).toBe("30");
    fireEvent.change(input, { target: { value: "60" } });
    expect(input.value).toBe("30");
  });

  test("it increases by 30 minutes when button is clicked", () => {
    const { getByText, getByLabelText } = render(<TimeSpentWatchingInput />);
    const addButton = getByText("+ 30 min");
    const input = getByLabelText(/How many minutes/i);
    fireEvent.click(addButton);

    expect(input.value).toBe("60");
  });

  test("it decreases by 30 minutes when button is clicked", () => {
    const { getByText, getByLabelText } = render(<TimeSpentWatchingInput />);
    const minusButton = getByText("- 30 min");
    const input = getByLabelText(/How many minutes/i);
    fireEvent.click(minusButton);

    expect(input.value).toBe("0");
  });

  test("it displays an error when user wants to decrease less than 0", () => {
    const { getByText } = render(<TimeSpentWatchingInput />);
    const minusButton = getByText("- 30 min");
    fireEvent.click(minusButton);
    fireEvent.click(minusButton);

    expect(getByText("Value cannot be negative")).toBeInTheDocument();
  });
});
