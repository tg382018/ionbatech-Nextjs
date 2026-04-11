import { siteUrl } from "@/lib/seo";

export const brandName = "IonBATech";

/** Served from `public/logo_ionbatech.svg` */
export const logoSrc = "/logo_ionbatech.svg";
export const logoAlt = "IonBATech";

export const storeBaseUrl = "https://market.ionbatech.com";

export const navLinks = [
  { label: "Anasayfa", href: "/#anasayfa" },
  { label: "Çözümler", href: "/#cozumler" },
  { label: "Ürünler", href: storeBaseUrl },
  { label: "Neden Biz", href: "/#neden-biz" },
  { label: "Blog", href: "/blog" },
  { label: "SSS", href: "/#sss" },
  { label: "İletişim", href: "/#iletisim" },
] as const;

export const contactHref = `${storeBaseUrl}/iletisim`;
export const shopHomeHref = storeBaseUrl;

export const heroContent = {
  headlineLine1: "Enerji depolama ve solar sistemlerde",
  headlineLine2: "mühendislikle kurulan güvenilir altyapı.",
  subheading:
    "IonBATech yalnızca ürün satmaz: yük profilinize göre batarya ve inverter eşleştirmesi, koruma katmanları ve uzun vadeli çalışırılırlık için sistem tasarımı ve danışmanlık sunar.",
  primaryCta: { label: "Teklif Al", href: contactHref },
  secondaryCta: { label: "Sistem Planınızı Görün", href: "/#surec" },
  tertiaryCta: { label: "Çözümlerimiz", href: "/#cozumler" },
} as const;

/** Full-bleed hero: video arka plan + poster / hareket azaltma yedeği. */
export const heroBanner = {
  videoSrc: "/video.mp4",
  imageSrc:
    "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=2400&q=80",
  imageAlt: "Modern çatı üzerinde güneş panelleri kurulumu",
  badge: "Sistem entegrasyonu · Kapasite planlama · Teknik destek",
} as const;

export const heroTrustBadgeItems = [
  { label: "Doğru kapasite planlama", icon: "cpu" as const },
  { label: "BMS ve koruma katmanları", icon: "shield" as const },
  { label: "Kurulum sonrası teknik destek", icon: "headset" as const },
] as const;

/** Güven / otorite şeridi (ürün değil, iş yapış şekli). */
export const brandTrustStripItems = [
  {
    label: "Mühendislik yaklaşımı",
    subtitle: "Ölçüm ve senaryoya dayalı tasarım",
    key: "engineering" as const,
  },
  {
    label: "Güvenli enerji altyapısı",
    subtitle: "Koruma, BMS ve uyum kontrolleri",
    key: "safety" as const,
  },
  {
    label: "Doğru ürün seçimi",
    subtitle: "İnverter, batarya, panel eşleştirmesi",
    key: "selection" as const,
  },
  {
    label: "Satış sonrası destek",
    subtitle: "Devreye alma ve soru yanıtı",
    key: "support" as const,
  },
  {
    label: "Kayseri merkezli operasyon",
    subtitle: "Türkiye geneli lojistik",
    key: "hq" as const,
  },
] as const;

/** Ana sayfa — iş ortakları kayan şerit (logo görselleri `public/` altında). */
export const partnersSection = {
  id: "ortaklar",
  badge: "İş birliği ortak firmalar",
  title: "Dünya Markaları ile Güçlü Ortaklık",
  subtitle:
    "Dünyanın ve Türkiye'nin önde gelen enerji markalarıyla birlikte geliştirdiğimiz yüksek verimli çözümleri sizlere sunuyoruz.",
  partners: [
    {
      key: "cw-enerji" as const,
      name: "CW Enerji",
      imageSrc: "/cw-enerji.webp",
      imageAlt: "CW Enerji logosu",
    },
    {
      key: "solinved" as const,
      name: "Solinved",
      imageSrc: "/solinved.svg",
      imageAlt: "Solinved logosu",
    },
    {
      key: "tommatech" as const,
      name: "Tommatech",
      imageSrc: "/tommatech.webp",
      imageAlt: "Tommatech logosu",
    },
  ],
} as const;

