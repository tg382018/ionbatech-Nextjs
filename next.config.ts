import type { NextConfig } from "next";

const remotePatterns: NonNullable<
  NonNullable<NextConfig["images"]>["remotePatterns"]
> = [
    {
      protocol: "https",
      hostname: "images.unsplash.com",
      pathname: "/**",
      //
    },
  ];

const storageHosts = new Set<string>(["lpiajnffpcqnjbwqekzn.supabase.co"]);
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (supabaseUrl) {
  try {
    storageHosts.add(new URL(supabaseUrl).hostname);
  } catch {
    /* ignore invalid URL */
  }
}
for (const hostname of storageHosts) {
  remotePatterns.push({
    protocol: "https",
    hostname,
    pathname: "/storage/v1/object/public/**",
  });
}

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    remotePatterns,
    /** Varsayılan [..384] sonrası doğrudan 640’a sıçınıyordu; kart ~220px@2x için ara genişlikler. */
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 448, 512],
  },
  async redirects() {
    return [
      {
        source:
          "/bag-evi-paketi-3.6kw-inverter-/-24v-100ah-batarya-/-2.2kw-gunes-paneli",
        destination:
          "https://market.ionbatech.com/bag-evi-paketi-3.6kw-inverter-/-24v-100ah-batarya-/-2.2kw-gunes-paneli",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
