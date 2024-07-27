import { create } from "zustand";
import { IGoal } from "@/lib/types";

interface CompletedGoalsSheet {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useCompletedGoalsSheet = create<CompletedGoalsSheet>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