export type SolutionIconKey =
  | "battery"
  | "storage"
  | "inverter"
  | "solar"
  | "irrigation"
  | "ev";

export const solutionsSection = {
  id: "cozumler",
  title: "IonBATech çözümleri",
  subtitle:
    "Konut, villa, tarım, ticari ve küçük endüstri için depolama, üretim ve güç elektroniğini tek mimaride birleştiriyoruz.",
  items: [
    {
      iconKey: "storage" as const,
      bento: "hero" as const,
      title: "Enerji Depolama Sistemleri",
      description:
        "Şebeke destekli, adaya özel veya hibrit senaryolarda günlük çevrim ve tepe güç ihtiyacına göre tasarlanan ESS hatları.",
      benefits: [
        "Kapasite ve güç sınıfının yük profiline göre netleştirilmesi",
        "Genişleme payı ile modüler büyüme planı",
        "Aşırı akım, gerilim ve sıcaklık için koruma stratejisi",
      ] as const,
      href: `${storeBaseUrl}/bataryalar`,
      imageSrc:
        "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=1400&q=80",
      imageAlt: "Yenilenebilir enerji ve depolama altyapısı",
    },
    {
      iconKey: "battery" as const,
      bento: "tile" as const,
      title: "LiFePO4 Batarya Sistemleri",
      description:
        "LiFePO₄ kimyası, dengeli deşarj eğrileri ve BMS ile uzun ömürlü, güvenli paketler; gerekirse özel batarya konfigürasyonları.",
      benefits: [
        "Döngü ömrü ve termal stabilite için uygun kimya seçimi",
        "Hücre dengesi ve batarya yönetim sistemi (BMS) uyumu",
        "İnverter ve şarj kaynağı ile doğru voltaj bloğu eşlemesi",
      ] as const,
      href: `${storeBaseUrl}/lityum-bataryalar`,
      imageSrc:
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Enerji depolama ve güç ekipmanları",
    },
    {
      iconKey: "solar" as const,
      bento: "tile" as const,
      title: "Solar Enerji Sistemleri",
      description:
        "Panel dizilimi, üretim tahmini ve depolama veya şebeke ile entegrasyon için doğru boyutlandırma.",
      benefits: [
        "Üretim ve tüketim dengesine göre panel gücü",
        "On-grid, off-grid veya hibrit topoloji seçimi",
        "Paket veya özel tasarım; yatırımınıza uygun ölçek",
      ] as const,
      href: `${storeBaseUrl}/solar-paket-sistemler`,
      imageSrc:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Güneş panelleri",
    },
    {
      iconKey: "inverter" as const,
      bento: "tile" as const,
      title: "İnverter ve Güç Elektroniği",
      description:
        "Off-grid, on-grid ve hibrit inverterler; yedek güç, pompa sürücüleri ve güç kalitesi ihtiyacına göre seçim.",
      benefits: [
        "Tepe yük ve sürekli güç için doğru inverter sınıfı",
        "Batarya ve PV girişlerinin uyumlu yönetimi",
        "Koruma röleleri ve şebeke kurallarına uygun yapılandırma",
      ] as const,
      href: `${storeBaseUrl}/inverterler`,
      imageSrc:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Güç elektroniği bileşenleri",
    },
    {
      iconKey: "irrigation" as const,
      bento: "tile" as const,
      title: "Tarımsal Solar Sulama",
      description:
        "Pompa başlangıç akımı, günlük sulama süresi ve parsel koşullarına göre solar + gerektiğinde depolama tasarımı.",
      benefits: [
        "Motor ve pompa için başlangıç gücü hesabı",
        "Şebeke olmadan veya hibrit sulama senaryoları",
        "Mevsimsel üretim dalgalanmasına dayanıklı yapı",
      ] as const,
      href: `${storeBaseUrl}/tarimsal-sulama-sistemleri`,
      imageSrc:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Tarımsal sulama ve sera",
    },
    {
      iconKey: "ev" as const,
      bento: "tile" as const,
      title: "EV Şarj Çözümleri",
      description:
        "Konut, işletme ve küçük filolar için AC/DC istasyonlar; tesis altyapısı ve mevcut güç sınırına göre planlama.",
      benefits: [
        "Mevcut enerji sistemine uygun şarj gücü",
        "Yük yönetimi ve ileride genişlemeye açık altyapı",
        "Ürün seçimi ve teknik yönlendirme",
      ] as const,
      href: `${storeBaseUrl}/elektrikli-arac-sarj-istasyonlari`,
      imageSrc:
        "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Elektrikli araç şarj noktası",
    },
  ],
} as const;

