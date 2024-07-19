import { create } from "zustand";
import { IGoal } from "@/lib/types";

interface DeleteGoalDialogStore {
  isOpen: boolean;
  goal: IGoal | null;
  open: (goal: IGoal) => void;
  close: () => void;
}

export const useDeleteGoalDialog = create<DeleteGoalDialogStore>((set) => ({
  isOpen: false,
  goal: null,
  open: (goal: IGoal) => set({ isOpen: true, goal }),
  close: () => set({ isOpen: false, goal: null }),
}));
