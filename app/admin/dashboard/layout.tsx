import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminDashboardLayoutUi } from "@/components/admin/admin-dashboard-layout-ui";
import { isAdminSessionValid } from "@/lib/admin-session";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!(await isAdminSessionValid())) {
    redirect("/admin");
  }

  return <AdminDashboardLayoutUi>{children}</AdminDashboardLayoutUi>;
}
