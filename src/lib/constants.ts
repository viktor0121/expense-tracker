import heroImage from "../assets/signin-side.png";
import { INavItem, INavTrail } from "@/lib/types";
import { CreditCard, DollarSign, Home, LogIn, Settings, Target } from "lucide-react";

type Trails = {
  [path: string]: INavTrail[];
};

export const trails: Trails = {
  "/auth": [
    { title: "Home", href: "/" },
    { title: "Auth", href: "" },
  ],
  "/auth/reset-password": [
    { title: "Home", href: "/" },
    { title: "Auth", href: "/auth" },
    { title: "Reset Password", href: "" },
  ],
  "/dashboard": [
    { title: "Home", href: "/" },
    { title: "Dashboard", href: "" },
  ],
  "/settings/profile": [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Settings", href: "" },
    { title: "Profile", href: "" },
  ],
  "/settings/appearance": [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Settings", href: "" },
    { title: "Appearance", href: "" },
  ],
};

export const navigations: { [key: string]: INavItem } = {
  home: {
    title: "Home",
    Icon: Home,
    url: "/",
  },
  signin: {
    title: "SignIn",
    Icon: LogIn,
    url: "/auth",
  },
  overview: {
    title: "Overview",
    Icon: Target,
    url: "/dashboard?tab=overview",
  },
  expense: {
    title: "Expenses",
    Icon: CreditCard,
    url: "/dashboard?tab=expenses",
  },
  savings: {
    title: "Savings",
    Icon: DollarSign,
    url: "/dashboard?tab=savings",
  },
  settings: {
    title: "Settings",
    Icon: Settings,
    url: "/settings",
    posBottom: true,
  },
};

export const images = { heroImage };

export const SUPPORTED_IMAGE_FORMATS = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
