import { APP_DEFAULT_PAGE, PROFILE, REVISIONS, SUBMISSIONS } from "@/lib/routes";
import { Cog, Home, LayoutDashboard, Notebook, RefreshCcwDot, UserRoundPen } from "lucide-react";

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
            icon: LayoutDashboard,
            isActive: true,
          },
          {
            title: "Submissions",
            url: SUBMISSIONS,
            icon: Notebook,
            items: [],
            isActive: true,
          },
          {
            title: "Revisions",
            url: REVISIONS,
            icon: RefreshCcwDot,
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