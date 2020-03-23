import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import GenreInput from "../GenreInput";

describe("Genre Select Input", () => {
  test("it renders without a problem", () => {
    const { getByTestId } = render(<GenreInput />);
    const select = getByTestId("genre-input");

    expect(select).toBeInTheDocument();
  });

  xtest("an option can be selected", async () => {
    const { getByLabelText, getByText } = render(<GenreInput />);

    const getSelectItem = (getByLabelText, getByText) => async (
      selectLabel,
      itemText
    ) => {
      const select = getByLabelText(selectLabel);
      fireEvent.keyDown(select),
        {
          key: "ArrowDown",
          code: 40
        };
      const option = await waitForElement(() => getByText(itemText));
      fireEvent.click(option);
    };
    const selectItem = getSelectItem(getByLabelText, getByText);
    await selectItem("Genre", "Drama");

    expect(getByLabelText("Genre").value).toBe("drama");
  });
});
