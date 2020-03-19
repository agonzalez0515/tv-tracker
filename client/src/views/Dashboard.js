import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Loading from "../components/Loading";
import { useAuth } from "../context/auth/AuthContext";

function Dashboard() {
  const { email } = useAuth();

  const { data, loading, error } = useQuery(TOTAL_WATCHING_TIME, {
    variables: { email }
  });

  const totalTime = () => {
    return data.user.tv_shows
      .map(show => parseInt(show.time_watching))
      .reduce((a, b) => a + b, 0);
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return <h1>you have watched {totalTime()} minutes of tv</h1>;
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
