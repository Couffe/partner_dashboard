import { createContext, useState, useContext, type ReactNode } from "react";
import { PARTNER } from "@/TestData/TestData";
import type { Partner } from "@/types/partner";

interface AuthContextType {
  user: Partner | null;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Partner | null>(PARTNER);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      // API CALL HERE
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setUser(PARTNER);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear cookies/tokens here
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used wwith an AuthProvider");
  }

  return context;
};
