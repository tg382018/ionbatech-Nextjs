"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { isValidAdminCredentials } from "@/lib/admin-auth";
import type { AdminLoginState } from "@/lib/admin-login-state";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createSessionToken,
} from "@/lib/admin-session";

export async function loginAction(
  _prev: AdminLoginState,
  formData: FormData
): Promise<AdminLoginState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!isValidAdminCredentials(username.trim(), password)) {
    return { error: "Kullanıcı adı veya şifre hatalı." };
  }

  const token = createSessionToken();
  const jar = await cookies();
  jar.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
  });

  redirect("/admin/dashboard");
}

export async function logoutAction(): Promise<void> {
  const jar = await cookies();
  jar.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin");
}