export type ProblemIconKey =
  | "battery-warning"
  | "zap-off"
  | "sun"
  | "shield-alert"
  | "settings-2";

export const problemSection = {
  id: "yaygin-hatalar",
  badge: "Teknik risk analizi",
  title: "Enerji sistemlerinde sık görülen teknik hatalar",
  subtitle:
    "Katalogdan parça seçmek ile mühendislik tasarımı aynı şey değildir. Yanlış boyutlandırma kısa ömür, kesinti ve güvenlik riskine yol açar.",
  heroTitle: "Doğru mimari nasıl oluşur?",
  heroBody:
    "Yük listesi, çalışma süresi, şarj kaynakları ve koruma senaryolarının birlikte ele alınmasıyla oluşur. Analiz adımı atlandığında sistem hataları kaçınılmazdır.",
  heroTags: ["BMS koruma", "Kapasite planlama", "Uyumluluk"] as const,
  problems: [
    {
      key: "battery-warning" as const,
      title: "Yanlış batarya kapasitesi",
      description:
        "Sadece kWh rakamına odaklanmak, tepe güç ve sıcaklık marjını göz ardı etmek erken kapasite düşüşüne neden olur.",
    },
    {
      key: "zap-off" as const,
      title: "İnverter uyumsuzluğu",
      description:
        "Şarj profili ve haberleşme protokolü inverter ile örtüşmediğinde sistem verimli çalışmaz veya korumaya geçer.",
    },
    {
      key: "sun" as const,
      title: "Panel ve depolama dengesizliği",
      description:
        "Aşırı veya yetersiz PV gücü, bataryanın şebeke dışı senaryolarda dolmadan tükenmesine yol açar.",
    },
    {
      key: "shield-alert" as const,
      title: "Ucuz ve güvensiz ekipman",
      description:
        "Belirsiz BMS ve belgesiz ürünler yangın riskini artırır; uzun vadede maliyeti iki katına çıkarır.",
    },
    {
      key: "settings-2" as const,
      title: "Yanlış sistem tasarımı",
      description:
        "Kablo kesitleri, topraklama ve AC/DC ayrımı gibi detaylar atlandığında kurulum sürdürülebilir değildir.",
      aside:
        "“Çalışıyor” görünmesi, sistemin güvenli olduğu anlamına gelmez.",
    },
  ],
  ctaBrand: "IonBATech",
  ctaBeforeEmphasis: " projeleri bu yüzden ürün listesinden önce ",
  ctaEmphasis: "enerji ihtiyaç analizi",
  ctaAfterEmphasis: " ve sistem mimarisi ile başlatılır.",
} as const;

