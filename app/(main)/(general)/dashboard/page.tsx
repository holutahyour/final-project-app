"use client";

import dynamic from "next/dynamic";

const RolebaseDashboard = dynamic(
  () => import("./RolebaseDashboard"),
  { ssr: false }
);

export default function DashboardPage() {
  return <RolebaseDashboard />;
}


