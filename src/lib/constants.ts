import { BarChart, CreditCard, DollarSign, Home, LogIn, Settings, Target } from "lucide-react";
import { EDashboardTabs } from "@/lib/enums";
import { INavItem, INavTrail } from "@/lib/types";
import { shuffleArray } from "@/lib/utils";
import heroImage from "../assets/signin-side.png";

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
  "/goal-buckets": [
    { title: "Home", href: "/" },
    { title: "Goal Buckets", href: "" },
  ],
  "/goal-buckets/goals": [
    { title: "Home", href: "/" },
    { title: "Buckets", href: "/goal-buckets" },
    { title: "Goals", href: "" },
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

export const navigations: INavItem[] = [
  {
    title: "Home",
    Icon: Home,
    url: "/",
    authRequired: false,
  },
  {
    title: "SignIn",
    Icon: LogIn,
    url: "/auth",
    authRequired: false,
  },
  {
    title: "Analytics",
    Icon: BarChart,
    url: `/dashboard?tab=${EDashboardTabs.Analytics}`,
    authRequired: true,
  },
  {
    title: "Expenses",
    Icon: CreditCard,
    url: `/dashboard?tab=${EDashboardTabs.Expenses}`,
    authRequired: true,
  },
  {
    title: "Earnings",
    Icon: DollarSign,
    url: `/dashboard?tab=${EDashboardTabs.Earnings}`,
    authRequired: true,
  },
  {
    title: "Goals",
    Icon: Target,
    url: "/goal-buckets",
    authRequired: true,
  },
  {
    title: "Settings",
    Icon: Settings,
    url: "/settings",
    posBottom: true,
    authRequired: true,
  },
];

export const images = { heroImage };

export const SUPPORTED_IMAGE_FORMATS = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

export const CHART_COLORS = shuffleArray(["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]);

export const MONTHS_MMM = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const RADIAN = Math.PI / 180;
