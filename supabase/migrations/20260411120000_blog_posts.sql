-- Run in Supabase SQL Editor or via CLI. Creates blog_posts, RLS, seed data.

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  published_at timestamptz,
  reading_minutes integer not null default 5,
  author text not null default 'IonBATech',
  cover_image_src text not null,
  cover_image_alt text not null,
  paragraphs jsonb not null default '[]'::jsonb,
  status text not null check (status in ('draft', 'published')),
  seo_tags text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_status_published_at_idx
  on public.blog_posts (status, published_at desc nulls last);

alter table public.blog_posts enable row level security;

drop policy if exists "Public can read published blog posts" on public.blog_posts;
create policy "Public can read published blog posts"
  on public.blog_posts
  for select
  to anon, authenticated
  using (status = 'published');

grant usage on schema public to anon, authenticated;
grant select on table public.blog_posts to anon, authenticated;

-- Seed: four published posts (from former static blog-data) + two drafts (from former admin mock)

INSERT INTO public.blog_posts (slug, title, excerpt, published_at, reading_minutes, author, cover_image_src, cover_image_alt, paragraphs, status, seo_tags) VALUES (
  'lifepo4-bataryalarda-bms-rolu',
  'LiFePO₄ bataryalarda BMS’in rolü: güvenlik ve ömür',
  'Batarya yönetim sistemi hücre voltajını, sıcaklığı ve dengelemeyi izler; yanlış eşleştirilmiş BMS kısa devre ve kapasite kaybı riskini artırır.',
  '2026-03-12'::timestamptz,
  6,
  'IonBATech',
  'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80',
  'Lityum batarya ve güç elektroniği',
  '["Lityum demir fosfat (LiFePO₄) hücreler, doğru çalışma aralığında uzun ömür sunar; ancak bu aralığın dışına çıkıldığında kimyasal stabilite bozulabilir. Batarya yönetim sistemi (BMS), her hücre veya serinin voltajını izleyerek şarj ve deşarj süreçlerinde güvenli sınırlar içinde kalınmasını sağlar.","Aktif dengeleme (aktif balancing), seri bağlı hücreler arasındaki küçük kapasite farklarını zaman içinde büyümeden yönetir. Pasif dengeleme daha ekonomik olsa da ısı üretimi ve enerji kaybı açısından tasarım gereksinimlerine göre değerlendirilmelidir.","İnverter ve şarj kaynağı ile BMS arasındaki haberleşme protokolü (ör. CAN) uyumsuzsa, nominal kapasite kullanılamaz veya koruma katmanları geç devreye girer. Proje öncesi ürün veri sayfaları ve sertifikasyonlar birlikte kontrol edilmelidir."]'::jsonb,
  'published',
  'LiFePO4, BMS, batarya güvenliği'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.blog_posts (slug, title, excerpt, published_at, reading_minutes, author, cover_image_src, cover_image_alt, paragraphs, status, seo_tags) VALUES (
  'hibrit-inverter-seciminde-dikkat-edilecekler',
  'Hibrit inverter seçiminde dikkat edilmesi gerekenler',
  'Şebeke, jeneratör ve PV kaynaklarının birlikte yönetimi için tepe güç, geçiş süreleri ve batarya voltaj aralığı tek çatı altında ele alınmalıdır.',
  '2026-02-28'::timestamptz,
  7,
  'IonBATech',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
  'İnverter ve kontrol ekipmanları',
  '["Hibrit inverterler, PV üretimini, şebeke veya off-grid modunu ve batarya akışını koordine eder. Yük profilinizdeki kısa süreli tepe güçler (ör. motor başlangıcı), inverterin sürekli güç değerinden bağımsız olarak değerlendirilmelidir.","Batarya voltajı ile inverter giriş aralığının uyumu, kablo kesiti ve koruma elemanlarıyla birlikte düşünülür. Düşük voltajlı bir paketle yüksek voltajlı bir inverter eşleştirmek, ek dönüştürücü veya farklı batarya bloğu gerektirir.","Kurulum sonrası parametre ayarları (şebeke kodları, anti-islanding, şarj profilleri) sahada doğrulanmalı; uzaktan izleme entegrasyonu varsa port ve güvenlik ayarları dokümante edilmelidir."]'::jsonb,
  'published',
  'hibrit inverter, GES, şebeke'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.blog_posts (slug, title, excerpt, published_at, reading_minutes, author, cover_image_src, cover_image_alt, paragraphs, status, seo_tags) VALUES (
  'ges-enerji-depolama-trendleri',
  'GES projelerinde enerji depolama trendleri',
  'Öz tüketim, tepe yük yönetimi ve şebeke hizmetleri için batarya entegrasyonu giderek projelerin finansal modeline dahil ediliyor.',
  '2026-01-20'::timestamptz,
  5,
  'IonBATech',
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80',
  'Güneş enerjisi santrali ve paneller',
  '["Güneş enerjisi üretiminin öngörülebilir olması, depolama ile birleştiğinde tüketim ile üretim arasındaki zaman kaymasını kapatır. Ticari işletmelerde gündüz üretilen enerjinin akşam veya yüksek tarifeli saatlerde kullanılması, yatırım geri dönüşünü doğrudan etkiler.","Çevrim sayısı, derin deşarj limitleri ve sıcaklık çalışma aralığı, batarya kimyası seçiminde belirleyicidir. LiFePO₄, güvenlik ve döngü ömrü açısından birçok sabit GES uygulamasında tercih edilmektedir.","Projeler büyüdükçe izleme, alarm ve raporlama altyapısı operasyon maliyetini belirler; erken aşamada doğru sensör ve iletişim mimarisi planlanmalıdır."]'::jsonb,
  'published',
  'GES, enerji depolama, öz tüketim'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.blog_posts (slug, title, excerpt, published_at, reading_minutes, author, cover_image_src, cover_image_alt, paragraphs, status, seo_tags) VALUES (
  'ev-tipi-solar-kapasite-planlama',
  'Ev tipi solar sistemlerde kapasite planlama',
  'Yıllık tüketim tek başına yeterli değil; günlük profil, yedek süre beklentisi ve gelecekteki yük artışı birlikte hesaplanmalıdır.',
  '2025-12-08'::timestamptz,
  6,
  'IonBATech',
  'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=900&q=80',
  'Konut çatısında güneş paneli kurulumu',
  '["Konut tipi kurulumlarda tavan alanı ve çatı yönü, panel sayısının üst sınırını belirler. Ancak inverter ve batarya boyutu, aynı zamanda ana pano ve koruma bileşenlerinin yükünü de etkiler.","Yedek güç beklentisi yüksekse, batarya kapasitesi kWh cinsinden artırılırken, tepe güç ihtiyacı (kW) inverter seçimini belirler. İkisinden biri eksik kalırsa sistem ya kesintide yetersiz kalır ya da şarj süreleri uzar.","Şebeke bağlantı izinleri ve teknik şartname, bölgeye göre değişir; tasarım aşamasında bu sınırlar netleştirilmeden ekipman listesi kesinleştirilmemelidir."]'::jsonb,
  'published',
  'konut solar, kapasite, inverter'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.blog_posts (slug, title, excerpt, published_at, reading_minutes, author, cover_image_src, cover_image_alt, paragraphs, status, seo_tags) VALUES (
  'kurumsal-cati-depolama-notlari',
  'Kurumsal çatı depolama — taslak notlar',
  'Kurumsal çatı uygulamalarında ESS ve tepe yük yönetimi notları (taslak).',
  null,
  5,
  'IonBATech',
  'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=120&q=80',
  'Kurumsal enerji depolama',
  '["Taslak içerik; yayınlandığında güncellenecek."]'::jsonb,
  'draft',
  'kurumsal, ESS, tepe yük'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.blog_posts (slug, title, excerpt, published_at, reading_minutes, author, cover_image_src, cover_image_alt, paragraphs, status, seo_tags) VALUES (
  'sulama-motoru-baslangic-akimi',
  'Sulama motoru başlangıç akımı hesabı',
  'Tarım sulamasında motor başlangıç akımı ve solar boyutlandırma (taslak).',
  null,
  5,
  'IonBATech',
  'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=120&q=80',
  'Sulama ve enerji',
  '["Taslak içerik; yayınlandığında güncellenecek."]'::jsonb,
  'draft',
  'tarım, sulama, solar'
) ON CONFLICT (slug) DO NOTHING;
