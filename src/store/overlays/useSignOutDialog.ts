import { create } from "zustand";

interface SignOutDialogStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useSignOutDialog = create<SignOutDialogStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
