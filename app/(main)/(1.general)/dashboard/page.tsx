"use client";

import dynamic from "next/dynamic";

const RolebaseDashboard = dynamic(
  () => import("./_rolebase-dashboard"),
  { ssr: false }
);

export default function DashboardPage() {
  return <RolebaseDashboard />;
}


