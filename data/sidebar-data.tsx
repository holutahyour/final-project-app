import { APP_DEFAULT_PAGE, PROFILE, SUBMISSIONS } from "@/lib/routes";
import { Cog, Home, Notebook, User, UserRoundPen } from "lucide-react";

export const routes = [
  { name: "Home", path: "/" },
  { name: "General Setup", path: "/generalsetup" },
  { name: "Parameters", path: "/parameters" },
  { name: "Financials", path: "/financials" },
  { name: "Students", path: "/students" },
];

export const sidebarData = (role: string) => {
  switch (role) {
    case "Admin":
      return {
        navMain: [
          {
            title: "Home",
            url: APP_DEFAULT_PAGE(),
            icon: Home,
            isActive: true,
          },
          {
            title: "Submissions",
            url: SUBMISSIONS,
            icon: Notebook,
            items: [],
            isActive: true,
          },
        ],
        navSecondary: [
          {
            title: "Profile",
            url: PROFILE,
            icon: UserRoundPen,
          },
          {
            title: "Settings",
            url: "#",
            icon: Cog,
          },
        ],
      }
    default:
      return {
        navMain: [],
        navSecondary: [],
      };
  }
};