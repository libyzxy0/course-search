import React, { useState, createContext, useEffect } from "react";
import { account } from "@/config/appwrite";
import { OAuthProvider, ID } from "appwrite";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userData = await account.get();
      setUser(userData);
    } catch (error) {
      console.log("Not logged in");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const login = async (email, password) => {
    try {
      if (user) {
        await logout();
      }
      const session = await account.createEmailPasswordSession(email, password);
      setError("");
      return session;
    } catch (error) {
      console.log(error);
      throw new Error("Login failed!");
      setError(error.message);
    }
  };

  const signup = async (firstName, lastName, email, password) => {
    try {
      const randomID = "csid-" + ID.unique();
      const result = await account.create(
        randomID,
        email,
        password,
        `${firstName} ${lastName}`,
      );
      await login(email, password);
      console.log(result);
      setError("");
    } catch (error) {
      throw new Error("Failed to create your account");
      setError(error.message);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      throw new Error("Failed to logout");
      console.error("Error logging out:", error);
    }
  };

  const googleSignIn = async () => {
    try {
      await account.createOAuth2Session(
        OAuthProvider.Google,
        `${window.location.protocol}//${window.location.host}/dashboard`,
        `${window.location.protocol}//${window.location.host}/login?oauthmsg=Failed+to+login`,
      );
      console.log("Google ok");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ error, user, login, signup, logout, googleSignIn, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
