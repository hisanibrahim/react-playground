import { faker } from "@faker-js/faker";
import React, { useEffect } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  let [loading, setLoading] = React.useState(true);
  let [user, setUser] = React.useState(null);
  let [users, setUsers] = React.useState([]);
  let [error, setError] = React.useState(null);
  const adminUser = {
    firstName: "Super",
    lastName: "Admin",
    role: "ADMIN",
    username: "admin",
    password: "admin",
  };

  function createRandomUser() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      role: "USER",
      username: faker.internet.userName(),
      password: faker.internet.userName(),
    };
  }

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
      const defaultUsers = [
        adminUser,
        ...faker.helpers.multiple(createRandomUser, {
          count: 10000,
        }),
      ];
      localStorage.setItem("users", JSON.stringify(defaultUsers));
    }
    setLoading(false);
  }, []);

  const resetError = (newUser) => {
    setError("");
  };

  const register = (newUser) => {
    if (
      !newUser.firstName &&
      !newUser.lastName &&
      !newUser.username &&
      !newUser.password
    ) {
      setError("All fields are required.");
      return { success: false };
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = storedUsers.find(
      (user) => user.username === newUser.username
    );
    if (existingUser) {
      setError("User already exists!");
      return { success: false };
    } else {
      storedUsers.push({ ...newUser, role: "USER" });
      localStorage.setItem("users", JSON.stringify(storedUsers));
      setError("");
      return { success: true };
    }
  };

  const login = (inputUser) => {
    if (!inputUser.username && !inputUser.password) {
      setError("Username and password are required.");
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
      setError("Invalid credentials!");
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
    resetError,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);
