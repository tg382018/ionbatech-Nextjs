/** Tarayıcı oturumu (client-only). Gerçek üretimde sunucu oturumu / JWT kullanılmalı. */
export const ADMIN_SESSION_KEY = "ionbatech_admin_auth";

export function isValidAdminCredentials(
  username: string,
  password: string
): boolean {
  return username === "admin" && password === "admin123";
}

export function readAdminSession(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === "1";
}

export function setAdminSession(): void {
  sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
}

export function clearAdminSession(): void {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
}
