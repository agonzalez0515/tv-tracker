import React, { useReducer } from "react";

const LOGIN = "login";

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
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { authState, AuthProvider };
