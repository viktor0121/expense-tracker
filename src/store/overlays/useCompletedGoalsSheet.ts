import { create } from "zustand";
import { IGoalList } from "@/lib/types";

interface CompletedGoalsSheet {
  isOpen: boolean;
  bucket: IGoalList | null;
  open: (bucket: IGoalList) => void;
  close: () => void;
}

export const useCompletedGoalsSheet = create<CompletedGoalsSheet>((set) => ({
  isOpen: false,
  bucket: null,
  open: (bucket) => set({ isOpen: true, bucket }),
  close: () => set({ isOpen: false, bucket: null }),
}));
