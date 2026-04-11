/** Admin blog listesi — mock; API bağlanınca kaldırılacak. */
export type AdminBlogRow = {
  id: string;
  slug: string;
  title: string;
  coverImageUrl: string;
  /** ISO tarih veya null (taslak) */
  publishedAt: string | null;
  status: "published" | "draft";
  seoTags: string;
};

export const adminPublishedBlogs: AdminBlogRow[] = [
  {
    id: "1",
    slug: "lifepo4-bataryalarda-bms-rolu",
    title: "LiFePO₄ bataryalarda BMS’in rolü: güvenlik ve ömür",
    coverImageUrl:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=120&q=80",
    publishedAt: "2026-03-12",
    status: "published",
    seoTags: "LiFePO4, BMS, batarya güvenliği",
  },
  {
    id: "2",
    slug: "hibrit-inverter-seciminde-dikkat-edilecekler",
    title: "Hibrit inverter seçiminde dikkat edilmesi gerekenler",
    coverImageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=120&q=80",
    publishedAt: "2026-02-28",
    status: "published",
    seoTags: "hibrit inverter, GES, şebeke",
  },
  {
    id: "3",
    slug: "ges-enerji-depolama-trendleri",
    title: "GES projelerinde enerji depolama trendleri",
    coverImageUrl:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=120&q=80",
    publishedAt: "2026-01-20",
    status: "published",
    seoTags: "GES, enerji depolama, öz tüketim",
  },
  {
    id: "4",
    slug: "ev-tipi-solar-kapasite-planlama",
    title: "Ev tipi solar sistemlerde kapasite planlama",
    coverImageUrl:
      "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=120&q=80",
    publishedAt: "2025-12-08",
    status: "published",
    seoTags: "konut solar, kapasite, inverter",
  },
];

export const adminDraftBlogs: AdminBlogRow[] = [
  {
    id: "d1",
    slug: "kurumsal-cati-depolama-notlari",
    title: "Kurumsal çatı depolama — taslak notlar",
    coverImageUrl:
      "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=120&q=80",
    publishedAt: null,
    status: "draft",
    seoTags: "kurumsal, ESS, tepe yük",
  },
  {
    id: "d2",
    slug: "sulama-motoru-baslangic-akimi",
    title: "Sulama motoru başlangıç akımı hesabı",
    coverImageUrl:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=120&q=80",
    publishedAt: null,
    status: "draft",
    seoTags: "tarım, sulama, solar",
  },
];
