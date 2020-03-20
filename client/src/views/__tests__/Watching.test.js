import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import { AuthContext } from "../../context/auth/AuthContext";
import { GET_TV_SHOWS } from "../../api/graphqlQueries";
import Watching from "../Watching";

describe("Watching page", () => {
  let twoShowsResponse = [
    {
      request: {
        query: GET_TV_SHOWS,
        variables: {
          email: "test"
        }
      },
      result: {
        data: {
          user: {
            tv_shows: [
              {
                id: 1,
                name: "test show",
                genre: "comedy",
                date_started: "1584382740874",
                time_watching: "30"
              },
              {
                id: 2,
                name: "a different show",
                genre: "drama",
                date_started: "1584382740874",
                time_watching: "120"
              }
            ]
          }
        }
      }
    }
  ];

  let noShowsResponse = [
    {
      request: {
        query: GET_TV_SHOWS,
        variables: {
          email: "test"
        }
      },
      result: {
        data: {
          user: {
            tv_shows: []
          }
        }
      }
    }
  ];

  test("it should render loading state initially", () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[]}>
        <AuthContext.Provider value={{ email: "test" }}>
          <Watching />
        </AuthContext.Provider>
      </MockedProvider>
    );
    const loadingSpinner = getByTestId("loadingState");

    waitForElement(() => expect(loadingSpinner).toBeInTheDocument());
  });

  test("it displays a grid of tv show cards", () => {
    const { getByText } = render(
      <MockedProvider mocks={twoShowsResponse} addTypename={false}>
        <AuthContext.Provider value={{ email: "test" }}>
          <Watching />
        </AuthContext.Provider>
      </MockedProvider>
    );

    waitForElement(() => {
      expect(getByText(/test show/i)).toBeInTheDocument();
      expect(getByText(/a different show/i)).toBeInTheDocument();
    });
  });

  test("it displays a message to add a tv show when there are none", () => {
    const { getByText } = render(
      <MockedProvider mocks={noShowsResponse} addTypename={false}>
        <AuthContext.Provider value={{ email: "test" }}>
          <Watching />
        </AuthContext.Provider>
      </MockedProvider>
    );

    waitForElement(() =>
      expect(getByText(/You're not tracking/i)).toBeInTheDocument()
    );
  });

  test("it displays a form to add a new show when button is clicked", () => {
    const { getByText } = render(
      <MockedProvider mocks={noShowsResponse} addTypename={false}>
        <AuthContext.Provider value={{ email: "test" }}>
          <Watching />
        </AuthContext.Provider>
      </MockedProvider>
    );

    waitForElement(() => {
      const button = getByText(/Add New Tv Show/i);
      fireEvent.click(button);

      expect(getByText(/Add a new tv show to track!/i)).toBeInTheDocument();
    });
  });
});
