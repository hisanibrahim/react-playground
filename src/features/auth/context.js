import React, { useEffect } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  let [loading, setLoading] = React.useState(true);
  let [user, setUser] = React.useState(null);
  let [users, setUsers] = React.useState([]);
  let [signupError, setSignupError] = React.useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
    setLoading(false);
  }, []);

  const signup = (newUser) => {
    if (
      !newUser.firstName &&
      !newUser.lastName &&
      !newUser.email &&
      !newUser.password
    ) {
      setSignupError("All fields are required.");
      return { success: false };
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = storedUsers.find(
      (user) => user.email === newUser.email
    );
    if (existingUser) {
      setSignupError("User already exists!");
      return { success: false };
    } else {
      storedUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(storedUsers));
      setSignupError("");
      return { success: true };
    }
  };

  let signin = (newUser, callback) => {
    return () => {
      setUser(newUser);
      callback();
    };
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  let value = { user, users, loading, signin, signout, signup, signupError };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);
