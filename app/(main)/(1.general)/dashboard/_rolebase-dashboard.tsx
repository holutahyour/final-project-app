"use client";




// import { useAuth } from "@/hooks/use-auth";
import { useRoleSelection } from "@/app/context/roleSelection-context";
import { useState } from "react";
import AdminDashboard from "./admin-dashboard";
import BoardMemberDashboard from "./board-member-dashboard";
import ReviewerDashboard from "./reviewer-dashboard";
import StudentDashboard from "./student-dashboard";
import SuperAdminDashboard from "./super-admin-dashboard";

export default function RolebaseDashboard() {
  const { selectedRole } = useRoleSelection();
  const [embedConfig, setEmbedConfig] = useState({
    embedToken: '',
    embedUrl: '',
    reportId: ''
  });

  const fetchEmbedConfig = async () => {
    const res = await fetch("/api/get-embed-token", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch embed config");
    }

    return res.json();
  };

  // useEffect(() => {
  //   const getEmbedConfig = async () => {
  //     try {
  //       const config = await fetchEmbedConfig();
  //       setEmbedConfig(config);
  //     } catch (error) {
  //       console.error("Error fetching embed config:", error);
  //     }
  //   };

  //   getEmbedConfig();
  // }, []);

  if (!selectedRole) {
    return <div>Please select a role to continue.</div>;
  }

  // Render different dashboard based on selected role
  switch (selectedRole) {
    case "Admin":
      return <AdminDashboard embedConfig={embedConfig} />;
    case "student":
      return <StudentDashboard embedConfig={embedConfig} />;
    case "reviewer":
      return <ReviewerDashboard embedConfig={embedConfig} />;
    case "board-members":
      return <BoardMemberDashboard embedConfig={embedConfig} />;
    case "super-admin":
      return <SuperAdminDashboard embedConfig={embedConfig} />;
    default:
      return <div>Dashboard not available for the selected role.</div>;
  }
}


