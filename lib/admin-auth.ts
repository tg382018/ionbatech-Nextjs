/** Sunucu (Server Actions) tarafında kullanılan sabit kimlik bilgisi — üretimde env / veritabanı kullanın. */
export function isValidAdminCredentials(
  username: string,
  password: string
): boolean {
  return username === "admin" && password === "admin123";
}
