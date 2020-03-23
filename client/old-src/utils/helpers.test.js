import { formatResponseDate } from "./helpers";

describe("formatResponseDate", () => {
  test("it returns a date string from a milliseconds string", () => {
    const date = "1584488929206";
    const dateString = formatResponseDate(date);

    expect(dateString).toBe("3-17-2020");
  });
});
