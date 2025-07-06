import { APP_DEFAULT_PAGE, SUBMISSIONS } from "@/lib/routes";
import { Home, Notebook } from "lucide-react";

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
      return [
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
      ];    
    default:
      return [];
  }
};


    //     {
        
            // navMain: [
        //         title: "Home",
        //         url: APP_DEFAULT_PAGE(),
        //         icon: Home,
        //         isActive: true,
        //     },       
        //     {
        //         title: "School Configuration",
        //         url: SCHOOL_CONFIG,
        //         icon: Cog,
        //         items: [],
        //         isActive: true,
        //     },
        //     {
        //         title: "Parameters",
        //         url: "/parameters",
        //         icon: SlidersHorizontal,
    
        //     },
        //     {
        //         title: "Billing",
        //         url: BILLING,
        //         icon: Landmark,
        //     },
        // ],