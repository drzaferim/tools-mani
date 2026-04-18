export type Locale = "en" | "tr";

const translations = {
  "nav.allTools": { en: "All Tools", tr: "Tüm Araçlar" },
  "nav.pdfTools": { en: "PDF Tools", tr: "PDF Araçları" },
  "nav.blog": { en: "Guides", tr: "Rehberler" },
  "nav.tryPdf": { en: "Try PDF Tools", tr: "PDF Araçlarını Dene" },

  // Hero
  "hero.badge": { en: "100% Free & Private", tr: "100% Ücretsiz & Gizli" },
  "hero.title1": { en: "Powerful Online Tools", tr: "Güçlü Online Araçlar" },
  "hero.title2": { en: "Right in Your Browser", tr: "Tarayıcınızda Çalışır" },
  "hero.subtitle": {
    en: "PDF tools, text utilities, developer helpers and more. No sign-up, no uploads to servers — your files never leave your device.",
    tr: "PDF araçları, metin yardımcıları, geliştirici araçları ve daha fazlası. Kayıt gerektirmez, dosyalar sunucuya yüklenmez — verileriniz cihazınızda kalır.",
  },
  "hero.explorePdf": { en: "PDF Tools", tr: "PDF Araçları" },
  "hero.exploreAll": { en: "Explore All Tools", tr: "Tüm Araçları Keşfet" },

  // Stats
  "stats.tools": { en: "Online Tools", tr: "Online Araç" },
  "stats.pdfTools": { en: "PDF Tools", tr: "PDF Aracı" },
  "stats.dataUploaded": { en: "Data Uploaded", tr: "Veri Yükleme" },
  "stats.allTools": { en: "All Tools", tr: "Tüm Araçlar" },

  // Tools section
  "tools.title": { en: "All Tools", tr: "Tüm Araçlar" },
  "tools.subtitle": {
    en: "A growing collection of free tools designed to make your daily tasks easier.",
    tr: "Günlük işlerinizi kolaylaştırmak için tasarlanmış ücretsiz araç koleksiyonu.",
  },
  "tools.noLimit": { en: "No limit", tr: "Limitsiz" },

  // Categories
  "cat.all": { en: "All Tools", tr: "Tüm Araçlar" },
  "cat.pdf": { en: "PDF Tools", tr: "PDF Araçları" },
  "cat.text": { en: "Text", tr: "Metin" },
  "cat.developer": { en: "Developer", tr: "Geliştirici" },
  "cat.generator": { en: "Generators", tr: "Üreticiler" },
  "cat.file": { en: "File", tr: "Dosya" },

  // Privacy CTA
  "privacy.title1": { en: "Your files stay on your device.", tr: "Dosyalarınız cihazınızda kalır." },
  "privacy.title2": { en: "Always.", tr: "Her zaman." },
  "privacy.subtitle": {
    en: "Unlike other tools, we never upload your files to any server. All processing happens locally in your browser using modern Web APIs. No tracking, no cookies, no data collection.",
    tr: "Diğer araçların aksine, dosyalarınız asla bir sunucuya yüklenmez. Tüm işlemler modern Web API'leri kullanılarak tarayıcınızda gerçekleşir. İzleme, çerez veya veri toplama yoktur.",
  },
  "privacy.noUpload": { en: "No file uploads", tr: "Dosya yükleme yok" },
  "privacy.noData": { en: "No data stored", tr: "Veri depolanmaz" },
  "privacy.noAccount": { en: "No account needed", tr: "Hesap gerekmez" },
  "privacy.offline": { en: "Works offline", tr: "Çevrimdışı çalışır" },

  // Footer
  "footer.description": {
    en: "Free online tools that respect your privacy. All processing happens in your browser — your files never leave your device.",
    tr: "Gizliliğinize saygı duyan ücretsiz online araçlar. Tüm işlemler tarayıcınızda gerçekleşir — dosyalarınız cihazınızdan ayrılmaz.",
  },
  "footer.pdfTools": { en: "PDF Tools", tr: "PDF Araçları" },
  "footer.otherTools": { en: "Other Tools", tr: "Diğer Araçlar" },
  "footer.rights": { en: "All rights reserved.", tr: "Tüm hakları saklıdır." },
  "footer.tagline": {
    en: "Free tools, built with care. Your privacy is our priority.",
    tr: "Özenle yapılmış ücretsiz araçlar. Gizliliğiniz önceliğimizdir.",
  },

  // PDF Hub
  "pdfHub.title": { en: "Free Online PDF Tools", tr: "Ücretsiz Online PDF Araçları" },
  "pdfHub.subtitle": {
    en: "The most practical PDF toolkit on the internet. Merge, split, compress, rotate, add watermarks, page numbers, and more — all free, with no file size limits.",
    tr: "İnternetteki en pratik PDF araç seti. Birleştirin, bölün, sıkıştırın, döndürün, filigran ve sayfa numarası ekleyin — hepsi ücretsiz, dosya boyutu limiti yok.",
  },
  "pdfHub.noLimit": { en: "No file size limit", tr: "Dosya boyutu limiti yok" },
  "pdfHub.browserBased": { en: "100% browser-based", tr: "100% tarayıcı tabanlı" },
  "pdfHub.private": { en: "Files never leave your device", tr: "Dosyalar cihazınızdan çıkmaz" },
  "pdfHub.backToAll": { en: "Back to All Tools", tr: "Tüm Araçlara Dön" },
  "pdfHub.whyTitle": { en: "Why choose ToolsMani PDF Tools?", tr: "Neden ToolsMani PDF Araçları?" },
  "pdfHub.why1Title": { en: "No upload limits", tr: "Yükleme limiti yok" },
  "pdfHub.why1Desc": {
    en: "Unlike other tools that limit you to 10-25 MB, we process files of any size. Your browser memory is the only limit.",
    tr: "10-25 MB sınırı koyan diğer araçların aksine, her boyuttaki dosyayı işleriz. Tek sınır tarayıcınızın belleğidir.",
  },
  "pdfHub.why2Title": { en: "Complete privacy", tr: "Tam gizlilik" },
  "pdfHub.why2Desc": {
    en: "Your files never leave your device. All processing happens locally in your browser. No servers, no cloud, no tracking.",
    tr: "Dosyalarınız cihazınızdan asla çıkmaz. Tüm işlemler tarayıcınızda gerçekleşir. Sunucu yok, bulut yok, izleme yok.",
  },
  "pdfHub.why3Title": { en: "Instant processing", tr: "Anında işleme" },
  "pdfHub.why3Desc": {
    en: "No waiting for server uploads and downloads. Everything runs at the speed of your device. Results appear in seconds.",
    tr: "Sunucu yükleme ve indirmelerini beklemenize gerek yok. Her şey cihazınızın hızında çalışır. Sonuçlar saniyeler içinde görünür.",
  },

  // PDF Tool names and descriptions
  "pdf.merge.name": { en: "PDF Merger", tr: "PDF Birleştirici" },
  "pdf.merge.desc": {
    en: "Combine multiple PDFs into one file. Drag to reorder pages.",
    tr: "Birden fazla PDF'i tek dosyada birleştirin. Sıralamak için sürükleyin.",
  },
  "pdf.split.name": { en: "PDF Splitter", tr: "PDF Bölücü" },
  "pdf.split.desc": {
    en: "Split a PDF into multiple files by page ranges or extract all pages.",
    tr: "PDF'i sayfa aralıklarına göre birden fazla dosyaya bölün veya tüm sayfaları çıkarın.",
  },
  "pdf.compress.name": { en: "PDF Compress", tr: "PDF Sıkıştır" },
  "pdf.compress.desc": {
    en: "Reduce file size by optimizing structure and removing unused data.",
    tr: "Yapıyı optimize ederek ve kullanılmayan verileri kaldırarak dosya boyutunu küçültün.",
  },
  "pdf.rotate.name": { en: "PDF Rotate", tr: "PDF Döndür" },
  "pdf.rotate.desc": {
    en: "Rotate pages individually or all at once. Fix scanned documents.",
    tr: "Sayfaları tek tek veya toplu döndürün. Taranmış belgeleri düzeltin.",
  },
  "pdf.pages.name": { en: "PDF Page Manager", tr: "PDF Sayfa Yöneticisi" },
  "pdf.pages.desc": {
    en: "Extract or delete specific pages. Select odd, even, or custom pages.",
    tr: "Belirli sayfaları çıkarın veya silin. Tek, çift veya özel sayfaları seçin.",
  },
  "pdf.watermark.name": { en: "PDF Watermark", tr: "PDF Filigran" },
  "pdf.watermark.desc": {
    en: "Add custom text watermarks. Control size, color, opacity, and rotation.",
    tr: "Özel metin filigranları ekleyin. Boyut, renk, opaklık ve dönüşü kontrol edin.",
  },
  "pdf.pagenumber.name": { en: "PDF Page Numbers", tr: "PDF Sayfa Numaraları" },
  "pdf.pagenumber.desc": {
    en: "Add page numbers with custom position, format, and starting number.",
    tr: "Özel konum, format ve başlangıç numarasıyla sayfa numaraları ekleyin.",
  },

  // Tool names (for cards & footer)
  "tool.textCounter": { en: "Text Counter", tr: "Metin Sayacı" },
  "tool.jsonFormatter": { en: "JSON Formatter", tr: "JSON Biçimlendirici" },
  "tool.qrGenerator": { en: "QR Code Generator", tr: "QR Kod Üretici" },
  "tool.passwordGenerator": { en: "Password Generator", tr: "Şifre Üretici" },
  "tool.imageCompress": { en: "Image Compressor", tr: "Resim Sıkıştırıcı" },
  "tool.base64": { en: "Base64 Encoder/Decoder", tr: "Base64 Kodlayıcı" },
  "tool.colorPicker": { en: "Color Picker & Converter", tr: "Renk Seçici & Dönüştürücü" },
  "tool.loremIpsum": { en: "Lorem Ipsum Generator", tr: "Lorem Ipsum Üretici" },
  "tool.markdownPreview": { en: "Markdown Preview", tr: "Markdown Önizleme" },
  "tool.unitConverter": { en: "Unit Converter", tr: "Birim Dönüştürücü" },

  // Tool descriptions
  "tool.textCounter.desc": {
    en: "Count words, characters, sentences, and paragraphs instantly. Great for essays, articles, and social media posts.",
    tr: "Kelimeleri, karakterleri, cümleleri ve paragrafları anında sayın. Makaleler ve sosyal medya gönderileri için idealdir.",
  },
  "tool.jsonFormatter.desc": {
    en: "Format, validate, and beautify your JSON data. Supports minification and tree view.",
    tr: "JSON verilerinizi biçimlendirin, doğrulayın ve güzelleştirin. Küçültme ve ağaç görünümünü destekler.",
  },
  "tool.qrGenerator.desc": {
    en: "Generate QR codes for URLs, text, Wi-Fi credentials, and more. Download as PNG or SVG.",
    tr: "URL'ler, metinler, Wi-Fi bilgileri ve daha fazlası için QR kodlar oluşturun. PNG veya SVG olarak indirin.",
  },
  "tool.passwordGenerator.desc": {
    en: "Create strong, secure passwords with customizable length and character types.",
    tr: "Özelleştirilebilir uzunluk ve karakter türleriyle güçlü, güvenli şifreler oluşturun.",
  },
  "tool.imageCompress.desc": {
    en: "Compress images without losing quality. Supports JPEG, PNG, and WebP formats.",
    tr: "Kalite kaybı olmadan resimleri sıkıştırın. JPEG, PNG ve WebP formatlarını destekler.",
  },
  "tool.base64.desc": {
    en: "Encode text to Base64 or decode Base64 back to text. Supports UTF-8 encoding.",
    tr: "Metni Base64'e kodlayın veya Base64'ü metne çözün. UTF-8 kodlamayı destekler.",
  },
  "tool.colorPicker.desc": {
    en: "Pick colors and convert between HEX, RGB, and HSL formats. Copy color values instantly.",
    tr: "Renk seçin ve HEX, RGB, HSL formatları arasında dönüştürün. Renk değerlerini anında kopyalayın.",
  },
  "tool.loremIpsum.desc": {
    en: "Generate placeholder text in paragraphs, sentences, or words. Perfect for design mockups.",
    tr: "Paragraf, cümle veya kelime olarak yer tutucu metin oluşturun. Tasarım taslakları için idealdir.",
  },
  "tool.markdownPreview.desc": {
    en: "Write Markdown and see a live preview. Supports headings, lists, code blocks, and more.",
    tr: "Markdown yazın ve canlı önizleme görün. Başlıklar, listeler, kod blokları ve daha fazlasını destekler.",
  },
  "tool.unitConverter.desc": {
    en: "Convert between units of length, weight, temperature, volume, and more. Fast and accurate.",
    tr: "Uzunluk, ağırlık, sıcaklık, hacim ve daha fazlasını dönüştürün. Hızlı ve doğru.",
  },

  // Common PDF tool UI
  "pdf.clickOrDrag": { en: "Click or drag a PDF file here", tr: "PDF dosyasını tıklayın veya sürükleyin" },
  "pdf.clickOrDragMultiple": { en: "Click or drag PDF files here", tr: "PDF dosyalarını tıklayın veya sürükleyin" },
  "pdf.noLimitWorks": { en: "No file size limit — works with any PDF", tr: "Dosya boyutu limiti yok — tüm PDF'lerle çalışır" },
  "pdf.noLimitMultiple": { en: "Select multiple PDF files to merge — no file size limit", tr: "Birleştirmek için birden fazla PDF seçin — dosya boyutu limiti yok" },
  "pdf.allBrowser": { en: "100% free — all processing happens in your browser.", tr: "100% ücretsiz — tüm işlemler tarayıcınızda gerçekleşir." },
  "pdf.remove": { en: "Remove", tr: "Kaldır" },
  "pdf.pages": { en: "pages", tr: "sayfa" },
  "pdf.selected": { en: "selected", tr: "seçili" },
  "pdf.processing": { en: "Processing...", tr: "İşleniyor..." },
  "pdf.download": { en: "Download", tr: "İndir" },
  "pdf.noFileLimit": { en: "No file size limit", tr: "Dosya boyutu limiti yok" },
  "pdf.backToPdf": { en: "All PDF Tools", tr: "Tüm PDF Araçları" },
  "pdf.filesTotal": { en: "files", tr: "dosya" },
  "pdf.total": { en: "total", tr: "toplam" },
  "pdf.clearAll": { en: "Clear All", tr: "Tümünü Temizle" },

  // PDF Merge
  "pdfMerge.title": { en: "PDF Merger", tr: "PDF Birleştirici" },
  "pdfMerge.subtitle": {
    en: "Merge multiple PDF files into one. Drag to reorder, then download.",
    tr: "Birden fazla PDF dosyasını tek dosyada birleştirin. Sıralamak için sürükleyin, sonra indirin.",
  },
  "pdfMerge.merging": { en: "Merging", tr: "Birleştiriliyor" },
  "pdfMerge.merge": { en: "Merge", tr: "Birleştir" },
  "pdfMerge.pdfs": { en: "PDFs", tr: "PDF" },
  "pdfMerge.error": {
    en: "Failed to merge PDFs. Make sure all files are valid PDFs.",
    tr: "PDF birleştirme başarısız. Tüm dosyaların geçerli PDF olduğundan emin olun.",
  },
  "pdfMerge.errorMin": {
    en: "Please add at least 2 PDF files.",
    tr: "Lütfen en az 2 PDF dosyası ekleyin.",
  },

  // PDF Split
  "pdfSplit.title": { en: "PDF Splitter", tr: "PDF Bölücü" },
  "pdfSplit.subtitle": {
    en: "Split a PDF into multiple files. Extract pages, split by range, or split every N pages.",
    tr: "PDF'i birden fazla dosyaya bölün. Sayfaları çıkarın, aralığa göre bölün veya her N sayfada bir bölün.",
  },
  "pdfSplit.splitMode": { en: "Split Mode", tr: "Bölme Modu" },
  "pdfSplit.extractAll": { en: "Extract all pages", tr: "Tüm sayfaları çıkar" },
  "pdfSplit.extractAllDesc": { en: "Each page becomes a separate PDF", tr: "Her sayfa ayrı bir PDF olur" },
  "pdfSplit.customRanges": { en: "Custom ranges", tr: "Özel aralıklar" },
  "pdfSplit.everyN": { en: "Split every N pages", tr: "Her N sayfada bir böl" },
  "pdfSplit.everyNDesc": { en: "Split into chunks of N pages each", tr: "Her biri N sayfalık parçalara böl" },
  "pdfSplit.splitting": { en: "Splitting PDF...", tr: "PDF bölünüyor..." },
  "pdfSplit.split": { en: "Split PDF", tr: "PDF'i Böl" },

  // PDF Compress
  "pdfCompress.title": { en: "PDF Compress", tr: "PDF Sıkıştır" },
  "pdfCompress.subtitle": {
    en: "Reduce PDF file size by optimizing structure and removing unused data.",
    tr: "Yapıyı optimize ederek ve kullanılmayan verileri kaldırarak PDF dosya boyutunu küçültün.",
  },
  "pdfCompress.compressing": { en: "Compressing...", tr: "Sıkıştırılıyor..." },
  "pdfCompress.compress": { en: "Compress PDF", tr: "PDF'i Sıkıştır" },
  "pdfCompress.smaller": { en: "smaller", tr: "daha küçük" },
  "pdfCompress.optimized": { en: "Already optimized", tr: "Zaten optimize edilmiş" },
  "pdfCompress.original": { en: "Original", tr: "Orijinal" },
  "pdfCompress.compressed": { en: "Compressed", tr: "Sıkıştırılmış" },
  "pdfCompress.downloadCompressed": { en: "Download Compressed PDF", tr: "Sıkıştırılmış PDF'i İndir" },
  "pdfCompress.another": { en: "Compress Another", tr: "Başka Dosya Sıkıştır" },

  // PDF Rotate
  "pdfRotate.title": { en: "PDF Rotate", tr: "PDF Döndür" },
  "pdfRotate.subtitle": {
    en: "Rotate PDF pages individually or all at once. Download the result instantly.",
    tr: "PDF sayfalarını tek tek veya toplu olarak döndürün. Sonucu anında indirin.",
  },
  "pdfRotate.rotateAll": { en: "Rotate All", tr: "Tümünü Döndür" },
  "pdfRotate.rotating": { en: "Rotating pages...", tr: "Sayfalar döndürülüyor..." },
  "pdfRotate.download": { en: "Download Rotated PDF", tr: "Döndürülmüş PDF'i İndir" },

  // PDF Pages
  "pdfPages.title": { en: "PDF Page Manager", tr: "PDF Sayfa Yöneticisi" },
  "pdfPages.subtitle": {
    en: "Extract or delete specific pages from a PDF. Select the pages you need and download.",
    tr: "PDF'ten belirli sayfaları çıkarın veya silin. İhtiyacınız olan sayfaları seçin ve indirin.",
  },
  "pdfPages.selectAll": { en: "Select All", tr: "Tümünü Seç" },
  "pdfPages.selectNone": { en: "Select None", tr: "Hiçbirini Seçme" },
  "pdfPages.oddPages": { en: "Odd Pages", tr: "Tek Sayfalar" },
  "pdfPages.evenPages": { en: "Even Pages", tr: "Çift Sayfalar" },
  "pdfPages.extract": { en: "Extract", tr: "Çıkar" },
  "pdfPages.extractPages": { en: "Pages", tr: "Sayfa" },
  "pdfPages.deleteSelected": { en: "Delete Selected Pages", tr: "Seçili Sayfaları Sil" },
  "pdfPages.processingPages": { en: "Processing pages...", tr: "Sayfalar işleniyor..." },

  // PDF Watermark
  "pdfWatermark.title": { en: "PDF Watermark", tr: "PDF Filigran" },
  "pdfWatermark.subtitle": {
    en: "Add text watermarks to your PDF files. Customize text, size, color, and opacity.",
    tr: "PDF dosyalarınıza metin filigranları ekleyin. Metin, boyut, renk ve opaklığı özelleştirin.",
  },
  "pdfWatermark.text": { en: "Watermark Text", tr: "Filigran Metni" },
  "pdfWatermark.fontSize": { en: "Font Size", tr: "Yazı Boyutu" },
  "pdfWatermark.opacity": { en: "Opacity", tr: "Opaklık" },
  "pdfWatermark.color": { en: "Color", tr: "Renk" },
  "pdfWatermark.adding": { en: "Adding watermark...", tr: "Filigran ekleniyor..." },
  "pdfWatermark.add": { en: "Add Watermark & Download", tr: "Filigran Ekle & İndir" },

  // PDF Page Numbers
  "pdfPageNum.title": { en: "Add Page Numbers", tr: "Sayfa Numarası Ekle" },
  "pdfPageNum.subtitle": {
    en: "Add page numbers to your PDF. Choose position, format, and starting number.",
    tr: "PDF'nize sayfa numaraları ekleyin. Konum, format ve başlangıç numarasını seçin.",
  },
  "pdfPageNum.position": { en: "Position", tr: "Konum" },
  "pdfPageNum.bottomCenter": { en: "Bottom Center", tr: "Alt Orta" },
  "pdfPageNum.bottomLeft": { en: "Bottom Left", tr: "Alt Sol" },
  "pdfPageNum.bottomRight": { en: "Bottom Right", tr: "Alt Sağ" },
  "pdfPageNum.topCenter": { en: "Top Center", tr: "Üst Orta" },
  "pdfPageNum.topLeft": { en: "Top Left", tr: "Üst Sol" },
  "pdfPageNum.topRight": { en: "Top Right", tr: "Üst Sağ" },
  "pdfPageNum.format": { en: "Number Format", tr: "Numara Formatı" },
  "pdfPageNum.startNumber": { en: "Start Number", tr: "Başlangıç Numarası" },
  "pdfPageNum.fontSize": { en: "Font Size", tr: "Yazı Boyutu" },
  "pdfPageNum.preview": { en: "Preview:", tr: "Önizleme:" },
  "pdfPageNum.adding": { en: "Adding page numbers...", tr: "Sayfa numaraları ekleniyor..." },
  "pdfPageNum.add": { en: "Add Page Numbers & Download", tr: "Sayfa Numarası Ekle & İndir" },

  // Image Converter
  "tool.imageConvert": { en: "Image Converter", tr: "Resim Dönüştürücü" },
  "tool.imageConvert.desc": {
    en: "Convert images between PNG, JPEG, WebP, and BMP formats. Batch convert multiple files.",
    tr: "Resimleri PNG, JPEG, WebP ve BMP formatları arasında dönüştürün. Birden fazla dosyayı toplu dönüştürün.",
  },

  "tool.pdfToImage": { en: "PDF to Image", tr: "PDF → Görsel" },
  "tool.pdfToImage.desc": {
    en: "Convert PDF pages to high-quality JPG or PNG images. Extract every page as an image. No file size limit.",
    tr: "PDF sayfalarını yüksek kaliteli JPG veya PNG görseline dönüştürün. Her sayfayı ayrı görsel olarak indirin.",
  },

  "tool.imageToPdf": { en: "Image to PDF", tr: "Görsel → PDF" },
  "tool.imageToPdf.desc": {
    en: "Convert JPG, PNG, WebP or BMP images to a PDF document. Combine multiple images into one PDF.",
    tr: "JPG, PNG, WebP veya BMP görsellerinizi PDF belgesine dönüştürün. Birden fazla görseli tek PDF'e birleştirin.",
  },

  "tool.heicConvert": { en: "HEIC to JPG / PNG", tr: "HEIC → JPG / PNG" },
  "tool.heicConvert.desc": {
    en: "Convert iPhone HEIC/HEIF photos to JPG, PNG or WebP. Batch convert multiple files. No upload needed.",
    tr: "iPhone HEIC/HEIF fotoğraflarını JPG, PNG veya WebP'ye dönüştürün. Toplu dönüştürme, yükleme gerekmez.",
  },

  // Errors
  "error.pdfOnly": { en: "Please select PDF files only.", tr: "Lütfen sadece PDF dosyası seçin." },
  "error.selectPdf": { en: "Please select a PDF file.", tr: "Lütfen bir PDF dosyası seçin." },
  "error.cantRead": { en: "Could not read PDF file.", tr: "PDF dosyası okunamadı." },
  "error.cantDeleteAll": { en: "Cannot delete all pages.", tr: "Tüm sayfalar silinemez." },
  "error.failedSplit": { en: "Failed to split PDF.", tr: "PDF bölme başarısız." },
  "error.failedRotate": { en: "Failed to rotate PDF.", tr: "PDF döndürme başarısız." },
  "error.failedExtract": { en: "Failed to extract pages.", tr: "Sayfa çıkarma başarısız." },
  "error.failedProcess": { en: "Failed to process PDF.", tr: "PDF işleme başarısız." },
  "error.failedWatermark": { en: "Failed to add watermark.", tr: "Filigran ekleme başarısız." },
  "error.failedPagenum": { en: "Failed to add page numbers.", tr: "Sayfa numarası ekleme başarısız." },
  "error.failedCompress": {
    en: "Failed to compress PDF. The file may be corrupted or encrypted.",
    tr: "PDF sıkıştırma başarısız. Dosya bozuk veya şifreli olabilir.",
  },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, locale: Locale): string {
  return translations[key]?.[locale] ?? translations[key]?.["en"] ?? key;
}

export default translations;
