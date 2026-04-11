import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { isAdminSessionValid } from "@/lib/admin-session";

export default async function AdminLoginPage() {
  if (await isAdminSessionValid()) {
    redirect("/admin/dashboard");
  }

  return <AdminLoginForm />;
}