export const systemArchitectureSection = {
  id: "sistem-mimarisi",
  title: "Modern enerji sistemi nasıl işler?",
  subtitle:
    "Üretim, dönüşüm, depolama ve tüketim tek zincirde tanımlanır; her halka bir öncekinin sınırlarına göre boyutlanır.",
  diagramHeadline: "Sistemin kalbi: inverter",
  diagramLead:
    "Tüm enerji kaynakları ve depolama birimleri merkezdeki inverterde toplanır; yönetilen ve dönüştürülen enerji son olarak tüketime yönlendirilir.",
  hub: {
    title: "Akıllı inverter",
    description:
      "Sistemin kalbi. Tüm enerjiyi toplar, dönüştürür ve yönetir.",
  },
  nodes: {
    grid: {
      title: "Şebeke / Off-grid",
      subtitle: "Çift yönlü aktarım",
    },
    solar: {
      title: "Solar paneller",
      subtitle: "Ana DC üretim kaynağı",
    },
    battery: {
      title: "Batarya grubu",
      subtitle: "Depolama ve yedekleme",
    },
    load: {
      title: "Son kullanıcı (ev)",
      subtitle: "Konut, işletme, yük",
    },
  },
  safeFlowTitle: "Güvenli ve kesintisiz akış",
  safeFlowBody:
    "İnverter; güneş panellerinden, şebekeden ve bataryadan gelen gücü eş zamanlı hesaplar. Enerji üretiminin yüksek olduğu anlarda bataryayı şarj ederken, tüketimin arttığı anlarda depolanan gücü devreye sokarak eve giden enerjinin kesintisiz kalmasına yardımcı olur.",
  integrationTitle: "Kapasite planlama ve entegrasyon",
  integrationParagraphs: [
    "Panel gücü, inverter nominal ve tepe gücü, kullanılabilir batarya kapasitesi ve yedek süresi bir bütün olarak hesaplanır.",
    "Koruma cihazları, kablo boyutları ve BMS (Batarya Yönetim Sistemi) limitleri bu mühendisliğin ayrılmaz parçasıdır.",
    "Gerçek entegrasyon; sadece kabloları bağlamak değil, tüm bileşenlerin maksimum verim ve güvenli çalışma sınırları içinde senkronize olmasını sağlamaktır.",
  ] as const,
} as const;

export type UseCaseIconKey =
  | "cottage"
  | "farm"
  | "commercial"
  | "backup"
  | "hybrid";

export const useCasesSection = {
  id: "kullanim-senaryolari",
  title: "Kullanım senaryoları",
  subtitle:
    "Bağ evinden çiftliğe, ticari çatıdan kesintiye dayanıklı yedek güce kadar gerçek saha örnekleri.",
  items: [
    {
      iconKey: "cottage" as const,
      title: "Bağ evi enerji sistemi",
      description:
        "Sınırlı şebeke veya tam ada kullanımında gün içi tüketim ve gece yedek süresi için solar + LiFePO₄ ve doğru inverter gücü.",
    },
    {
      iconKey: "farm" as const,
      title: "Çiftlik ve tarımsal sulama",
      description:
        "Pompa motorunun başlangıç akımı ve sulama pencereleri dikkate alınarak solar ve gerekirse tamamlayıcı depolama tasarımı.",
    },
    {
      iconKey: "commercial" as const,
      title: "Ticari bina enerji depolama",
      description:
        "Tepe yükleri yumuşatma, kesinti anında kritik yükleri ayırma veya üretim-tüketim dengesini iyileştirme odaklı ESS.",
    },
    {
      iconKey: "backup" as const,
      title: "Elektrik kesintisine karşı yedek güç",
      description:
        "Şebeke düştüğünde otomatik devreye giren yedek mimarisi; yük önceliklendirme ve batarya sağlık izleme ile planlanır.",
    },
    {
      iconKey: "hybrid" as const,
      title: "Solar + batarya hibrit sistemler",
      description:
        "Gündüz üretimi depolayıp gece veya yüksek tarifede kullanma; şebeke ile güvenli paralel çalışma için doğru inverter ve koruma.",
    },
  ],
} as const;

export const whyUsSection = {
  id: "neden-biz",
  badge: "NEDEN BİZ?",
  title: "Neden IonBATech?",
  items: [
    {
      key: "turnkey" as const,
      title: "Anahtar Teslim Kurulum",
      description:
        "Profesyonel ekibimiz tüm kurulum sürecini sizin için yönetir",
    },
    {
      key: "warranty" as const,
      title: "25 Yıl Garanti",
      description:
        "Tüm sistemlerimiz 25 yıl performans garantisi ile gelir",
    },
    {
      key: "nationwide" as const,
      title: "Türkiye Geneli Hizmet",
      description:
        "81 ilde profesyonel kurulum ve servis hizmeti",
    },
    {
      key: "engineering" as const,
      title: "Uzman Mühendislik",
      description:
        "Deneyimli mühendis kadromuzla size özel çözümler",
    },
  ],
} as const;

