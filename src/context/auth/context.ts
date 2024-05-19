import { createContext } from "react";

interface AuthContextValues {
  authStatus: boolean;
  setAuthStatus: (status: boolean) => void;
}

const AuthContext = createContext<AuthContextValues>({
  authStatus: false,
  setAuthStatus: () => {},
});

export default AuthContext;
