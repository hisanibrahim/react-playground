import React, { useEffect } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  let [loading, setLoading] = React.useState(true);
  let [user, setUser] = React.useState(null);
  let [users, setUsers] = React.useState([]);
  let [registerError, setRegisterError] = React.useState(null);
  let [loginError, setLoginError] = React.useState(null);
  const adminUser = {
    firstName: "Super",
    lastName: "Admin",
    role: "ADMIN",
    username: "admin",
    password: "admin",
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const parsedStoredUsers = JSON.parse(storedUsers);
      setUsers(parsedStoredUsers);
      const existingAdminUser = parsedStoredUsers.find(
        (user) => user.role === "ADMIN" && user.username === "admin"
      );
      if (!existingAdminUser?.username) {
        parsedStoredUsers.push(adminUser);
        localStorage.setItem("users", JSON.stringify(parsedStoredUsers));
      }
    } else {
      const defaultUsers = [adminUser];
      localStorage.setItem("users", JSON.stringify(defaultUsers));
    }
    setLoading(false);
  }, []);

  const register = (newUser) => {
    if (
      !newUser.firstName &&
      !newUser.lastName &&
      !newUser.username &&
      !newUser.password
    ) {
      setRegisterError("All fields are required.");
      return { success: false };
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = storedUsers.find(
      (user) => user.username === newUser.username
    );
    if (existingUser) {
      setRegisterError("User already exists!");
      return { success: false };
    } else {
      storedUsers.push({ ...newUser, role: "USER" });
      localStorage.setItem("users", JSON.stringify(storedUsers));
      setRegisterError("");
      return { success: true };
    }
  };

  const login = (inputUser) => {
    if (!inputUser.username && !inputUser.password) {
      setLoginError("Username and password are required.");
      return { success: false };
    }
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = storedUsers.find(
      (user) =>
        user.username === inputUser.username &&
        user.password === inputUser.password
    );

    if (matchedUser) {
      setUser(matchedUser);
      setUsers(storedUsers);
      localStorage.setItem("user", JSON.stringify(matchedUser));
      return { success: true };
    } else {
      setLoginError("Invalid credentials!");
      return { success: false };
    }
  };

  const signout = () => {
    setUser(null);
    setUsers(null);
    localStorage.removeItem("user");
  };
  let value = {
    user,
    users,
    loading,
    login,
    signout,
    register,
    registerError,
    loginError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);