export type WhyUsItemKey = (typeof whyUsSection.items)[number]["key"];

export const categoriesSection = {
  id: "kategoriler",
  title: "Ürün grupları özeti",
  subtitle:
    "Mağazamızdaki ana hatlar; detaylı modeller ve stok için vitrine yönlendiriyoruz.",
  items: [
    {
      title: "LiFePO4 Bataryalar",
      href: `${storeBaseUrl}/lityum-bataryalar`,
      description: "Paket sistemler, modüler bloklar ve özel konfigürasyon ihtiyaçları",
      imageSrc:
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Batarya ve güç ekipmanları",
    },
    {
      title: "İnverter Sistemleri",
      href: `${storeBaseUrl}/inverterler`,
      description: "Off-grid, on-grid, hibrit ve sulama uygulamaları",
      imageSrc:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "İnverter ve elektronik",
    },
    {
      title: "Solar Paneller",
      href: `${storeBaseUrl}/gunes-panelleri`,
      description: "Sabit ve taşınabilir PV modüller",
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
      imageAlt: "Çatı solar kurulumu",
    },
    {
      title: "Tarımsal Sulama Çözümleri",
      href: `${storeBaseUrl}/tarimsal-sulama-sistemleri`,
      description: "Pompa gücü ve sahaya uygun güç aktarımı",
      imageSrc:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Tarımsal sulama",
    },
    {
      title: "EV Şarj Üniteleri",
      href: `${storeBaseUrl}/elektrikli-arac-sarj-istasyonlari`,
      description: "Konut ve işletme tipi şarj istasyonları",
      imageSrc:
        "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "EV şarj",
    },
  ],
} as const;

export const processSection = {
  id: "surec",
  title: "Nasıl Çalışır?",
  steps: [
    {
      title: "İhtiyacını Belirle",
      description:
        "Enerji ihtiyacınızı belirleyin ve size en uygun sistemi seçin",
    },
    {
      title: "Ücretsiz Keşif",
      description:
        "Uzman ekibimiz ücretsiz keşif yapar ve size özel teklif sunar",
    },
    {
      title: "Kurulum",
      description:
        "Profesyonel ekibimiz sistemi kurar ve devreye alır",
    },
    {
      title: "Üretmeye Başla",
      description:
        "Sisteminiz çalışmaya başlar ve enerji üretmeye başlarsınız",
    },
  ],
} as const;

export const statsSection = {
  id: "rakamlar",
  stats: [
    {
      key: "systems" as const,
      value: 500,
      label: "Kurulu Sistem",
      format: "plus" as const,
    },
    {
      key: "power" as const,
      value: 50,
      label: "Toplam Kurulu Güç",
      format: "unit" as const,
      unit: "MW",
    },
    {
      key: "provinces" as const,
      value: 81,
      label: "Hizmet Verilen İl",
      format: "plain" as const,
    },
  ],
} as const;

