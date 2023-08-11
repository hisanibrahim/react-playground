import React from "react";
import { authService } from "./service";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  let [user, setUser] = React.useState(null);

  let signin = (newUser, callback) => {
    return authService.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback) => {
    return authService.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);
