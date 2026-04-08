import { siteUrl } from "@/lib/seo";

export const brandName = "IonBATech";

/** Served from `public/logo.webp` */
export const logoSrc = "/logo.webp";
export const logoAlt = "IonBATech";

export const storeBaseUrl = "https://market.ionbatech.com";

export const navLinks = [
  { label: "Anasayfa", href: "#anasayfa" },
  { label: "Çözümler", href: "#cozumler" },
  { label: "Kategoriler", href: "#kategoriler" },
  { label: "Ürünler", href: storeBaseUrl },
  { label: "Neden Biz", href: "#neden-biz" },
  { label: "SSS", href: "#sss" },
  { label: "İletişim", href: "#iletisim" },
] as const;

export const contactHref = `${storeBaseUrl}/iletisim`;
export const shopHomeHref = storeBaseUrl;

export const heroContent = {
  /** Hero: iki satır serif başlık (referans düzen) */
  headlineLine1: "Güç ve depolama yatırımınız şansa kalmasın.",
  headlineLine2: "Mühendislikle tanımlı sistem, ölçülebilir sonuç.",
  subheading:
    "IonBATech; batarya, güneş enerjisi ve güç elektroniğinde güvenilir tedarik ve teknik yönlendirme sunar.",
  /** Ana yeşil CTA (uzun hap buton) */
  leadCta: {
    label: "Size uygun ürün ve sistem planını görün",
    href: shopHomeHref,
  },
  primaryCta: { label: "Ürünleri İncele", href: shopHomeHref },
  secondaryCta: { label: "Mühendisle Görüş", href: contactHref },
  tertiaryCta: { label: "Çözümler", href: "#cozumler" },
} as const;

/** Full-bleed hero: video arka plan + poster / hareket azaltma yedeği. */
export const heroBanner = {
  videoSrc: "/video.mp4",
  imageSrc:
    "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=2400&q=80",
  imageAlt: "Modern çatı üzerinde güneş panelleri kurulumu",
  badge: "Şeffaf süreç · Teknik netlik",
} as const;

export const heroTrustBadgeItems = [
  { label: "Mühendislik Odaklı", icon: "cpu" as const },
  { label: "Güvenli Altyapı", icon: "shield" as const },
  { label: "Hızlı Destek", icon: "headset" as const },
] as const;

export const brandTrustStripItems = [
  {
    label: "Batarya Teknolojileri",
    subtitle: "LiFePO₄ & Modüler",
    key: "battery" as const,
  },
  {
    label: "Enerji Depolama",
    subtitle: "Kapasite planlama",
    key: "storage" as const,
  },
  {
    label: "Solar Sistemler",
    subtitle: "Panel & Inverter",
    key: "solar" as const,
  },
  {
    label: "Tarımsal Uygulamalar",
    subtitle: "Solar sulama",
    key: "agri" as const,
  },
  {
    label: "EV Şarj Çözümleri",
    subtitle: "İstasyon & Altyapı",
    key: "ev" as const,
  },
] as const;

export type SolutionIconKey =
  | "battery"
  | "storage"
  | "inverter"
  | "solar"
  | "irrigation"
  | "ev";

