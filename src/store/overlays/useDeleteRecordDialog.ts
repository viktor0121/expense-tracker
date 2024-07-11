import { create } from "zustand";
import { IEarning, IExpense, IRecordDialogState } from "@/lib/types";

type DeleteRecordDialog = IRecordDialogState & {
  openExpense: (record: IExpense) => void;
  openEarning: (record: IEarning) => void;
  close: () => void;
};

export const useDeleteRecordDialog = create<DeleteRecordDialog>((set) => ({
  isOpen: false,
  recordType: undefined,
  record: undefined,
  openExpense: (record: IExpense) => set({ isOpen: true, recordType: "expense", record }),
  openEarning: (record: IEarning) => set({ isOpen: true, recordType: "earning", record }),
  close: () => set({ isOpen: false, recordType: undefined, record: undefined }),
}));
