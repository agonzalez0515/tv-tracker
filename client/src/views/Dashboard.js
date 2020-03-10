import React from "react";
import useAuth from "../components/auth/useAuth";

function Dashboard() {
  return <h1>protected dashboard, hey ho</h1>;
}

function ProtectedDashboard(props) {
  return useAuth(props) && <Dashboard {...props} />;
}

export default ProtectedDashboard;
