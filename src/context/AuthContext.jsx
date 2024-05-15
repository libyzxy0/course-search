import React, { useState, createContext, useEffect } from "react";
import { account } from "@/config/appwrite";
import { OAuthProvider } from "appwrite";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  
  
  const fetchUserData = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
      } catch (error) {
        console.log("Not logged in");
      }
    };
  useEffect(() => {
    fetchUserData();
  }, []);

  const login = async (email, password) => {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      setError("");
      return session;
    } catch (error) {
      console.log(error);
      throw new Error('Login failed!')
      setError(error.message);
    }
  };
  
  const signup = async (firstName, lastName, email, password) => {
    try {
      const randomID = 'csid-' + Math.random().toString(36).substring(2, 18);
      const result = await account.create(randomID, email, password, `${firstName}:${lastName}`);
      console.log(result);
      setError("");
    } catch (error) {
      throw new Error('Failed to create your account')
      setError(error.message);
    }
  };
  
  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
    } catch (error) {
      throw new Error('Failed to logout')
      console.error("Error logging out:", error);
    }
  };
  
  const googleSignIn = async () => {
    try {
      await account.createOAuth2Session(OAuthProvider.Google, `${window.location.protocol}//${window.location.host}/dashboard`, `${window.location.protocol}//${window.location.host}/login?oauthmsg=Failed+to+login`);
      console.log('Google ok');
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <AuthContext.Provider value={{ error, user, login, signup, logout, googleSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};
