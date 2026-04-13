import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}`;
axios.defaults.withCredentials = true;

const AuthContext = createContext(null);
const clearClientCookies = () => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
const TOKEN_KEY = "token";
const USER_KEY = "user";

const saveToStorage = (token, user) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const clearStorage = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

const getUserFromStorage = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const getTokenFromStorage = () => localStorage.getItem(TOKEN_KEY);

// ─── Provider ─────────────────────────────────────────────────────────────────
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromStorage());   // pre-fill from storage
  const [token, setToken] = useState(getTokenFromStorage());  // pre-fill from storage
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isLoggedIn = !!token && !!user;

  useEffect(() => {
    const reqInterceptor = axios.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    const resInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          const originalRequestUrl = error.config.url;
          if (!originalRequestUrl.includes("/api/auth/login")) {
            logout();
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  }, [token]);

  // ── Login ─────────────────────────────────────────────────────────────────
  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Data Received of login ")
      const response = await axios.post("/api/auth/login",
        { email, password },
        { withCredentials: true });

      const { token, user } = response.data;
      saveToStorage(token, user);
      setToken(token);
      setUser(user);

      return { success: true };

    } catch (err) {
      console.log(err);
      const message = err.response?.data?.message || "Login failed. Please try again.";
      setError(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ── Register ──────────────────────────────────────────────────────────────
  const register = useCallback(async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "/api/auth/register",
        formData,
        { withCredentials: true }
      );

      const { token, user } = response.data;

      saveToStorage(token, user);
      setToken(token);
      setUser(user);

      return { success: true };

    } catch (err) {
      const message = err.response?.data?.message || "Registration failed.";
      setError(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ── Logout ────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    try {
      // Tell server to clear the httpOnly cookie
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
    } catch {
      // Even if server call fails, still clear client-side data
    } finally {
      // 1. Clear localStorage
      clearStorage();
      clearClientCookies();
      setToken(null);
      setUser(null);
      setError(null);
      window.location.href = "/AgriSenseAI/login";
    }
  }, []);

  const updateUser = useCallback((updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
  }, []);

  const value = {
    user,
    token,
    isLoggedIn,
    isLoading,
    error,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return context;
};