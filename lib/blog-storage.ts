import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";

const BUCKET = "blog";
const MAX_BYTES = 5 * 1024 * 1024;

const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

async function ensureBlogBucket(
  supabase: ReturnType<typeof createAdminClient>
) {
  const existing = await supabase.storage.getBucket(BUCKET);
  if (existing.data) {
    if (!existing.data.public) {
      const updated = await supabase.storage.updateBucket(BUCKET, {
        public: true,
        fileSizeLimit: MAX_BYTES,
        allowedMimeTypes: Object.keys(EXTENSIONS),
      });
      if (updated.error) throw new Error(updated.error.message);
    }
    return;
  }

  const created = await supabase.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: MAX_BYTES,
    allowedMimeTypes: Object.keys(EXTENSIONS),
  });
  if (created.error && !/already exists/i.test(created.error.message)) {
    throw new Error(created.error.message);
  }
}

export async function uploadBlogImageFile(file: File): Promise<string> {
  const extension = EXTENSIONS[file.type];
  if (!extension) {
    throw new Error("Yalnızca JPEG, PNG, WEBP veya GIF yükleyebilirsiniz.");
  }
  if (file.size <= 0 || file.size > MAX_BYTES) {
    throw new Error("Görsel 5 MB’dan küçük olmalı.");
  }

  const supabase = createAdminClient();
  await ensureBlogBucket(supabase);

  const path = `${new Date().getUTCFullYear()}/${crypto.randomUUID()}.${extension}`;
  const bytes = new Uint8Array(await file.arrayBuffer());
  const { error } = await supabase.storage.from(BUCKET).upload(path, bytes, {
    contentType: file.type,
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
