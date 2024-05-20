import heroImage from "../assets/signin-side.png";
import { INavTrail } from "@/lib/types";

type Trails = {
  [path: string]: INavTrail[];
};

export const trails: Trails = {
  "/": [{ title: "Home", href: "/" }],
  "/auth": [
    { title: "Home", href: "/" },
    { title: "Auth", href: "/auth" },
  ],
  "/auth/reset-password": [
    { title: "Home", href: "/" },
    { title: "Auth", href: "/auth" },
    { title: "Reset Password", href: "/auth/reset-password" },
  ],
  "/dashboard": [
    { title: "Home", href: "/" },
    { title: "Dashboard", href: "/dashboard" },
  ],
  "/settings/profile": [
    { title: "Dashboard", href: "/" },
    { title: "Settings", href: "/settings" },
    { title: "Profile", href: "/settings/profile" },
  ],
  "/settings/appearance": [
    { title: "Dashboard", href: "/" },
    { title: "Settings", href: "/settings" },
    { title: "Appearance", href: "/settings/appearance" },
  ],
};

export const images = { heroImage };
