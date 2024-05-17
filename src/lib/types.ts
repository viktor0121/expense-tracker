import React from "react";
import { LucideProps } from "lucide-react";
import { Models } from "appwrite";

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

export type IUser = Models.User<Models.Preferences>;
