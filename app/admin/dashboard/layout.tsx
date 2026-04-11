import type { Metadata } from "next";

import { AdminDashboardShell } from "@/components/admin/admin-dashboard-shell";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminDashboardShell>{children}</AdminDashboardShell>;
}
