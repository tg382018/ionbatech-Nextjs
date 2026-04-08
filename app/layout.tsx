import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";

import { SiteJsonLd } from "@/components/seo/site-json-ld";
import { defaultMetadata } from "@/lib/seo";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-hero-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SiteJsonLd />
        {children}
      </body>
    </html>
  );
}
