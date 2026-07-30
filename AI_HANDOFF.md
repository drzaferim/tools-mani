# ToolsMani — Teknik El Kitabı ve Devir Dokümanı

> **Son güncelleme:** 30 Temmuz 2026
> **Sahip:** Zafer (drzaferhabip@gmail.com)
> **Canlı:** https://toolsmani.com
> **Depo:** https://github.com/drzaferim/tools-mani (branch: `main`)
>
> Bu dosya projenin **tek güncel doğruluk kaynağıdır**. `BUSINESS_PLAN.md` ve
> `DEPLOYMENT.md` eski kararları yansıtır; çelişki halinde bu dosya geçerlidir.

---

## 1. Proje kimliği

**ToolsMani**, 39 araçlı ücretsiz online araç setidir. Tek ayırt edici özelliği:
**her işlem kullanıcının tarayıcısında çalışır, hiçbir dosya sunucuya yüklenmez.**
OCR ve video dönüştürme gibi ağır işler dahil — bunların wasm motorları bile kendi
alan adımızdan sunulur, yani sitede sıfır üçüncü-taraf içerik isteği vardır.

### Bağlayıcı ilkeler (sahibinin kararları)

| İlke | Durum |
|---|---|
| Reklam | **YOK, kalıcı olarak.** AdSense planı iptal edildi. |
| Ücret | Site sonsuza dek ücretsiz. Kilitli özellik, ödeme duvarı yok. |
| Gizlilik | Dosyalar asla yüklenmez. Bu bir slogan değil, mimari kısıt. |
| Helal uyumu | Faiz/kumar içerikli araçlar (kredi hesaplayıcı vb.) eklenmez. |
| Karanlık desen | Yok. Yanıltıcı düğme, gizli maliyet, sahte aciliyet kullanılmaz. |

### Gelir stratejisi (henüz uygulanmadı)

Web sitesi ücretsiz kalır ve pazarlama hunisi işlevi görür. Talep kanıtı oluşmadan
hiçbiri başlatılmaz; öncelik sırası:

1. **Tauri masaüstü uygulaması** — tek seferlik ücret. Gizlilik vaadinin doğal uzantısı.
2. **B2B / white-label lisans** — kurumlar çalışanlarının belge yüklemesini yasaklar; tam bu boşluk.
3. **Bağış düğmesi** — ~1.000 ziyaretçi/gün eşiğinden sonra.
4. **Geliştirici API'si** — backend gerektirir, sadeliği bozar; en son seçenek.

Reddedilenler: sponsor köşesi (teknik olarak reklamdır), affiliate linkler (güveni kemirir).

---

## 2. Teknik yığın

| Katman | Teknoloji | Not |
|---|---|---|
| Framework | Next.js 14 (App Router) | `output: "export"` — tamamen statik |
| Dil | TypeScript | **tsconfig hedefi es5**: `u` bayraklı regex derlenmez, karakter aralığı kullan |
| Stil | Tailwind CSS 3.4 | `primary` (mavi) + `accent` (yeşil) paleti |
| Barındırma | Firebase Hosting | Proje `thelectura-1`, site adı `toolsmani` |
| Veri | Firestore | Yalnızca anonim araç sayaçları + geri bildirim |
| Analitik | GA4 | `G-L78B8VTFP9` |
| DNS | Cloudflare | A kaydı + TXT doğrulama |

### Deploy

```bash
npm run build && firebase deploy --only hosting
```

`postbuild` kancası `scripts/generate-sitemap.js`'i çalıştırır ve `out/` taramasından
sitemap'i otomatik üretir (şu an 277 URL). `public/`'te statik sitemap **yok**.

### Kritik yapılandırma notları

- **`.env.production` dosyası zorunlu.** İçinde `NEXT_PUBLIC_GA_ID=G-L78B8VTFP9` var.
  Bu dosya olmadan build alınırsa site GA'sız yayınlanır (sessiz veri kaybı).
- **`firebase.json`'da `'**' -> /404.html` rewrite'ı OLMAMALI.** Bu kural bulunamayan
  yolları 404 içeriğiyle ama **HTTP 200** koduyla sunuyordu (soft 404) — Google bu
  sayfaları geçerli sanıp tarıyordu. 29 Tem 2026'da kaldırıldı. Firebase, `out/404.html`
  varsa doğru 404 durum kodunu kendisi döndürür.

