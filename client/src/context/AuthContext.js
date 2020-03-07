import React, { useReducer } from 'react'

const LOGIN = 'login'

const initialState = {
  loggedIn: false
};

const authState = React.createContext(initialState)
const { Provider } = authState


const AuthProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case LOGIN:
        const newState = {
          ...state,
          loggedIn: action.payload
        }
        return newState;
      default:
        return state;
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { authState, AuthProvider }
