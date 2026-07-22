/**
 * /tr altındaki Türkçe ayna sayfalarını üretir.
 * Her sayfa, İngilizce sayfanın client bileşenini yeniden kullanır;
 * yalnızca Türkçe metadata (title/description) ve hreflang alternates ekler.
 * Tek seferlik üreticidir: yeni araç eklendiğinde TR_META'ya satır ekleyip yeniden çalıştırın.
 */
const fs = require("fs");
const path = require("path");

const TR_META = {
  "/": {
    title: "ToolsMani - Ücretsiz Online Araçlar",
    description:
      "Ücretsiz online araçlar: PDF birleştirme, bölme, sıkıştırma, resim sıkıştırma, kelime sayacı, JSON biçimlendirici, QR kod ve daha fazlası. Hızlı, gizli ve kolay.",
  },
  "/tools/pdf": {
    title: "Ücretsiz PDF Araçları - Birleştir, Böl, Sıkıştır | ToolsMani",
    description:
      "7+ ücretsiz PDF aracı: birleştirme, bölme, sıkıştırma, döndürme, filigran, sayfa numarası ve daha fazlası. Dosya limiti yok, sunucuya yükleme yok.",
  },
  "/tools/pdf-merge": {
    title: "PDF Birleştirme - Ücretsiz Online PDF Birleştirici | ToolsMani",
    description:
      "PDF dosyalarını ücretsiz ve hızlı birleştirin. Dosyalar tarayıcınızda işlenir, sunucuya yüklenmez. Kayıt yok, limit yok, filigran yok.",
  },
  "/tools/pdf-split": {
    title: "PDF Bölme - PDF'i Sayfalara Ayırma | ToolsMani",
    description:
      "PDF dosyasını ücretsiz bölün: sayfa aralığı seçin, sayfaları tek tek ayırın veya her N sayfada bölün. Tamamen tarayıcıda çalışır, dosyanız yüklenmez.",
  },
  "/tools/pdf-compress": {
    title: "PDF Sıkıştırma - PDF Boyutu Küçültme | ToolsMani",
    description:
      "PDF dosya boyutunu ücretsiz küçültün. Yapıyı optimize eder, kullanılmayan veriyi temizler. Dosya limiti yok, tamamen tarayıcıda çalışır.",
  },
  "/tools/pdf-rotate": {
    title: "PDF Döndürme - Sayfaları Çevirme | ToolsMani",
    description:
      "PDF sayfalarını tek tek veya toplu döndürün. Taranmış belgeleri kolayca düzeltin. Ücretsiz, tarayıcı tabanlı, sunucuya yükleme yok.",
  },
  "/tools/pdf-pages": {
    title: "PDF Sayfa Silme ve Ayıklama | ToolsMani",
    description:
      "PDF'ten istediğiniz sayfaları silin veya ayıklayın. Sayfaları görsel olarak seçin, indirin. Ücretsiz ve gizlilik dostu — dosya sunucuya gitmez.",
  },
  "/tools/pdf-watermark": {
    title: "PDF Filigran Ekleme | ToolsMani",
    description:
      "PDF'e metin filigranı ekleyin: konum, boyut ve saydamlık ayarlanabilir. Ücretsiz, tarayıcıda çalışır, dosyanız cihazınızda kalır.",
  },
  "/tools/pdf-pagenumber": {
    title: "PDF Sayfa Numarası Ekleme | ToolsMani",
    description:
      "PDF'e otomatik sayfa numarası ekleyin. Konum ve biçim seçenekleri. Ücretsiz, kayıt gerektirmez, tamamen tarayıcıda çalışır.",
  },
  "/tools/pdf-to-image": {
    title: "PDF'i Resme Çevirme (PDF - JPG/PNG) | ToolsMani",
    description:
      "PDF sayfalarını JPG veya PNG resimlere dönüştürün. Yüksek çözünürlük desteği. Ücretsiz ve tarayıcı tabanlı — dosya yüklenmez.",
  },
  "/tools/image-to-pdf": {
    title: "Resimden PDF Yapma (JPG - PDF) | ToolsMani",
    description:
      "JPG, PNG ve diğer resimleri tek PDF'te birleştirin. Sıralama ve sayfa boyutu seçenekleri. Ücretsiz, tarayıcıda çalışır.",
  },
  "/tools/image-convert": {
    title: "Resim Format Dönüştürücü (PNG, JPG, WebP) | ToolsMani",
    description:
      "Resimleri PNG, JPG ve WebP formatları arasında dönüştürün. Kalite ayarı ve toplu dönüştürme. Ücretsiz ve tarayıcı tabanlı.",
  },
  "/tools/heic-convert": {
    title: "HEIC'i JPG'ye Çevirme | ToolsMani",
    description:
      "iPhone HEIC fotoğraflarını JPG veya PNG'ye dönüştürün. Toplu dönüştürme desteği. Ücretsiz, tarayıcıda çalışır, fotoğraflar yüklenmez.",
  },
  "/tools/image-compress": {
    title: "Resim Sıkıştırma - Fotoğraf Boyutu Küçültme | ToolsMani",
    description:
      "JPG, PNG ve WebP resimleri kalite kaybını en aza indirerek sıkıştırın. Ücretsiz, limitsiz ve gizlilik dostu — tamamen tarayıcıda çalışır.",
  },
  "/tools/text-counter": {
    title: "Kelime ve Karakter Sayacı | ToolsMani",
    description:
      "Metindeki kelime, karakter, cümle ve paragrafları anında sayın. Ücretsiz online kelime sayacı, tamamen tarayıcıda çalışır.",
  },
  "/tools/json-formatter": {
    title: "JSON Biçimlendirici ve Doğrulayıcı | ToolsMani",
    description:
      "JSON'u biçimlendirin, küçültün ve doğrulayın. Hatalı satırı gösterir. Ücretsiz geliştirici aracı, veriniz tarayıcıdan çıkmaz.",
  },
  "/tools/qr-generator": {
    title: "QR Kod Oluşturucu | ToolsMani",
    description:
      "Metin veya bağlantı için ücretsiz QR kod oluşturun. Boyut seçenekleri, PNG indirme. Kayıt gerektirmez, anında hazır.",
  },
  "/tools/password-generator": {
    title: "Güçlü Şifre Oluşturucu | ToolsMani",
    description:
      "Kriptografik olarak güvenli, güçlü şifreler üretin. Uzunluk ve karakter seçenekleri. Şifreniz asla cihazınızdan çıkmaz.",
  },
  "/tools/base64": {
    title: "Base64 Çevirici - Kodlama ve Çözme | ToolsMani",
    description:
      "Metni Base64'e kodlayın veya Base64'ü metne çevirin. UTF-8 desteği. Ücretsiz geliştirici aracı, tamamen tarayıcıda çalışır.",
  },
  "/tools/color-picker": {
    title: "Renk Seçici - HEX, RGB, HSL Çevirici | ToolsMani",
    description:
      "Renk seçin; HEX, RGB ve HSL kodlarını anında alın. Formatlar arası dönüştürme. Tasarımcılar için ücretsiz araç.",
  },
  "/tools/lorem-ipsum": {
    title: "Lorem Ipsum Üretici | ToolsMani",
    description:
      "Tasarım ve şablonlar için lorem ipsum yer tutucu metni üretin. Paragraf, cümle ve kelime sayısı seçenekleri. Ücretsiz.",
  },
  "/tools/markdown-preview": {
    title: "Markdown Önizleme | ToolsMani",
    description:
      "Markdown yazın, anında HTML önizlemesini görün. GFM (tablo, liste) desteği. Ücretsiz online markdown editörü.",
  },
  "/tools/unit-converter": {
    title: "Birim Çevirici | ToolsMani",
    description:
      "Uzunluk, ağırlık, sıcaklık, alan ve hacim birimlerini anında çevirin. Ücretsiz online birim dönüştürücü, tarayıcıda çalışır.",
  },
  "/tools/pdf-sign": {
    title: "PDF İmzalama - Online İmza Ekleme (Ücretsiz) | ToolsMani",
    description:
      "İmzanızı çizin ve PDF'in istediğiniz sayfasına yerleştirin. %100 gizli — belge ve imzanız tarayıcınızdan çıkmaz. Ücretsiz, kayıtsız.",
  },
  "/tools/exif-cleaner": {
    title: "EXIF Silme - Fotoğraf Meta Verisi Temizleme | ToolsMani",
    description:
      "Fotoğraflardan GPS konumu, kamera modeli, tarih gibi gizli meta verileri silin. Ücretsiz ve gizli — fotoğraf tarayıcıda temizlenir, yüklenmez.",
  },
  "/tools/image-resize": {
    title: "Resim Boyutlandırma - Fotoğraf Boyutu Değiştirme | ToolsMani",
    description:
      "JPG, PNG ve WebP resimleri piksel genişliğine veya yüzdeye göre boyutlandırın. Toplu işlem, en-boy oranı korunur. Ücretsiz, tarayıcıda çalışır.",
  },
  "/tools/uuid-generator": {
    title: "UUID Üretici ve Metin Hash (SHA-256) | ToolsMani",
    description:
      "Toplu rastgele UUID v4 kimlikleri üretin; SHA-256, SHA-512 veya SHA-1 hash hesaplayın. Ücretsiz geliştirici aracı, tamamen tarayıcıda.",
  },
  "/tools/age-calculator": {
    title: "Yaş Hesaplama - Doğum Tarihine Göre Yaş Bulma | ToolsMani",
    description:
      "Doğum tarihinize göre yaşınızı yıl, ay ve gün olarak hesaplayın. Toplam gün, hafta, saat ve sonraki doğum gününüze kalan süre. Ücretsiz.",
  },
  "/tools/case-converter": {
    title: "Büyük Küçük Harf Dönüştürücü | ToolsMani",
    description:
      "Metni büyük harfe, küçük harfe, kelime başı büyüğe, camelCase ve snake_case biçimine çevirin. Türkçe karakter (İ/ı) desteği. Ücretsiz.",
  },
  "/tools/text-diff": {
    title: "Metin Karşılaştırma - Fark Bulucu | ToolsMani",
    description:
      "İki metin arasındaki farkları satır satır görün. Ücretsiz online metin karşılaştırma aracı; hiçbir şey sunucuya yüklenmez.",
  },
  "/tools/csv-json": {
    title: "CSV JSON Dönüştürücü | ToolsMani",
    description:
      "CSV'yi JSON'a, JSON'u CSV'ye çevirin. Tırnaklı alanlar ve noktalı virgül/sekme ayırıcı desteği. Ücretsiz geliştirici aracı.",
  },
  "/tools/timestamp-converter": {
    title: "Unix Timestamp Çevirici - Epoch Tarih Dönüştürme | ToolsMani",
    description:
      "Unix zaman damgasını tarihe, tarihi timestamp'e çevirin. Yerel saat ve UTC gösterimi, canlı epoch saati. Ücretsiz.",
  },
  "/tools/favicon-generator": {
    title: "Favicon Üretici - ICO ve PNG Oluşturma | ToolsMani",
    description:
      "Bir görselden eksiksiz favicon seti üretin: favicon.ico, tüm PNG boyutları ve hazır HTML etiketleri. Tamamen tarayıcıda çalışır.",
  },
  "/tools/ocr": {
    title: "Resimden Metin Çıkarma (OCR) - Ücretsiz | ToolsMani",
    description:
      "Fotoğraf, ekran görüntüsü ve taramalardaki yazıyı metne çevirin. Türkçe destekli OCR tamamen tarayıcınızda çalışır — görsel hiçbir yere yüklenmez.",
  },
  "/tools/video-to-mp3": {
    title: "Video MP3 Dönüştürücü - MP4'ten Ses Çıkarma | ToolsMani",
    description:
      "MP4, MOV ve WebM videolardan sesi MP3 veya WAV olarak çıkarın. Ücretsiz ve tamamen tarayıcıda — videonuz hiçbir sunucuya yüklenmez.",
  },
  "/about": {
    title: "Hakkımızda | ToolsMani",
    description:
      "ToolsMani'nin hikayesi: gizlilik öncelikli, tamamen ücretsiz online araçlar. Dosyalarınız tarayıcınızdan asla çıkmaz.",
  },
  "/contact": {
    title: "İletişim | ToolsMani",
    description:
      "ToolsMani ile iletişime geçin: hata bildirin, yeni araç önerin veya geri bildirim gönderin. Her mesajı okuyoruz.",
  },
  "/privacy": {
    title: "Gizlilik Politikası | ToolsMani",
    description:
      "ToolsMani gizlilik politikası. Dosyalarınız tamamen tarayıcınızda işlenir, asla yüklenmez. Hangi sınırlı veriyi neden topladığımızı öğrenin.",
  },
  "/terms": {
    title: "Kullanım Şartları | ToolsMani",
    description: "ToolsMani ücretsiz online araçlarının sade dille yazılmış kullanım şartları.",
  },
};

const appDir = path.join(__dirname, "..", "src", "app");

function importPathFor(route) {
  return route === "/" ? "@/app/page" : `@/app${route}/page`;
}

let created = 0;
for (const [route, meta] of Object.entries(TR_META)) {
  const enPath = route === "/" ? "/" : `${route}/`;
  const trPath = route === "/" ? "/tr/" : `/tr${route}/`;
  const dir = route === "/" ? path.join(appDir, "tr") : path.join(appDir, "tr", route.slice(1));
  fs.mkdirSync(dir, { recursive: true });

  const src = `import type { Metadata } from "next";

export { default } from "${importPathFor(route)}";

export const metadata: Metadata = {
  title: ${JSON.stringify(meta.title)},
  description:
    ${JSON.stringify(meta.description)},
  alternates: {
    canonical: ${JSON.stringify(trPath)},
    languages: {
      en: ${JSON.stringify(enPath)},
      tr: ${JSON.stringify(trPath)},
      "x-default": ${JSON.stringify(enPath)},
    },
  },
};
`;
  fs.writeFileSync(path.join(dir, "page.tsx"), src);
  created++;
}

console.log(`${created} TR sayfası üretildi.`);