---

## 3. Çoklu dil (i18n) mimarisi

**6 dil:** `en` (öneksiz), `tr`, `es`, `de`, `pt`, `fr`.

Dil **URL önekinden** belirlenir — `src/lib/language-context.tsx` içinde `usePathname()`
ile okunur. localStorage yalnızca kullanıcının tercihini hatırlar, dili belirlemez.
Bu, statik export'ta her dilin HTML'inin sunucu tarafında doğru dille üretilmesini sağlar
(SEO için kritik).

### Ayna sayfa üreticileri

| Script | Kapsam | Veri kaynağı |
|---|---|---|
| `scripts/generate-tr-pages.js` | Sitenin **tamamı** (araçlar + kurumsal) | Script içindeki `TR_META` |
| `scripts/generate-intl-pages.js` | Yalnızca ana sayfa + `/tools/*` | `scripts/intl-data.json` |

`intl-data.json`, ES/DE/PT/FR çevirilerinin tek kaynağıdır. `src/lib/translations.ts`
içindeki `extra` bloğu buradan **elle** senkron edilir. Eksik çeviriler otomatik olarak
İngilizceye düşer (`pick()` yardımcısı, `language-context.tsx`).

### ⚠️ Yeni araç eklerken kayıt listesi (hepsini yap, yoksa araç yarım kalır)

1. `src/lib/tools.ts` — araç tanımı (id, kategori, href, ikon)
2. `src/lib/icon-map.ts` — lucide ikonunu import + map'e ekle
3. `src/lib/translations.ts` — `tool.X` ve `tool.X.desc`
4. `src/app/page.tsx` — `toolNameKeys` ve `toolDescKeys`
5. `src/app/admin/page.tsx` — `TOOL_LABELS`
6. `scripts/generate-tr-pages.js` — `TR_META` girdisi
7. `scripts/intl-data.json` — `tools` bölümüne 4 dilde ad + açıklama
8. Sonra: `node scripts/generate-tr-pages.js && node scripts/generate-intl-pages.js`

---

## 4. SEO içerik altyapısı

`src/components/ToolContent.tsx` — araç sayfalarının altına eklenen yeniden kullanılabilir
bölüm: tanıtım paragrafları, "nasıl kullanılır" adımları, öne çıkanlar kartları, SSS ve
ilgili araç linkleri. Ayrıca **FAQPage JSON-LD** üretir.

İçerikler `src/content/tools/*.ts` dosyalarında 6 dilli `ToolContentMap` olarak tutulur.
Statik export sayesinde her dilin HTML'ine o dilin SSS'i gömülü çıkar.