export const solutionsSection = {
  id: "cozumler",
  title: "Enerji İhtiyacınıza Uygun Çözümler",
  subtitle:
    "Uygulama senaryonuza göre doğru bileşenleri seçmenize yardımcı olacak çözüm hatlarımız.",
  items: [
    {
      iconKey: "solar" as const,
      bento: "hero" as const,
      title: "Güneş Enerjisi Sistemleri",
      description:
        "Panel, yapılandırma ve paket sistem yaklaşımıyla üretim tarafını net ve ölçülebilir kılın.",
      href: `${storeBaseUrl}/solar-paket-sistemler`,
      imageSrc:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=80",
      imageAlt: "Güneş panelleri ve açık gökyüzü",
    },
    {
      iconKey: "battery" as const,
      bento: "tile" as const,
      title: "Lityum Batarya Çözümleri",
      description:
        "LiFePO₄ ve modüler paket seçenekleriyle konut, ticari ve endüstriyel ihtiyaçlar için güvenli enerji arabelleği.",
      href: `${storeBaseUrl}/lityum-bataryalar`,
      imageSrc:
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Elektrik panosu ve güç dağıtım ekipmanı",
    },
    {
      iconKey: "storage" as const,
      bento: "tile" as const,
      title: "Enerji Depolama Sistemleri",
      description:
        "Şebeke, hibrit ve adaya özgü senaryolarda kapasite ve güç dengesini sağlayan depolama mimarileri.",
      href: `${storeBaseUrl}/bataryalar`,
      imageSrc:
        "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Yenilenebilir enerji santrali ve gökyüzü",
    },
    {
      iconKey: "inverter" as const,
      bento: "tile" as const,
      title: "İnverter ve Güç Elektroniği",
      description:
        "Off-grid, on-grid ve hibrit inverterler; sulama ve sürücü uygulamaları için güç dönüşümü.",
      href: `${storeBaseUrl}/inverterler`,
      imageSrc:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Elektronik devre kartı ve bileşenler",
    },
    {
      iconKey: "irrigation" as const,
      bento: "tile" as const,
      title: "Tarımsal Solar Sulama",
      description:
        "Pompa gücü, başlangıç akımı ve saha koşullarına uygun sulama odaklı güç sistemleri.",
      href: `${storeBaseUrl}/tarimsal-sulama-sistemleri`,
      imageSrc:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Seralarda damla sulama sistemi",
    },
    {
      iconKey: "ev" as const,
      bento: "tile" as const,
      title: "Elektrikli Araç Şarj Çözümleri",
      description:
        "Konut, işletme ve küçük filo ihtiyaçları için AC/DC şarj ürünleri ve aksesuarlar.",
      href: `${storeBaseUrl}/elektrikli-arac-sarj-istasyonlari`,
      imageSrc:
        "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Elektrikli araç şarj istasyonu",
    },
  ],
} as const;

export const whyUsSection = {
  id: "neden-biz",
  title: "Neden IonBATech?",
  subtitle:
    "Enerji donanımında teknik doğruluk ve tedarik güveni bir arada olmalı; bunu standart kabul ediyoruz.",
  items: [
    {
      key: "engineering" as const,
      title: "Mühendislik yaklaşımı",
      description:
        "Ürün seçiminde katalogdan öte; yük, çevrim ve saha koşullarına göre mantıklı eşleştirme.",
    },
    {
      key: "custom" as const,
      title: "İhtiyaca özel çözümleme",
      description:
        "Hazır paketlerden özel konfigürasyonlara kadar proje ölçeğinize uygun alternatifler.",
    },
    {
      key: "catalog" as const,
      title: "Güvenilir ürün seçkisi",
      description:
        "Batarya, inverter ve solar hattında tutarlı kalite ve belgelendirme beklentisiyle seçilmiş ürünler.",
    },
    {
      key: "support" as const,
      title: "Satış öncesi ve sonrası destek",
      description:
        "Kurulum öncesi teknik sorular ve sonrası yönlendirme için erişilebilir iletişim kanalları.",
    },
    {
      key: "local" as const,
      title: "Yerel ulaşılabilirlik",
      description:
        "Kayseri merkezli operasyon anlayışıyla Türkiye genelinde sipariş ve lojistik süreçlerine odaklanma.",
    },
    {
      key: "field" as const,
      title: "Saha odaklı yaklaşım",
      description:
        "Tarımsal sulama, bağ evi, ticari çatı ve benzeri gerçek kullanım senaryolarına pratik çözümler.",
    },
  ],
} as const;

export type WhyUsItemKey = (typeof whyUsSection.items)[number]["key"];

