import React from "react";
import { Models } from "appwrite";
import { LucideProps } from "lucide-react";
import { EAddSheetTabs, EExpenseType, ETheme } from "@/lib/enums";

// APP
export interface INavTrail {
  href: string;
  title: string;
}

export interface INavItem {
  url: string;
  title: string;
  Icon: React.FC<LucideProps>;
  posBottom?: boolean;
  authRequired: boolean;
}

export interface IOverallStats {
  totalSavings: Number;
  totalIncome: Number;
  totalNeeds: Number;
  totalWants: Number;
}

// APPWRITE
export interface IUserPreferences {
  theme?: ETheme;
  photoFileId?: string;
}

export type IUser = Models.User<IUserPreferences>;

export type ICurrency = Models.Currency;

export interface IEarning extends Models.Document {
  title: string;
  amount: number;
  date: Date | string;
}

export interface IExpenseCategory extends Models.Document {
  title: string;
}

export interface IExpense extends Models.Document {
  title: string;
  amount: number;
  date: Date | string;
  type: EExpenseType;
  category: IExpenseCategory;
}

export interface IGoalList extends Models.Document {
  title: string;
  goals: IGoal[];
}

export interface IGoal extends Models.Document {
  title: string;
  target: number;
  collected: number;
  imageId: string | null;
  goalList: IGoalList | Pick<IGoalList, "$id" | "title">;
  completed: boolean;
}

// STATES
export interface IAddNewSheetState {
  open: boolean;
  defaultTab: EAddSheetTabs;
}

export type IRecordDialogState =
  | {
      isOpen: boolean;
      recordType: "expense";
      record: IExpense;
    }
  | {
      isOpen: boolean;
      recordType: "earning";
      record: IEarning;
    }
  | {
      isOpen: false;
      recordType?: undefined;
      record?: undefined;
    };
