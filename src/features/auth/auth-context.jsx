import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authStorage } from "../../lib/auth-storage";
import { authApi } from "./api/auth-api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const restoreSession = useCallback(async () => {
    const token = authStorage.getAccessToken();
    const storedUser = authStorage.getUser();
    
    if (token) {
      if (storedUser) {
        setUser(storedUser);
        setIsAuthenticated(true);
      }
      try {
        const response = await authApi.getMe();
        if (response.success && response.data?.user) {
          setUser(response.data.user);
          authStorage.saveUser(response.data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Session restore failed:", error);
        // Error will be caught and token might be cleared by apiClient if refresh fails
        if (!authStorage.getAccessToken()) {
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    
    setIsLoading(false);
  }, []);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  const login = async (email, password, rememberSession) => {
    authStorage.setRememberSession(rememberSession);
    const response = await authApi.login(email, password);
    
    if (response.success && response.data) {
      const { access_token, refresh_token, user } = response.data;
      authStorage.saveTokens(access_token, refresh_token);
      authStorage.saveUser(user);
      setUser(user);
      setIsAuthenticated(true);
      return user;
    }
    throw new Error("Invalid response format");
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      // Ignore API error on logout, we still want to clear local storage
      console.error("Logout API failed:", error);
    } finally {
      authStorage.clearAll();
      setUser(null);
      setIsAuthenticated(false);
      window.location.href = "/login";
    }
  };

  const updateUser = (updatedUserData) => {
    const newUser = { ...user, ...updatedUserData };
    setUser(newUser);
    authStorage.saveUser(newUser);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
