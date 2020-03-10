import { useContext, useEffect } from "react";
import { authState } from "../../context/AuthContext";

function useAuth(props) {
  const {
    state: { loggedIn }
  } = useContext(authState);

  useEffect(() => {
    if (!loggedIn) {
      props.history.push("/login");
    }
  }, [loggedIn, props.history]);

  return loggedIn;
}

export default useAuth;