export const faqSection = {
  id: "sss",
  title: "Sıkça sorulan sorular",
  subtitle:
    "Depolama, solar ve güvenlik konularında en sık yöneltilen teknik sorulara özet yanıtlar.",
  items: [
    {
      id: "faq-storage",
      question: "Enerji depolama sistemi nasıl seçilir?",
      answer:
        "Önce yük listesi ve yedek süre hedefi netleştirilir. Günlük çevrilebilir enerji (kWh), tepe güç (kW), şarj kaynağı (şebeke / PV) ve sıcaklık aralığı birlikte incelenir. İnverterin batarya voltajı ve BMS ile uyumu, kablo ve koruma bileşenleri aynı tasarımın parçasıdır.",
    },
    {
      id: "faq-lifepo4",
      question: "LiFePO4 batarya neden tercih edilir?",
      answer:
        "LiFePO₄ kimyası termal olarak daha stabil kabul edilir ve döngü ömrü tipik olarak tüketici sınıfı lityum iyonlara göre daha öngörülebilirdir. Ancak yine de doğru BMS, hücre dengesi ve inverter şarj ayarları şarttır; ürün kalitesi ve belgelendirme seçimi kritiktir.",
    },
    {
      id: "faq-outage",
      question: "Solar sistem elektrik kesintisinde çalışır mı?",
      answer:
        "Yalnızca paneller yetmez; kesintide yedek için uygun inverter topolojisi (ada veya yedek çıkış), batarya ve koruma şeması gerekir. On-grid-only kurulumlar şebeke düştüğünde üretimi güvenlik nedeniyle durdurabilir. İhtiyacınıza göre off-grid veya hibrit mimari tanımlanmalıdır.",
    },
    {
      id: "faq-cottage",
      question: "Bağ evi için hangi sistem gerekir?",
      answer:
        "Kullanılan cihazlar, gece çalışma süresi ve şebeke varlığına göre değişir. Küçük ada sistemlerde genelde solar + LiFePO₄ + off-grid/hibrit inverter; yük listesi kabaca çıkarılıp batarya kWh ve inverter kW buna göre seçilir.",
    },
    {
      id: "faq-irrigation",
      question: "Tarımsal sulama için solar sistem uygun mu?",
      answer:
        "Evet; ancak pompanın başlangıç akımı ve günlük sulama saatleri hesaba katılmalıdır. Sadece gündüz sulama yapılıyorsa depolamasız senaryo mümkün olabilir; gece veya düzensiz kullanımda batarya veya şebeke tamamlayıcısı planlanır.",
    },
    {
      id: "faq-hybrid",
      question: "Solar + batarya hibrit sistem nasıl planlanır?",
      answer:
        "Gündüz fazla PV üretiminin bataryaya aktarılması, gece tüketimi veya kesinti anında devreye girmesi için inverterin hem PV hem batarya hatlarını yönetmesi gerekir. Şebeke uyumu, koruma ve mevzuat gereksinimleri proje detayında kontrol edilir.",
    },
    {
      id: "faq-bms",
      question: "BMS ve sistem güvenliği neden önemli?",
      answer:
        "Batarya yönetim sistemi hücre voltajlarını ve sıcaklığı izler; aşırı şarj/deşarjı sınırlar. Doğru sigorta, DC kesici ve kablo güzergâhı ile birlikte yangın ve ekipman riskini azaltır. Ucuz ve belgesiz paketler bu katmanlarda eksik kalabilir.",
    },
    {
      id: "faq-quote",
      question: "Teklif ve sistem planı nasıl alabilirim?",
      answer:
        "İletişim formumuz veya mağaza iletişim kanalı üzerinden yükünüzü, saha bilgisini ve hedefinizi paylaşabilirsiniz. Ön değerlendirme sonrası kapasite aralığı ve uygun ürün ailesi önerilir; gerekirse sahaya özel revizyon yapılır.",
    },
  ],
} as const;

export const ctaSection = {
  id: "cta",
  title: "Projeniz için doğru enerji mimarisini birlikte planlayalım.",
  subtitle:
    "Teklif talebinizi iletin; yük profilinize ve saha koşullarınıza göre sistem çerçevesini ve ürün önerisini netleştirelim.",
  primary: { label: "Teklif Al", href: contactHref },
  secondary: { label: "Süreci İncele", href: "/#surec" },
} as const;

export const footerContent = {
  tagline:
    "IonBATech; enerji depolama, LiFePO₄ batarya, solar sistemler, güç elektroniği ve EV şarjında mühendislik odaklı tasarım, kurulum desteği ve güvenilir tedarik sunar.",
  quickLinks: [
    { label: "Çözümler", href: "/#cozumler" },
    { label: "Yaygın hatalar", href: "/#yaygin-hatalar" },
    { label: "Sistem mimarisi", href: "/#sistem-mimarisi" },
    { label: "Senaryolar", href: "/#kullanim-senaryolari" },
    { label: "Ürün grupları", href: "/#kategoriler" },
    { label: "Neden biz", href: "/#neden-biz" },
    { label: "SSS", href: "/#sss" },
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
