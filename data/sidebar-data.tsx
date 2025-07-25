import { APP_DEFAULT_PAGE, BOARD_MEMBERS, DELEBERATION_ROOM, MY_SUBMISSIONS, PROFILE, REVIEW_MANAGEMENT, REVIEWERS, REVISIONS, STUDENTS, SUBMISSIONS } from "@/lib/routes";
import { Cog, ContactRound, GraduationCap, Handshake, Home, LayoutDashboard, Notebook, RefreshCcwDot, UserRoundPen, UsersRoundIcon, Video } from "lucide-react";

export const routes = [
  { name: "Home", path: "/" },
  { name: "General Setup", path: "/generalsetup" },
  { name: "Parameters", path: "/parameters" },
  { name: "Financials", path: "/financials" },
  { name: "Students", path: "/students" },
];

export const sidebarData = (role: string) => {
  switch (role) {
    case "super-admin":
      return {
        general: [
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
          {
            title: "Review Management",
            url: REVIEW_MANAGEMENT,
            icon: UsersRoundIcon,
            items: [],
            isActive: true,
          },
          {
            title: "Deliberation Room",
            url: DELEBERATION_ROOM,
            icon: Video,
            items: [],
            isActive: true,
          },
        ],
        userMangement: [
          {
            title: "Students",
            url: STUDENTS,
            icon: GraduationCap,
            isActive: true,
          },
          {
            title: "Reviewers",
            url: REVIEWERS,
            icon: ContactRound,
            items: [],
            isActive: true,
          },
          {
            title: "Board Members",
            url: BOARD_MEMBERS,
            icon: Handshake,
            items: [],
            isActive: true,
          },
        ],
        account: [
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
    case "Admin":
      return {
        general: [
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
            title: "Review Management",
            url: REVIEW_MANAGEMENT,
            icon: UsersRoundIcon,
            items: [],
            isActive: true,
          },          
        ],
        userMangement: [
          {
            title: "Students",
            url: STUDENTS,
            icon: GraduationCap,
            isActive: true,
          },
          {
            title: "Reviewers",
            url: REVIEWERS,
            icon: ContactRound,
            items: [],
            isActive: true,
          },
          {
            title: "Board Members",
            url: BOARD_MEMBERS,
            icon: Handshake,
            items: [],
            isActive: true,
          },
        ],
        account: [
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
    case "student":
      return {
        general: [
          {
            title: "Home",
            url: APP_DEFAULT_PAGE(),
            icon: LayoutDashboard,
            isActive: true,
          },
          {
            title: "Submissions",
            url: MY_SUBMISSIONS,
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
        userMangement: [],
        account: [
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
    case "reviewer":
      return {
        general: [
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
        ],
        userMangement: [],
        account: [
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
    case "board-members":
      return {
        general: [
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
            title: "Deliberation Room",
            url: DELEBERATION_ROOM,
            icon: Video,
            items: [],
            isActive: true,
          },
        ],
        userMangement: [],
        account: [
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
        general: [],
        userMangement: [],
        account: [],
      };
  }
};