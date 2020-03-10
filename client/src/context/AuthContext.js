import React, { useReducer } from "react";

const LOGIN = "login";
const REDIRECT = "redirect";
const initialState = {
  loggedIn: false,
  redirect: false
};

const authState = React.createContext(initialState);
const { Provider } = authState;

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case LOGIN:
        return {
          ...state,
          loggedIn: action.payload
        };
      case REDIRECT:
        return {
          ...state,
          redirect: action.payload
        };
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { authState, AuthProvider };
