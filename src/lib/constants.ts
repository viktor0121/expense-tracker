import { CreditCard, DollarSign, Home, LogIn, Settings, Target } from "lucide-react";
import { EDashboardTabs } from "@/lib/enums";
import { INavItem, INavTrail } from "@/lib/types";
import { shuffleArray } from "@/lib/utils";
import heroImage from "../assets/signin-side.png";

type Trails = {
  [path: string]: INavTrail[];
};

enum ENavKey {
  home = "home",
  signin = "signin",
  analytics = "analytics",
  expense = "expense",
  earnings = "earnings",
  settings = "settings",
}

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

export const navigations: { [key in ENavKey]: INavItem } = {
  [ENavKey.home]: {
    title: "Home",
    Icon: Home,
    url: "/",
  },
  [ENavKey.signin]: {
    title: "SignIn",
    Icon: LogIn,
    url: "/auth",
  },
  [ENavKey.analytics]: {
    title: "Analytics",
    Icon: Target,
    url: `/dashboard?tab=${EDashboardTabs.Analytics}`,
  },
  [ENavKey.expense]: {
    title: "Expenses",
    Icon: CreditCard,
    url: `/dashboard?tab=${EDashboardTabs.Expenses}`,
  },
  [ENavKey.earnings]: {
    title: "Earnings",
    Icon: DollarSign,
    url: `/dashboard?tab=${EDashboardTabs.Earnings}`,
  },
  [ENavKey.settings]: {
    title: "Settings",
    Icon: Settings,
    url: "/settings",
    posBottom: true,
  },
};

export const images = { heroImage };

export const SUPPORTED_IMAGE_FORMATS = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

export const CHART_COLORS = shuffleArray(["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]);

export const MONTHS_MMM = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const RADIAN = Math.PI / 180;
