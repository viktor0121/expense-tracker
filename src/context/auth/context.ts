import { createContext } from "react";

interface AuthContextValues {
  authStatus: boolean;
  setAuthStatus: (status: boolean) => void;
}

export const AuthContext = createContext<AuthContextValues>({
  authStatus: false,
  setAuthStatus: () => {},
});

export const AuthProvider = AuthContext.Provider;