export const categoriesSection = {
  id: "kategoriler",
  title: "Öne Çıkan Kategoriler",
  subtitle:
    "Mağazamızdaki ana ürün gruplarına hızlı geçiş yapın; detaylı listelemeler için vitrinimize yönlendiriyoruz.",
  items: [
    {
      title: "Bataryalar",
      href: `${storeBaseUrl}/bataryalar`,
      description: "Lityum paketler ve taşınabilir güç ürünleri",
      imageSrc:
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Elektrik panosu ve güç ekipmanları",
    },
    {
      title: "İnverterler",
      href: `${storeBaseUrl}/inverterler`,
      description: "Off-grid, on-grid, hibrit ve sulama hatları",
      imageSrc:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Elektronik devre kartı",
    },
    {
      title: "Güneş Panelleri",
      href: `${storeBaseUrl}/gunes-panelleri`,
      description: "Sabit ve taşınabilir panel seçenekleri",
      imageSrc:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Güneş panelleri",
    },
    {
      title: "Solar Paket Sistemler",
      href: `${storeBaseUrl}/solar-paket-sistemler`,
      description: "Önceden ölçeklenmiş komple paketler",
      imageSrc:
        "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Çatıda güneş enerjisi kurulumu",
    },
    {
      title: "Tarımsal Sulama Sistemleri",
      href: `${storeBaseUrl}/tarimsal-sulama-sistemleri`,
      description: "Pompa ve sulama odaklı güç çözümleri",
      imageSrc:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Sera ve damla sulama",
    },
    {
      title: "EV Şarj Ürünleri",
      href: `${storeBaseUrl}/elektrikli-arac-sarj-istasyonlari`,
      description: "İstasyon, ünite ve aksesuarlar",
      imageSrc:
        "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Elektrikli araç şarj istasyonu",
    },
  ],
} as const;

export const processSection = {
  id: "surec",
  title: "Nasıl Çalışıyoruz?",
  subtitle:
    "Tek tip satış akışı yerine, ihtiyacı netleştiren ve doğru ürüne yönlendiren sade bir süreç.",
  steps: [
    {
      title: "İhtiyacı Analiz Ediyoruz",
      description:
        "Yük profili, çalışma süresi, şebeke durumu ve saha kısıtlarını birlikte değerlendiririz.",
    },
    {
      title: "Doğru Sistemi Kurguluyoruz",
      description:
        "Batarya kapasitesi, inverter gücü ve koruma katmanları için dengeli bir mimari öneririz.",
    },
    {
      title: "Uygun Ürün ve Çözümü Sunuyoruz",
      description:
        "Stoklu ürün gruplarımızdan projenize uygun konfigürasyonu ve alternatifleri paylaşırız.",
    },
    {
      title: "Destek ve Yönlendirme Sağlıyoruz",
      description:
        "Kurulum ve devreye alma aşamalarında teknik sorularınıza yanıt ve yönlendirme sunarız.",
    },
  ],
} as const;

export const statsSection = {
  id: "rakamlar",
  title: "Ölçek ve Yaklaşım",
  subtitle:
    "Abartılı vaatler yerine, operasyonunuzu planlarken işinize yarayacak çerçeve veriler.",
  metrics: [
    {
      label: "Ürün Grubu",
      value: "6+ ana kategori",
      hint: "Bataryadan EV şarja geniş hat",
      tone: "emerald" as const,
    },
    {
      label: "Çözüm Alanı",
      value: "Konut · Ticari · Tarım",
      hint: "Farklı saha senaryoları",
      tone: "ocean" as const,
    },
    {
      label: "Teknik Destek",
      value: "Satış öncesi / sonrası",
      hint: "Sorunuzu doğru kanala yönlendirme",
      tone: "amber" as const,
    },
    {
      label: "Kurumsal Yaklaşım",
      value: "Şeffaf süreç",
      hint: "Teklif ve tedarik netliği",
      tone: "violet" as const,
    },
  ],
} as const;

