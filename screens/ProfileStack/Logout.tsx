import { AsyncStorage } from "react-native";
import React, { useEffect } from "react";
import { TOKEN_KEY } from "../../shared/constants/Token";
import LoginContext from "../../shared/LoginContext";

function Logout({ context }) {
  const logout = async () => {
    AsyncStorage.removeItem(TOKEN_KEY).then(() => {
      context.logout();
    });
  };
  useEffect(() => {
    logout();
  }, []);

  return null;
}

const LogoutWC = props => {
  return (
    <LoginContext.Consumer>
      {context => <Logout {...props} context={context} />}
    </LoginContext.Consumer>
  );
};

export default LogoutWC;
