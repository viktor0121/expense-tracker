import { create } from "zustand";
import { IGoalList } from "@/lib/types";

type NewGoalDialogStore = {
  isOpen: boolean;
  goalList: IGoalList | null;
  open: (goalList?: IGoalList | null) => void;
  close: () => void;
};

export const useCreateGoalDialog = create<NewGoalDialogStore>((set) => ({
  isOpen: false,
  goalList: null,
  open: (goalList) => set({ isOpen: true, goalList: goalList ?? null }),
  close: () => set({ isOpen: false, goalList: null }),
}));
