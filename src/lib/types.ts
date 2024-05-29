import React from "react";
import { LucideProps } from "lucide-react";
import { Models } from "appwrite";
import { ETheme } from "@/lib/enums";

export interface INavTrail {
  href: string;
  title: string;
}

export interface INavItem {
  url: string;
  title: string;
  Icon: React.FC<LucideProps>;
  posBottom?: boolean;
}

export interface IUserPreferences {
  theme: ETheme;
}

export type IUser = Models.User<IUserPreferences>;

export interface IIncome extends Models.Document {
 title: string;
 amount: number;
 date: Date
}

export interface IExpenseCategory extends Models.Document {
  title: string;
}