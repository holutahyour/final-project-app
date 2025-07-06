"use client";




// import { useAuth } from "@/hooks/use-auth";
import { useRoleSelection } from "@/app/context/roleSelection-context";
import { useState } from "react";
import AdminDashboard from "./adminDashboard";
import BillingOfficerDashboard from "./billingOfficerDashboard";
import ReceivableOfficerDashboard from "./receivableOfficerDashboard";

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
    case "Receivable-Accountant":
      return <ReceivableOfficerDashboard embedConfig={embedConfig} />;
    case "Billing-Accountant":
      return <BillingOfficerDashboard embedConfig={embedConfig} />;
    default:
      return <div>Dashboard not available for the selected role.</div>;
  }
}


