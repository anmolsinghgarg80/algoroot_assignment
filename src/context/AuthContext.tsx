import { createContext, useContext, useState } from "react";
import { AuthContextType, User } from "../types";

type Props = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  signup: () => {},
  login: () => {},
  logout: () => {},
  deleteAccount: () => {},
});

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize user from localStorage on app start
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const signup = (userData: User) => {
    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = existingUsers.some(
      (u: User) => u.email === userData.email
    );

    if (userExists) {
      throw new Error("User already exists");
    }

    // Add new user to users array
    const updatedUsers = [...existingUsers, userData];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const login = (email: string, password: string) => {
    // Retrieve users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

    // Find user by email
    const user = existingUsers.find((u: User) => u.email === email);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.password !== password) {
      throw new Error("Incorrect password");
    }

    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const deleteAccount = () => {
    // Remove current user from users array
    if (user) {
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = existingUsers.filter(
        (u: User) => u.email !== user.email
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }

    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, signup, login, logout, deleteAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
