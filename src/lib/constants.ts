import heroImage from "../assets/signin-side.png";
import { INavTrail } from "@/lib/types";

type Trails = {
  [path: string]: INavTrail[];
};

export const trails: Trails = {
  // "/": [{ title: "Home", href: "/" }],
  "/auth": [
    { title: "Home", href: "/" },
    { title: "Auth", href: "" },
  ],
  "/auth/reset-password": [
    { title: "Home", href: "/" },
    { title: "Auth", href: "/auth" },
    { title: "Reset Password", href: "" },
  ],
  "/dashboard": [{ title: "Dashboard", href: "" }],
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

export const images = { heroImage };

export const SUPPORTED_IMAGE_FORMATS = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
