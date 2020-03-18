import React from "react";
import { render, fireEvent, cleanup, wait } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import { AuthProvider } from "../../context/auth/AuthContext";
import { ADD_TV_SHOW } from "../../api/graphqlQueries";
import NewShowDialog from "../NewShowDialog";

describe("New Tv Show Dialog", () => {
  afterEach(() => {
    cleanup();
  });

  let returnedData = {
    id: 1,
    name: "test show",
    genre: "comedy",
    date_started: "1584382740874",
    date_finished: null,
    time_watching: "30"
  };
  let mocks = [
    {
      request: {
        query: ADD_TV_SHOW,
        variables: {
          name: "test show",
          dateStarted: "03-12-2020",
          genre: "comedy",
          time: "30"
        }
      },
      result: { data: { returnedData } }
    }
  ];

  let handleClose = jest.fn();

  test("it has a title", () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthProvider>
          <NewShowDialog isOpen={true} handleClose={handleClose} />
        </AuthProvider>
      </MockedProvider>
    );
    const title = getByText(/Add a new tv show to track!/i);

    expect(title).toBeInTheDocument();
  });

  xtest("it shows a success message when form is submitted successfully", async () => {
    // https://codesandbox.io/s/mui-input-gz10c works here
    let { container, getByText, getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthProvider>
          <NewShowDialog isOpen={true} handleClose={handleClose} />
        </AuthProvider>
      </MockedProvider>
    );

    console.log(container);
    let input = container.querySelector("input[name='showName']");
    console.log(input); //returns null, why?
    fireEvent.change(input, { target: { value: "a" } });

    fireEvent.submit(getByTestId("newShowForm"));

    await wait(() => {
      expect(getByText(/Saved/)).toBeInTheDocument();
    });
  });
});