**Uygulanmış 7 sayfa** (toplam gösterimlerin ~%75'i):
json-formatter, text-diff, pdf-compress, image-compress, image-resize, text-counter, color-picker.

### ⚠️ Yeni bir araca ToolContent eklerken

O aracın `layout.tsx` dosyasında eski bir `faqJsonLd` sabiti varsa **mutlaka kaldır** —
yoksa aynı sayfada iki FAQPage oluşur ve Google hangisini kullanacağını bilemez.

Hâlâ layout-FAQ'ı olan araçlar: `pdf-merge`, `pdf-split`, `pdf-rotate`, `pdf-pages`,
`pdf-watermark`, `pdf-pagenumber`, `pdf-to-image`, `image-to-pdf`, `heic-convert`.

Ayrıca site geneli FAQPage artık kök layout'ta **değil** (261 sayfaya basılıyordu ve
araç FAQ'larıyla çakışıyordu); `src/app/page.tsx` içinde ve yalnızca `locale === "en"`
iken üretilir.

---

## 5. Yerelleştirme denetimi (30 Tem 2026 güncellendi)

Her sayfada `<title>`, meta description ve hreflang **6 dilde eksiksiz**. Arayüz
metinleri ise üç katmanda:

| Katman | Sayı | Araçlar |
|---|---|---|
| 6 dilde tam (`labels` + `pick()`) | 25 | json-formatter, text-diff, base64, heic-convert, image-convert, lorem-ipsum, markdown-preview, password-generator, qr-generator, unit-converter, age-calculator, case-converter, csv-json, url-encode, uuid-generator, timestamp-converter, jwt-decoder, regex-tester, percentage-calculator, vat-calculator, number-to-words, image-resize, exif-cleaner, favicon-generator, ocr, video-to-mp3, pdf-sign |
| 6 dilde arayüz (`t()` ile) | ~11 | Tüm PDF araçları + pdf-compress, text-counter, color-picker, image-compress |
| Yalnızca EN+TR | **0** | — |
| Hiç yerelleşmemiş | **0** | — |

**30 Tem 2026 — yerelleştirme borcu kapatıldı.** İki turda yapıldı:

1. Hiç yerelleşmemiş 8 araç (base64, heic-convert, image-convert, lorem-ipsum,
   markdown-preview, password-generator, qr-generator, unit-converter).
2. Yalnızca EN+TR olan 17 araç (age-calculator, case-converter, csv-json,
   url-encode, uuid-generator, timestamp-converter, jwt-decoder, regex-tester,
   percentage-calculator, vat-calculator, number-to-words, image-resize,
   exif-cleaner, favicon-generator, ocr, video-to-mp3, pdf-sign).

Desen her yerde aynı: dosya içinde 6 dilli `labels` nesnesi + `pick(labels, locale)`.
Ayna sayfalar aynı bileşeni re-export ettiği için tek dosyayı çevirmek 6 rotayı
birden düzeltir. **Dikkat:** `pick()` eksik dili sessizce İngilizceye düşürür — bir
aracın `pick` kullanıyor olması 6 dilde olduğu anlamına gelmez, `labels` içinde
altı anahtarın da bulunması gerekir.

### Bu iş sırasında düzeltilen gerçek hatalar

- **`localeTag()` eklendi** (`src/lib/language-context.tsx`). Araçlar
  `toLocaleString(locale === "tr" ? "tr-TR" : "en-US")` yazıyordu; yani Almanca
  sayfada sayı `1,234.56` (ABD biçimi) çıkıyordu. Artık altı dil de kendi
  biçimini alıyor (pt → `pt-BR`, trafiğin çoğu Brezilya'dan).
- **Yüzde işaretinin yeri** dile bağlandı: TR `%20`, EN/PT `20%`, ES/DE/FR `20 %`.
  Önceden yüzde hesaplayıcı tüm dillerde Türkçe düzende (`%20`) basıyordu.
- **KDV oranları ülkeye göre** ayarlandı: ES 4/10/21, DE 7/19, PT 6/13/23,
  FR 5,5/10/20. Önceden her dilde Türkiye oranları (1/10/20) görünüyordu.
  `en` uluslararası sayfa olduğu için Türkiye oranlarında bırakıldı — metin de
  bunu böyle söylüyor. Her dilde özel oran girme seçeneği zaten var.
- **Göreli zaman** `Intl.RelativeTimeFormat`'a taşındı (timestamp-converter);
  çoğul kuralları ve "önce/sonra" yönü artık elle çevrilmiyor.
- **"Araçlara Dön" linkleri** `localePath("/")` kullanıyor; önceden diğer
  dillerden İngilizce ana sayfaya atıyordu.
- İki SSS'deki yanlış bilgi düzeltildi: password-generator "128 karaktere kadar"
  diyordu ama kaydırıcı maksimumu 64; qr-generator "PNG veya SVG indirebilirsiniz"
  diyordu ama yalnızca PNG indirme var. Yanlış metin 6 dile kopyalanmadan düzeltildi.

### ⚠️ Üçüncü tur: iki araç 4 dilde tamamen boş sayfa veriyordu

`image-to-pdf` ve `pdf-to-image`, global `t()` yerine **kendi yerel `translations`
nesnelerini** kullanıyordu ve locale'i `as "en" | "tr"` diye cast ediyordu.
`translations[key]["es"]` çalışma anında `undefined` döndüğü için React hiçbir şey
basmıyordu: `/es/`, `/de/`, `/pt/`, `/fr/` altındaki bu 8 sayfada `<h1>` **boş**
çıkıyordu — İngilizceye düşme değil, metin yokluğu. Boş `<h1>` indekslenen
sayfalarda SEO açısından da ağır bir kayıp.

Düzeltme: iki dosyanın `translations` nesnesi 6 dile çıkarıldı ve `t()`
`?? translations[key].en` ile geri düşüş kazandı; `as "en" | "tr"` cast'i kaldırıldı.
**Bu cast deseni bir daha girmemeli** — `pick()` gibi geri düşüşü olmayan her erişim
aynı sessiz boşluğu üretir. Tarama komutu:
`grep -rn 'as "en" | "tr"' src/app --include=*.tsx`

Aynı turda 7 PDF aracının (`pdf-merge`, `pdf-split`, `pdf-rotate`, `pdf-pages`,
`pdf-watermark`, `pdf-pagenumber`, `pdf-to-image`) satır içi EN+TR SSS blokları —
toplam 29 soru — 6 dile çevrilip `pick(faq, locale)` yapısına taşındı. Ana sayfadaki
arama kutusu metinleri de (yer tutucu, "sonuç yok", "aramayı temizle") 6 dile geçti.

### Arayüzü çevrilmiş ama çıktısı hâlâ sınırlı iki araç

Bunlar **çeviri işi değil, özellik işi** — arayüz 6 dilde ama motor değil:

- **ocr**: sitede yalnızca `eng` + `tur` dil paketi var (`public/ocr/lang/`).
  İspanyolca/Almanca/Portekizce/Fransızca metinde doğruluk düşük kalır. Metinler
  bunu açıkça söylüyor. Paket başına ~8-11 MB ek varlık gerekir.
- **number-to-words**: sayıyı yalnızca Türkçe ve İngilizce okunuşa çeviriyor.
  Diğer dillerin okunuş algoritması ayrıca yazılmalı.

### Kurumsal sayfalar da 6 dilde (30 Tem 2026)

`/about`, `/contact`, `/privacy`, `/terms` artık altı dilde: 16 yeni ayna rota
(`/es|de|pt|fr/{about,contact,privacy,terms}`) eklendi, site 261 → **277 URL**.
Her sayfanın hreflang'ı 6 dil + `x-default` listeliyor; footer linkleri zaten
`localePath()` kullandığı için otomatik doğru yere gidiyor.

Yönlendirme `language-context.tsx` içindeki `CORPORATE_PATHS` ile açıldı.
es/de/pt/fr **bilerek `FULL_MIRROR`'a alınmadı** — blog ve admin hâlâ aynalanmıyor,
onları da aynalanmış saymak kırık link üretirdi.

> **Gizlilik ve şartlar hukuki metindir.** Yapılan iş İngilizce metnin sadık
> çevirisidir; hukuki inceleme veya ülkeye özel uyarlama (GDPR/LGPD'ye göre ek
> madde vb.) **yapılmadı**. Bu gerekiyorsa ayrıca ele alınmalı.

Blog: 3 İngilizce + 3 Türkçe yazı (hâlâ yalnızca en+tr).

---

## 6. Ağır wasm araçları (hepsi self-host)

| Araç | Kütüphane | Varlık yolu | Boyut |
|---|---|---|---|
| OCR (resimden metin) | tesseract.js v7 | `public/ocr/` (worker + core + eng/tur dil paketleri) | ~47 MB |
| Video → MP3/WAV | @ffmpeg/ffmpeg 0.12 | `public/ffmpeg/` (core.js + core.wasm) | ~31 MB |

İkisi de `workerPath`/`corePath`/`langPath` (OCR) ve `toBlobURL` (ffmpeg) ile **kendi
alan adımızdan** yüklenir. CDN kullanılmaz — "sıfır üçüncü-taraf istek" iddiasının
teknik dayanağı bu. QR üretimi de aynı nedenle yerelleştirildi (eskiden
`api.qrserver.com` kullanıyordu).

Bu dosyalar sadece ilgili aracı açan kullanıcıya, bir kez iner ve önbelleğe alınır.

---

## 7. Mevcut SEO durumu (29 Tem 2026 ölçümü)

| Metrik | Değer |
|---|---|
| Dizine eklenen sayfa | **147** / 261 URL (6 gün önce yalnızca 4'tü) |
| Gösterim (3 ay) | 1.080 |
| Tıklama | **0** |
| Ortalama konum | 65,1 (≈7. sayfa) |
| Farklı sorgu | 548 |
| Ülke | 77 |
| GA4 (28 gün) | 17 etkin kullanıcı, 53 görüntüleme, %100 Direct trafik |

**Gösterim liderleri:** `/tools/text-diff` 234 · `/es/tools/json-formatter` 187 ·
`/pt/tools/pdf-compress` 185 · `/fr/tools/color-picker` 58 · `/tr/tools/image-compress` 47 ·
`/fr/tools/image-resize` 37 · `/de/tools/text-counter` 24

**Ülke dağılımı:** ABD 222 · Brezilya 187 · Fransa 111 · Türkiye 88 · Almanya 43 ·
İspanya 42 · Rusya 41

### Teşhis

Çok dilli strateji **işliyor** — Brezilya ve Fransa gösterimlerde üst sıralarda, yerel
sorgular (`comprimir pdf`, `wortzähler online`) geliyor. Ama alan otoritesi düşük olduğu
için sıralama 7. sayfada, dolayısıyla tıklama yok. Çözüm yeni araç eklemek değil:
**içerik derinliği + backlink**.

---

## 8. Lansman durumu ve engeller

| Kanal | Durum |
|---|---|
| **Reddit** | r/privacy **yasak** (R3 self-promo → anında ban; R7 kapalı kaynak yasak). r/SideProject'e gönderildi 23 Tem → 1 puan, 0 yorum, sıfır referans trafiği. |
| **Hacker News** | Show HN **engelli** — HN yeni/düşük karmalı hesaplarda kısıtlıyor (`/showlim`). Hesap `drzaferim`, 1 karma. Plan: organik yorumlarla karma biriktir. "Show HN'siz normal link" **önerilmez** (spam/flag riski). |
| **Product Hunt** | Ürün sayfası mevcut (ilk lansman ~7 Nis 2026). Relansman isteği 23 Tem'de reddedildi (6 ay kuralı). **Hak doğuşu: 7 Ekim 2026** (zamanlanmış görev kurulu). Sayfa metni güncel; galeri görselleri eski — `launch-assets/` içindekiler elle yüklenecek. |
| **AlternativeTo** | 7 gün hesap yaşı şartı → 30 Tem sonrası (zamanlanmış görev kurulu). |
| **IndexNow** | Aktif. Güncellenen URL'ler Bing/Yandex'e bildiriliyor. Anahtar: `public/6a4845b897db421fa70c94b2cec92a67.txt` |

Lansman metinleri ve yorum yanıt şablonları: **`LANSMAN.md`**.
Product Hunt galeri görselleri: **`launch-assets/`** (1270×760, 5 adet).

---

## 9. Sıradaki iş — öncelik sırası

1. **2 hafta sonra ölçüm al.** Derinleştirilen 7 sayfanın Search Console'daki ortalama
   konumu düştü mü? Düştüyse aynı yaklaşımı kalan araçlara uygula.
2. **Yeni 16 kurumsal sayfanın indekslenmesini izle.** 30 Tem'de eklendiler;
   IndexNow Bing/Yandex'e bildirdi, Google için Search Console'dan takip et.
3. **Backlink çalışması.** Konum 65'ten çıkmak otorite gerektiriyor: AlternativeTo,
   Privacy Guides forumu, awesome-* listeleri (kod açık kaynak yapılırsa şansı artar).
4. **Ertelenen dil genişlemesi.** İyi adaylar: Japonca (Google hâkim, rekabet zayıf),
   Rusça (IndexNow zaten Yandex'e gidiyor). Çince anakara için **önerilmez** — Firebase
   Hosting GFW nedeniyle erişilemez; zh-TW (Tayvan) değerlendirilebilir. Arapça RTL
   düzeni gerektirdiği için ayrı proje.
5. **Kod açık kaynak?** "Kaynak kodu nerede?" HN/Reddit'te en sık gelen soru. Açmak hem
   gizlilik iddiasını kanıtlar hem dizin listelerine girmeyi kolaylaştırır.

---

## 10. Bilinen eksikler ve teknik borç

- **Blog yalnızca en+tr** (3+3 yazı). Araçlar ve kurumsal sayfalar 6 dile geçtiğine
  göre kalan tek dil açığı bu. es/de/pt/fr'de blog aynası yok — `language-context.tsx`
  içindeki `isMirrored` bunu bilerek dışarıda bırakıyor.
- **Gizlilik/şartlar çevirileri hukuki inceleme görmedi** — İngilizce metnin sadık
  çevirisi yapıldı, ülkeye özel uyarlama yapılmadı (bkz. bölüm 5).
- **OCR yalnızca eng+tur tanıyor**, number-to-words yalnızca TR+EN okunuşu üretiyor
  (bkz. bölüm 5) — arayüzleri 6 dilde ama motorları değil.
- ~~PDF araçlarında EN+TR ternary kalıntısı~~ — 30 Tem 2026'da kapatıldı (bkz. bölüm 5).
  Sitede kalan tek `locale === "tr"` ifadesi `ocr/page.tsx:215`; o çeviri değil,
  varsayılan tanıma dilini seçen mantık (TR sayfasında `tur`, diğerlerinde `eng`).
- **PDF sıkıştırma yalnızca yapısaldır** — görsel örnekleme yapmaz, bu yüzden taranmış
  PDF'lerde kazanç azdır. Sayfa içeriğinde bu dürüstçe açıklanıyor.
- **Metin karşılaştırma satır düzeyinde** çalışır; satır içi (kelime) vurgulama yok.
- **Gerçek destek e-postası yok.** İletişim formu Firestore'a yazıyor; Cloudflare Email
  Routing ile `destek@toolsmani.com` kurulabilir.
- **9 araç layout'unda eski `faqJsonLd` var** (bkz. bölüm 4) — o araçlara ToolContent
  eklenirken kaldırılmalı.
- `libheif-js` build uyarısı verir ("Critical dependency") — zararsız, HEIC aracının
  bağımlılığından kaynaklanıyor.

---

## 11. Dosya haritası

```
tools-mani/
├── AI_HANDOFF.md              # BU DOSYA — güncel doğruluk kaynağı
├── LANSMAN.md                 # Lansman metinleri + yanıt şablonları
├── BUSINESS_PLAN.md           # ESKİ: premium/Stripe modeli, artık geçersiz
├── firebase.json              # ⚠️ '**' rewrite eklemeyin (soft 404)
├── .env.production            # NEXT_PUBLIC_GA_ID — build için zorunlu
├── launch-assets/             # Product Hunt galeri görselleri (1270×760)
├── public/
│   ├── ocr/                   # tesseract self-host varlıkları (~47 MB)
│   ├── ffmpeg/                # ffmpeg.wasm çekirdeği (~31 MB)
│   ├── og-image.png           # 1200×630 sosyal paylaşım görseli
│   └── 6a48...a67.txt         # IndexNow anahtarı
├── scripts/
│   ├── generate-tr-pages.js   # TR ayna sayfaları (tam site)
│   ├── generate-intl-pages.js # ES/DE/PT/FR ayna sayfaları (ana sayfa + araçlar)
│   ├── intl-data.json         # ES/DE/PT/FR çevirilerinin tek kaynağı
│   └── generate-sitemap.js    # postbuild: out/ taramasından sitemap
└── src/
    ├── app/
    │   ├── layout.tsx         # kök layout (site geneli FAQ BURADA DEĞİL)
    │   ├── page.tsx           # ana sayfa + EN-only FAQ schema
    │   ├── tools/<slug>/      # 39 araç (page.tsx + layout.tsx)
    │   ├── tr|es|de|pt|fr/    # üretilmiş ayna sayfalar (elle düzenlemeyin)
    │   ├── about|contact|privacy|terms/
    │   ├── blog/              # markdown tabanlı, 3 EN + 3 TR
    │   └── admin/             # Google girişli istatistik paneli
    ├── components/
    │   ├── ToolContent.tsx    # SEO içerik bölümü + FAQPage JSON-LD
    │   ├── Header.tsx         # 6 dilli dil menüsü
    │   └── Footer.tsx
    ├── content/tools/*.ts     # 6 dilli araç içerikleri (ToolContentMap)
    └── lib/
        ├── language-context.tsx  # URL tabanlı locale + pick() + localePath()
        ├── translations.ts       # EN/TR sözlük + extra (ES/DE/PT/FR)
        ├── tools.ts              # araç kayıt listesi
        └── track.ts              # GA event + Firestore sayaç
```
