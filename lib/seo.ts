import type { Metadata } from "next";

export const siteUrl = "https://www.ionbatech.com";

export const siteDescription =
  "IonBATech; lityum batarya, enerji depolama, güneş enerjisi sistemleri, inverter, tarımsal solar sulama ve elektrikli araç şarj çözümlerinde mühendislik odaklı tedarik ve destek sunar.";

export const siteKeywords = [
  "batarya teknolojileri",
  "enerji depolama",
  "lityum batarya",
  "güneş enerjisi",
  "inverter",
  "tarımsal sulama",
  "EV şarj",
  "enerji depolama sistemi",
  "off-grid inverter",
  "solar paket sistem",
  "Kayseri",
  "IonBATech",
] as const;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "IonBATech Batarya Teknolojileri, Enerji Depolama ve Güneş Enerjisi Çözümleri",
    template: "%s | IonBATech",
  },
  description: siteDescription,
  keywords: [...siteKeywords],
  authors: [{ name: "IonBATech" }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: "IonBATech",
    title:
      "IonBATech | Batarya ve Enerji Depolama Çözümleri",
    description:
      "Batarya teknolojileri, enerji depolama, güneş enerjisi, inverter ve EV şarj ürünlerinde güvenilir çözüm ortağınız.",
  },
  twitter: {
    card: "summary_large_image",
    title: "IonBATech | Batarya ve Enerji Çözümleri",
    description:
      "Lityum batarya, enerji depolama, solar ve saha uygulamaları için teknik odaklı ürün ve destek.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};
