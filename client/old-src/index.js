import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { AuthProvider } from "./context/auth/AuthContext";
import App from "./App";

const client = new ApolloClient({
  uri: "/api",
  credentials: "include"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
