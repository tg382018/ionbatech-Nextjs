"use client";

import { uploadBlogImageAction } from "@/app/admin/dashboard/blog/actions";

const MAX_BYTES = 5 * 1024 * 1024;

export async function uploadBlogImage(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Yalnızca görsel dosyası yükleyebilirsiniz.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Görsel 5 MB’dan küçük olmalı.");
  }
  const formData = new FormData();
  formData.set("file", file);
  const result = await uploadBlogImageAction(formData);
  if (!result.ok) throw new Error(result.error);
  return result.url;
}
