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
};

export const images = { heroImage };
