import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
        //
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/bag-evi-paketi-3.6kw-inverter-/-24v-100ah-batarya-/-2.2kw-gunes-paneli",
        destination: "https://market.ionbatech.com/bag-evi-paketi-3.6kw-inverter-/-24v-100ah-batarya-/-2.2kw-gunes-paneli",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
