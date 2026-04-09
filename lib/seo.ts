import type { Metadata } from "next";

export const siteUrl = "https://www.ionbatech.com";

export const siteDescription =
  "IonBATech; enerji depolama, LiFePO₄ batarya, solar sistemler, inverter ve EV şarjında mühendislik odaklı sistem tasarımı, kurulum desteği ve güvenilir ürün tedariği sunar. Kayseri merkezli; Türkiye geneli.";

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
      "Enerji depolama ve solar sistemlerde kapasite planlama, doğru inverter–batarya eşleştirmesi ve teknik destek ile çalışan mühendislik yaklaşımı.",
  },
  twitter: {
    card: "summary_large_image",
    title: "IonBATech | Batarya ve Enerji Çözümleri",
    description:
      "LiFePO₄, depolama, solar ve güç elektroniğinde sistem tasarımı ve satış sonrası teknik destek.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};
