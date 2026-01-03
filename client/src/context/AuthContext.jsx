import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { userAPI, authAPI } from "../http/api.js";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      console.log("CheckAuth: Starting authentication check...");
      setLoading(true);
      const response = await userAPI.getMe();
      console.log("CheckAuth: API response:", response);

      if (response && response.success && response.data) {
        console.log("CheckAuth: User found:", response.data);
        setUser(response.data);
      } else {
        console.log("CheckAuth: No user found, setting user to null");
        setUser(null);
      }
    } catch (error) {
      console.error("CheckAuth: Error during auth check:", error);
      setUser(null);
    } finally {
      console.log("CheckAuth: Setting loading to false");
      setLoading(false);
    }
  }, []);

  // Initial auth check on mount
  useEffect(() => {
    checkAuth();
  }, []); // Empty dependency - only run once on mount

  const login = useCallback(async (credentials) => {
    try {
      console.log("Login: Attempting login with:", credentials);
      const response = await authAPI.login(credentials);
      console.log("Login: API response:", response);

      if (response && response.success) {
        console.log("Login: Success! Getting user data...");
        // After successful login, get user data
        try {
          const userResponse = await userAPI.getMe();
          console.log("Login: User data response:", userResponse);
          if (userResponse && userResponse.success && userResponse.data) {
            setUser(userResponse.data);
            console.log("Login: User state updated to:", userResponse.data);
            return { success: true, user: userResponse.data };
          } else {
            console.warn("Login: Failed to get user data after login");
            return {
              success: false,
              message: "Login successful but failed to get user data",
            };
          }
        } catch (userError) {
          console.error("Login: Failed to get user data:", userError);
          return {
            success: false,
            message: "Login successful but failed to get user data",
          };
        }
      } else {
        console.log("Login: Failed with response:", response);
        return { success: false, message: response?.message || "Login failed" };
      }
    } catch (error) {
      console.error("Login: Error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Network error. Please check if the server is running.";
      return {
        success: false,
        message: errorMessage,
      };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
    }
  }, []);

  const updateUser = useCallback((updatedUser) => {
    setUser(updatedUser);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
      updateUser,
      checkAuth,
    }),
    [user, loading, login, logout, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
