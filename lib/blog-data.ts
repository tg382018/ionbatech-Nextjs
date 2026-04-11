export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingMinutes: number;
  author: string;
  coverImage: { src: string; alt: string };
  paragraphs: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "lifepo4-bataryalarda-bms-rolu",
    title: "LiFePO₄ bataryalarda BMS’in rolü: güvenlik ve ömür",
    excerpt:
      "Batarya yönetim sistemi hücre voltajını, sıcaklığı ve dengelemeyi izler; yanlış eşleştirilmiş BMS kısa devre ve kapasite kaybı riskini artırır.",
    publishedAt: "2026-03-12",
    readingMinutes: 6,
    author: "IonBATech",
    coverImage: {
      src: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80",
      alt: "Lityum batarya ve güç elektroniği",
    },
    paragraphs: [
      "Lityum demir fosfat (LiFePO₄) hücreler, doğru çalışma aralığında uzun ömür sunar; ancak bu aralığın dışına çıkıldığında kimyasal stabilite bozulabilir. Batarya yönetim sistemi (BMS), her hücre veya serinin voltajını izleyerek şarj ve deşarj süreçlerinde güvenli sınırlar içinde kalınmasını sağlar.",
      "Aktif dengeleme (aktif balancing), seri bağlı hücreler arasındaki küçük kapasite farklarını zaman içinde büyümeden yönetir. Pasif dengeleme daha ekonomik olsa da ısı üretimi ve enerji kaybı açısından tasarım gereksinimlerine göre değerlendirilmelidir.",
      "İnverter ve şarj kaynağı ile BMS arasındaki haberleşme protokolü (ör. CAN) uyumsuzsa, nominal kapasite kullanılamaz veya koruma katmanları geç devreye girer. Proje öncesi ürün veri sayfaları ve sertifikasyonlar birlikte kontrol edilmelidir.",
    ],
  },
  {
    slug: "hibrit-inverter-seciminde-dikkat-edilecekler",
    title: "Hibrit inverter seçiminde dikkat edilmesi gerekenler",
    excerpt:
      "Şebeke, jeneratör ve PV kaynaklarının birlikte yönetimi için tepe güç, geçiş süreleri ve batarya voltaj aralığı tek çatı altında ele alınmalıdır.",
    publishedAt: "2026-02-28",
    readingMinutes: 7,
    author: "IonBATech",
    coverImage: {
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
      alt: "İnverter ve kontrol ekipmanları",
    },
    paragraphs: [
      "Hibrit inverterler, PV üretimini, şebeke veya off-grid modunu ve batarya akışını koordine eder. Yük profilinizdeki kısa süreli tepe güçler (ör. motor başlangıcı), inverterin sürekli güç değerinden bağımsız olarak değerlendirilmelidir.",
      "Batarya voltajı ile inverter giriş aralığının uyumu, kablo kesiti ve koruma elemanlarıyla birlikte düşünülür. Düşük voltajlı bir paketle yüksek voltajlı bir inverter eşleştirmek, ek dönüştürücü veya farklı batarya bloğu gerektirir.",
      "Kurulum sonrası parametre ayarları (şebeke kodları, anti-islanding, şarj profilleri) sahada doğrulanmalı; uzaktan izleme entegrasyonu varsa port ve güvenlik ayarları dokümante edilmelidir.",
    ],
  },
  {
    slug: "ges-enerji-depolama-trendleri",
    title: "GES projelerinde enerji depolama trendleri",
    excerpt:
      "Öz tüketim, tepe yük yönetimi ve şebeke hizmetleri için batarya entegrasyonu giderek projelerin finansal modeline dahil ediliyor.",
    publishedAt: "2026-01-20",
    readingMinutes: 5,
    author: "IonBATech",
    coverImage: {
      src: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80",
      alt: "Güneş enerjisi santrali ve paneller",
    },
    paragraphs: [
      "Güneş enerjisi üretiminin öngörülebilir olması, depolama ile birleştiğinde tüketim ile üretim arasındaki zaman kaymasını kapatır. Ticari işletmelerde gündüz üretilen enerjinin akşam veya yüksek tarifeli saatlerde kullanılması, yatırım geri dönüşünü doğrudan etkiler.",
      "Çevrim sayısı, derin deşarj limitleri ve sıcaklık çalışma aralığı, batarya kimyası seçiminde belirleyicidir. LiFePO₄, güvenlik ve döngü ömrü açısından birçok sabit GES uygulamasında tercih edilmektedir.",
      "Projeler büyüdükçe izleme, alarm ve raporlama altyapısı operasyon maliyetini belirler; erken aşamada doğru sensör ve iletişim mimarisi planlanmalıdır.",
    ],
  },
  {
    slug: "ev-tipi-solar-kapasite-planlama",
    title: "Ev tipi solar sistemlerde kapasite planlama",
    excerpt:
      "Yıllık tüketim tek başına yeterli değil; günlük profil, yedek süre beklentisi ve gelecekteki yük artışı birlikte hesaplanmalıdır.",
    publishedAt: "2025-12-08",
    readingMinutes: 6,
    author: "IonBATech",
    coverImage: {
      src: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=900&q=80",
      alt: "Konut çatısında güneş paneli kurulumu",
    },
    paragraphs: [
      "Konut tipi kurulumlarda tavan alanı ve çatı yönü, panel sayısının üst sınırını belirler. Ancak inverter ve batarya boyutu, aynı zamanda ana pano ve koruma bileşenlerinin yükünü de etkiler.",
      "Yedek güç beklentisi yüksekse, batarya kapasitesi kWh cinsinden artırılırken, tepe güç ihtiyacı (kW) inverter seçimini belirler. İkisinden biri eksik kalırsa sistem ya kesintide yetersiz kalır ya da şarj süreleri uzar.",
      "Şebeke bağlantı izinleri ve teknik şartname, bölgeye göre değişir; tasarım aşamasında bu sınırlar netleştirilmeden ekipman listesi kesinleştirilmemelidir.",
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}

export function formatBlogDate(isoDate: string): string {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}
