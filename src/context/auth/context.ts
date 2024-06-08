import { createContext } from "react";

interface AuthContextValues {
  authStatus: boolean;
  setAuthStatus: (status: boolean) => void;
  isAuthLoading: boolean;
  setIsAuthLoading: (status: boolean) => void;
}

const AuthContext = createContext<AuthContextValues>({
  authStatus: false,
  setAuthStatus: () => {},
  isAuthLoading: false,
  setIsAuthLoading: () => {},
});

export default AuthContext;
