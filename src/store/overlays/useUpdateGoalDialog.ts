import { create } from "zustand";
import { IGoal } from "@/lib/types";

interface UpdateGoalDialogStore {
  isOpen: boolean;
  goal: IGoal | null;
  open: (goal: IGoal) => void;
  close: () => void;
}

export const useUpdateGoalDialog = create<UpdateGoalDialogStore>((set) => ({
  isOpen: false,
  goal: null,
  open: (goal) => set({ isOpen: true, goal }),
  close: () => set({ isOpen: false, goal: null }),
}));