export const faqSection = {
  id: "sss",
  title: "Sıkça Sorulan Sorular",
  subtitle:
    "Enerji donanımı seçiminde en çok tekrar eden konulara kısa ve net yanıtlar.",
  items: [
    {
      id: "faq-battery",
      question: "Hangi batarya çözümlerini sunuyorsunuz?",
      answer:
        "Lityum teknolojili paketler, modüler depolama üniteleri ve taşınabilir güç ürünleri başta olmak üzere farklı voltaj ve kapasite seçenekleri sunuyoruz. Uygulamanıza göre doğru kimyasayı ve BMS uyumunu birlikte değerlendiririz.",
    },
    {
      id: "faq-ess",
      question: "Enerji depolama sistemi seçerken nelere dikkat edilmeli?",
      answer:
        "Günlük derin deşarj, tepe güç ihtiyacı, şarj kaynağı, sıcaklık aralığı ve genişleme payı temel başlıklardır. İnverter ve koruma ekipmanlarıyla uyum, uzun ömür için en az kapasite kadar kritiktir.",
    },
    {
      id: "faq-irrigation",
      question: "Solar sulama sistemleri hangi alanlarda kullanılır?",
      answer:
        "Özellikle şebeke erişiminin sınırlı olduğu tarımsal parsellerde, pompa başlangıç akımının yüksek olduğu sulama hatlarında ve gün içi üretimle pompa çalışmasını eşleştirmek isteyen işletmelerde tercih edilir.",
    },
    {
      id: "faq-ev",
      question: "EV şarj çözümleri sunuyor musunuz?",
      answer:
        "Evet; konut ve işletme tipi şarj üniteleri ile ilgili aksesuarları ürün gamımızda bulunduruyoruz. Kurulum tipi ve tesis altyapısına göre uygun güç sınıfını seçmenize yardımcı oluruz.",
    },
    {
      id: "faq-bulk",
      question: "Toplu alım veya proje bazlı teklif alabilir miyim?",
      answer:
        "Kurumsal ve proje bazlı ihtiyaçlar için iletişim kanallarımız üzerinden talebinizi paylaşabilirsiniz. Miktar, teslimat bölgesi ve ürün kırılımına göre değerlendirme yapılır.",
    },
    {
      id: "faq-tech",
      question: "Teknik destek sağlıyor musunuz?",
      answer:
        "Ürün seçimi, uyumluluk ve kurulum öncesi teknik sorularınız için destek sunuyoruz. Karmaşık saha müdahaleleri için yetkili servis yönlendirmesi gerekebilir; bu durumda şeffaf biçimde bilgilendiririz.",
    },
  ],
} as const;

export const ctaSection = {
  id: "cta",
  title: "Projeniz için doğru güç mimarisini birlikte netleştirelim",
  subtitle:
        "Teklif talebinizi iletin veya mağazamızdan ürün gruplarını inceleyerek ihtiyacınıza uygun bileşenlere hızlıca ulaşın.",
  primary: { label: "Teklif Al", href: contactHref },
  secondary: { label: "İletişime Geç", href: contactHref },
} as const;

export const footerContent = {
  tagline:
    "IonBATech; batarya teknolojileri, enerji depolama ve yenilenebilir enerji ekipmanlarında güvenilir tedarik ve teknik yönlendirme sunar.",
  quickLinks: [
    { label: "Çözümler", href: "#cozumler" },
    { label: "Kategoriler", href: "#kategoriler" },
    { label: "Neden Biz", href: "#neden-biz" },
    { label: "SSS", href: "#sss" },
  ],
  categoryLinks: categoriesSection.items.map((c) => ({
    label: c.title,
    href: c.href,
  })),
  contact: {
    title: "İletişim",
    lines: [
      "Mevlana, Şehit Fatih Duman Sk. No:34B, 38280 Talas/Kayseri",
      "0552 008 96 37",
      "info@ionbatech.com",
    ],
  },
  social: [
    { label: "LinkedIn", href: `${siteUrl}` },
    { label: "Instagram", href: `${siteUrl}` },
  ],
  legal: `© ${new Date().getFullYear()} IonBATech. Tüm hakları saklıdır.`,
} as const;
