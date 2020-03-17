import React, { useReducer, useContext } from "react";
import { LOGIN, LOGGED_OUT } from "./types";

const initialState = {
  loggedIn: false,
  email: ""
};

const authState = React.createContext(initialState);
const { Provider } = authState;

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case LOGIN:
        return {
          ...state,
          loggedIn: action.payload.loggedIn,
          email: action.payload.email
        };
      case LOGGED_OUT:
        return {
          ...state,
          loggedIn: action.payload.loggedIn
        };
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

const useAuth = () => useContext(authState);

export { authState, AuthProvider, useAuth };
