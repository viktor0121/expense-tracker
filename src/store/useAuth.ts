import { create } from "zustand";

interface AuthStore {
  authStatus: boolean;
  setAuthStatus: (status: boolean) => void;
  isAuthLoading: boolean;
  setIsAuthLoading: (status: boolean) => void;
}

export const useAuth = create<AuthStore>((set) => ({
  authStatus: false,
  setAuthStatus: (status) => set({ authStatus: status }),
  isAuthLoading: true,
  setIsAuthLoading: (status) => set({ isAuthLoading: status }),
}));
