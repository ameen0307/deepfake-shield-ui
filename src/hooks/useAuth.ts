import { useState, useCallback } from "react";
import { User } from "@/lib/types";
import { loginUser, registerUser } from "@/lib/api";

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    const saved = sessionStorage.getItem("df_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const ok = await loginUser(username, password);
      if (ok) {
        const u = { username };
        setUser(u);
        sessionStorage.setItem("df_user", JSON.stringify(u));
      } else {
        setError("Invalid credentials");
      }
      return ok;
    } catch {
      setError("Connection failed");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const ok = await registerUser(username, password);
      if (!ok) setError("Username already exists");
      return ok;
    } catch {
      setError("Connection failed");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem("df_user");
  }, []);

  return { user, login, register, logout, loading, error, clearError: () => setError(null) };
}
