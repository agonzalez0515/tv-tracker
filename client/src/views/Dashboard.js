import React from "react";
import PieChart from "react-minimal-pie-chart";
import { useQuery } from "@apollo/react-hooks";
import { GET_TV_SHOWS } from "../api/graphqlQueries";
import Loading from "../components/Loading";
import { useAuth } from "../context/auth/AuthContext";
import { randomHexColor } from "../utils/helpers";

function Dashboard() {
  const { email } = useAuth();

  const { data, loading, error } = useQuery(GET_TV_SHOWS, {
    variables: { email }
  });

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  const totalTime = () => {
    return data.user.tv_shows
      .map(show => parseInt(show.time_watching))
      .reduce((a, b) => a + b, 0);
  };

  const chartShows = () =>
    data.user.tv_shows.map(show => {
      return {
        title: show.name,
        value: parseInt(show.time_watching),
        color: randomHexColor()
      };
    });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <h1>Dashboard</h1>
      <h2>You have watched {totalTime()} minutes of tv!</h2>
      <div style={{ width: "25%" }}>
        <PieChart
          label
          labelPosition={50}
          labelStyle={{
            fill: "#121212",
            fontFamily: "sans-serif",
            fontSize: "5px"
          }}
          viewBoxSize={[100, 100]}
          cx={50}
          cy={50}
          data={chartShows()}
        />
      </div>
    </div>
  );
}

export default Dashboard;
