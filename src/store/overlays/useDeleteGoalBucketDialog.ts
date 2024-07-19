import { create } from "zustand";
import { IGoalList } from "@/lib/types";

interface DeleteGoalBucketDialogStore {
  isOpen: boolean;
  bucket: IGoalList | null;
  open: (bucket: IGoalList) => void;
  close: () => void;
}

export const useDeleteGoalBucketDialog = create<DeleteGoalBucketDialogStore>((set) => ({
  isOpen: false,
  bucket: null,
  open: (bucket) => set({ isOpen: true, bucket }),
  close: () => set({ isOpen: false, bucket: null }),
}));
