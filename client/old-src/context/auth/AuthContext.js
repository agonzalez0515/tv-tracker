import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);
  const setUserEmail = email => setEmail(email);

  return (
    <AuthContext.Provider
      value={{ login, logout, setUserEmail, isLoggedIn, email }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { useAuth, AuthProvider, AuthContext };
