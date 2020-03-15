import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { authState } from "../context/AuthContext";
import CircularProgress from "@material-ui/core/CircularProgress";

function Dashboard() {
  const {
    state: { email }
  } = useContext(authState);

  const { data, loading, error } = useQuery(TOTAL_WATCHING_TIME, {
    variables: { email }
  });
  console.log(data);

  if (loading) return <CircularProgress />;

  const totalTime = () => {
    return data.user.tv_shows
      .map(show => parseInt(show.time_watching))
      .reduce((a, b) => a + b, 0);
  };
  return <h1>you've watched {totalTime()} minutes of tv</h1>;
}

export default Dashboard;

const TOTAL_WATCHING_TIME = gql`
  query TvShows($email: String!) {
    user(email: $email) {
      tv_shows {
        id
        time_watching
      }
    }
  }
`;
