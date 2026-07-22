export const LOCALES = ["en", "tr", "es", "de", "pt", "fr"] as const;
export type Locale = (typeof LOCALES)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  tr: "Türkçe",
  es: "Español",
  de: "Deutsch",
  pt: "Português",
  fr: "Français",
};

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
  "tool.imageResize": { en: "Image Resizer", tr: "Resim Boyutlandırma" },
  "tool.imageResize.desc": {
    en: "Resize JPG, PNG and WebP images by width or percentage. Batch support, aspect ratio preserved.",
    tr: "JPG, PNG ve WebP resimleri genişliğe veya yüzdeye göre boyutlandırın. Toplu işlem, en-boy oranı korunur.",
  },
  "tool.uuidGenerator": { en: "UUID Generator & Hash", tr: "UUID Üretici & Hash" },
  "tool.pdfSign": { en: "Sign PDF", tr: "PDF İmzalama" },
  "tool.pdfSign.desc": {
    en: "Draw your signature and place it on any PDF page. The document never leaves your browser.",
    tr: "İmzanızı çizin ve PDF'in istediğiniz sayfasına yerleştirin. Belge tarayıcınızdan çıkmaz.",
  },
  "tool.exifCleaner": { en: "EXIF Remover", tr: "EXIF Temizleyici" },
  "tool.ageCalculator": { en: "Age Calculator", tr: "Yaş Hesaplama" },
  "tool.ageCalculator.desc": {
    en: "Calculate exact age in years, months and days, plus total days lived and next birthday.",
    tr: "Yaşınızı yıl, ay ve gün olarak hesaplayın; toplam gün ve sonraki doğum gününüzü görün.",
  },
  "tool.caseConverter": { en: "Case Converter", tr: "Büyük/Küçük Harf Dönüştürücü" },
  "tool.caseConverter.desc": {
    en: "Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case and more.",
    tr: "Metni BÜYÜK HARF, küçük harf, Kelime Başı Büyük, camelCase, snake_case biçimlerine çevirin.",
  },
  "tool.textDiff": { en: "Text Compare (Diff)", tr: "Metin Karşılaştırma" },
  "tool.textDiff.desc": {
    en: "Compare two texts and see the differences line by line. Nothing is uploaded.",
    tr: "İki metni karşılaştırın, farkları satır satır görün. Hiçbir şey yüklenmez.",
  },
  "tool.csvJson": { en: "CSV ↔ JSON Converter", tr: "CSV ↔ JSON Dönüştürücü" },
  "tool.csvJson.desc": {
    en: "Convert CSV data to JSON and JSON arrays back to CSV. Quoted fields and custom delimiters.",
    tr: "CSV veriyi JSON'a, JSON dizilerini CSV'ye çevirin. Tırnaklı alan ve farklı ayırıcı desteği.",
  },
  "tool.timestampConverter": { en: "Unix Timestamp Converter", tr: "Unix Timestamp Çevirici" },
  "tool.timestampConverter.desc": {
    en: "Convert Unix timestamps to readable dates and back, in local time and UTC.",
    tr: "Unix zaman damgalarını okunabilir tarihe, tarihi zaman damgasına çevirin.",
  },
  "tool.faviconGenerator": { en: "Favicon Generator", tr: "Favicon Üretici" },
  "tool.ocr": { en: "Image to Text (OCR)", tr: "Resimden Metin (OCR)" },
  "tool.urlEncode": { en: "URL Encoder/Decoder", tr: "URL Kodlay\u0131c\u0131" },
  "tool.urlEncode.desc": {
    en: "Encode text for safe use in URLs or decode percent-encoded URLs back to readable text.",
    tr: "Metni URL i\u00e7in kodlay\u0131n veya kodlanm\u0131\u015f URL'yi okunur h\u00e2line \u00e7\u00f6z\u00fcn.",
  },
  "tool.jwtDecoder": { en: "JWT Decoder", tr: "JWT \u00c7\u00f6z\u00fcc\u00fc" },
  "tool.jwtDecoder.desc": {
    en: "Decode JWT header and payload locally. Expiry check included; the token never leaves your browser.",
    tr: "JWT ba\u015fl\u0131k ve i\u00e7eri\u011fini yerel \u00e7\u00f6z\u00fcn. Son ge\u00e7erlilik kontrol\u00fc dahil; token taray\u0131c\u0131dan \u00e7\u0131kmaz.",
  },
  "tool.regexTester": { en: "Regex Tester", tr: "Regex Test Arac\u0131" },
  "tool.regexTester.desc": {
    en: "Test regular expressions live with highlighted matches, capture groups and flags.",
    tr: "D\u00fczenli ifadeleri vurgulu e\u015fle\u015fme ve grup g\u00f6sterimiyle canl\u0131 test edin.",
  },
  "tool.percentageCalculator": { en: "Percentage Calculator", tr: "Y\u00fczde Hesaplama" },
  "tool.percentageCalculator.desc": {
    en: "What is X% of Y, X is what percent of Y, and percentage change \u2014 answered instantly.",
    tr: "Bir say\u0131n\u0131n y\u00fczdesi, oran ve y\u00fczde de\u011fi\u015fim hesaplar\u0131 \u2014 an\u0131nda sonu\u00e7.",
  },
  "tool.vatCalculator": { en: "VAT Calculator", tr: "KDV Hesaplama" },
  "tool.vatCalculator.desc": {
    en: "Add VAT to net prices or extract VAT from gross prices. Preset and custom rates.",
    tr: "Net fiyata KDV ekleyin veya dahil fiyattan ay\u0131r\u0131n. Haz\u0131r ve \u00f6zel oranlar.",
  },
  "tool.numberToWords": { en: "Number to Words", tr: "Say\u0131y\u0131 Yaz\u0131ya \u00c7evirme" },
  "tool.numberToWords.desc": {
    en: "Spell out any number in Turkish and English \u2014 for invoices, cheques and official forms.",
    tr: "Say\u0131lar\u0131n T\u00fcrk\u00e7e ve \u0130ngilizce okunu\u015funu yaz\u0131ya d\u00f6k\u00fcn \u2014 fatura ve \u00e7ekler i\u00e7in.",
  },
  "tool.videoToMp3": { en: "Video to MP3", tr: "Video → MP3" },
  "tool.videoToMp3.desc": {
    en: "Extract audio from MP4, MOV and WebM videos as MP3 or WAV. Runs in your browser — no upload.",
    tr: "MP4, MOV ve WebM videolardan sesi MP3 veya WAV olarak çıkarın. Tarayıcıda çalışır — yükleme yok.",
  },
  "tool.ocr.desc": {
    en: "Extract text from photos, screenshots and scans. OCR runs in your browser — images are never uploaded.",
    tr: "Fotoğraf, ekran görüntüsü ve taramalardan metin çıkarın. OCR tarayıcınızda çalışır — görsel yüklenmez.",
  },
  "tool.faviconGenerator.desc": {
    en: "Turn any image into a full favicon set: ICO, all PNG sizes and HTML tags.",
    tr: "Herhangi bir görseli eksiksiz favicon setine dönüştürün: ICO, tüm PNG boyutları ve HTML etiketleri.",
  },
  "tool.exifCleaner.desc": {
    en: "Strip hidden metadata from photos: GPS location, camera model, capture date and more.",
    tr: "Fotoğraflardaki gizli meta veriyi silin: GPS konumu, kamera modeli, çekim tarihi ve daha fazlası.",
  },
  "tool.uuidGenerator.desc": {
    en: "Generate random UUID v4 identifiers in bulk and compute SHA-256 hashes of any text.",
    tr: "Toplu UUID v4 kimlikleri üretin ve herhangi bir metnin SHA-256 hash'ini hesaplayın.",
  },
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

// ES/DE/PT/FR çevirileri — burada olmayan anahtarlar İngilizceye düşer.
// Kaynak: scripts/intl-data.json (tek doğruluk kaynağı; elle senkron tutulur).
const extra: Partial<Record<TranslationKey, Partial<Record<Locale, string>>>> = {
  "nav.allTools": {
    es: "Todas las Herramientas",
    de: "Alle Tools",
    pt: "Todas as Ferramentas",
    fr: "Tous les outils",
  },
  "nav.pdfTools": {
    es: "Herramientas PDF",
    de: "PDF-Tools",
    pt: "Ferramentas PDF",
    fr: "Outils PDF",
  },
  "nav.blog": {
    es: "Guías",
    de: "Anleitungen",
    pt: "Guias",
    fr: "Guides",
  },
  "nav.tryPdf": {
    es: "Probar Herramientas PDF",
    de: "PDF-Tools ausprobieren",
    pt: "Testar Ferramentas PDF",
    fr: "Essayer les outils PDF",
  },
  "hero.badge": {
    es: "100% Gratis y Privado",
    de: "100 % kostenlos & privat",
    pt: "100% Grátis e Privado",
    fr: "100 % gratuit et privé",
  },
  "hero.title1": {
    es: "Herramientas Online Potentes",
    de: "Leistungsstarke Online-Tools",
    pt: "Ferramentas Online Poderosas",
    fr: "Des outils en ligne puissants",
  },
  "hero.title2": {
    es: "Directamente en tu Navegador",
    de: "Direkt in Ihrem Browser",
    pt: "Direto no seu Navegador",
    fr: "Directement dans votre navigateur",
  },
  "hero.subtitle": {
    es: "Herramientas PDF, utilidades de texto, ayudas para desarrolladores y más. Sin registro, sin subir archivos a servidores: tus archivos nunca salen de tu dispositivo.",
    de: "PDF-Tools, Text-Utilities, Entwickler-Helfer und mehr. Keine Anmeldung, kein Hochladen auf Server – Ihre Dateien verlassen niemals Ihr Gerät.",
    pt: "Ferramentas PDF, utilitários de texto, ajudas para desenvolvedores e mais. Sem cadastro, sem envio a servidores — seus arquivos nunca saem do seu dispositivo.",
    fr: "Outils PDF, utilitaires de texte, aides pour développeurs et plus. Pas d'inscription, aucun envoi vers des serveurs — vos fichiers ne quittent jamais votre appareil.",
  },
  "hero.explorePdf": {
    es: "Herramientas PDF",
    de: "PDF-Tools",
    pt: "Ferramentas PDF",
    fr: "Outils PDF",
  },
  "hero.exploreAll": {
    es: "Explorar Todas",
    de: "Alle Tools entdecken",
    pt: "Explorar Todas",
    fr: "Explorer tous les outils",
  },
  "stats.tools": {
    es: "Herramientas Online",
    de: "Online-Tools",
    pt: "Ferramentas Online",
    fr: "Outils en ligne",
  },
  "stats.pdfTools": {
    es: "Herramientas PDF",
    de: "PDF-Tools",
    pt: "Ferramentas PDF",
    fr: "Outils PDF",
  },
  "stats.dataUploaded": {
    es: "Datos Subidos",
    de: "Hochgeladene Daten",
    pt: "Dados Enviados",
    fr: "Données envoyées",
  },
  "stats.allTools": {
    es: "Todas las Herramientas",
    de: "Alle Tools",
    pt: "Todas as Ferramentas",
    fr: "Tous les outils",
  },
  "tools.title": {
    es: "Todas las Herramientas",
    de: "Alle Tools",
    pt: "Todas as Ferramentas",
    fr: "Tous les outils",
  },
  "tools.subtitle": {
    es: "Una colección creciente de herramientas gratuitas para facilitar tus tareas diarias.",
    de: "Eine wachsende Sammlung kostenloser Tools für Ihre täglichen Aufgaben.",
    pt: "Uma coleção crescente de ferramentas gratuitas para facilitar suas tarefas diárias.",
    fr: "Une collection croissante d'outils gratuits pour simplifier vos tâches quotidiennes.",
  },
  "tools.noLimit": {
    es: "Sin límite",
    de: "Ohne Limit",
    pt: "Sem limite",
    fr: "Sans limite",
  },
  "cat.all": {
    es: "Todas",
    de: "Alle Tools",
    pt: "Todas",
    fr: "Tous",
  },
  "cat.pdf": {
    es: "Herramientas PDF",
    de: "PDF-Tools",
    pt: "Ferramentas PDF",
    fr: "Outils PDF",
  },
  "cat.text": {
    es: "Texto",
    de: "Text",
    pt: "Texto",
    fr: "Texte",
  },
  "cat.developer": {
    es: "Desarrollador",
    de: "Entwickler",
    pt: "Desenvolvedor",
    fr: "Développeur",
  },
  "cat.generator": {
    es: "Generadores",
    de: "Generatoren",
    pt: "Geradores",
    fr: "Générateurs",
  },
  "cat.file": {
    es: "Archivos",
    de: "Dateien",
    pt: "Arquivos",
    fr: "Fichiers",
  },
  "privacy.title1": {
    es: "Tus archivos permanecen en tu dispositivo.",
    de: "Ihre Dateien bleiben auf Ihrem Gerät.",
    pt: "Seus arquivos ficam no seu dispositivo.",
    fr: "Vos fichiers restent sur votre appareil.",
  },
  "privacy.title2": {
    es: "Siempre.",
    de: "Immer.",
    pt: "Sempre.",
    fr: "Toujours.",
  },
  "privacy.subtitle": {
    es: "A diferencia de otras herramientas, nunca subimos tus archivos a ningún servidor. Todo el procesamiento ocurre localmente en tu navegador con APIs web modernas. Sin rastreo ni recopilación de datos.",
    de: "Im Gegensatz zu anderen Tools laden wir Ihre Dateien niemals auf einen Server hoch. Die gesamte Verarbeitung erfolgt lokal in Ihrem Browser mit modernen Web-APIs. Kein Tracking, keine Datensammlung.",
    pt: "Ao contrário de outras ferramentas, nunca enviamos seus arquivos a nenhum servidor. Todo o processamento acontece localmente no seu navegador com APIs web modernas. Sem rastreamento nem coleta de dados.",
    fr: "Contrairement à d'autres outils, nous n'envoyons jamais vos fichiers vers un serveur. Tout le traitement s'effectue localement dans votre navigateur grâce aux API web modernes. Pas de pistage ni de collecte de données.",
  },
  "privacy.noUpload": {
    es: "Sin subida de archivos",
    de: "Kein Datei-Upload",
    pt: "Sem envio de arquivos",
    fr: "Aucun envoi de fichiers",
  },
  "privacy.noData": {
    es: "Sin datos almacenados",
    de: "Keine Datenspeicherung",
    pt: "Sem dados armazenados",
    fr: "Aucune donnée stockée",
  },
  "privacy.noAccount": {
    es: "Sin cuenta",
    de: "Kein Konto nötig",
    pt: "Sem conta",
    fr: "Aucun compte requis",
  },
  "privacy.offline": {
    es: "Funciona sin conexión",
    de: "Funktioniert offline",
    pt: "Funciona offline",
    fr: "Fonctionne hors ligne",
  },
  "footer.description": {
    es: "Herramientas online gratuitas que respetan tu privacidad. Todo el procesamiento ocurre en tu navegador: tus archivos nunca salen de tu dispositivo.",
    de: "Kostenlose Online-Tools, die Ihre Privatsphäre respektieren. Die gesamte Verarbeitung erfolgt in Ihrem Browser – Ihre Dateien verlassen niemals Ihr Gerät.",
    pt: "Ferramentas online gratuitas que respeitam sua privacidade. Todo o processamento acontece no seu navegador — seus arquivos nunca saem do seu dispositivo.",
    fr: "Des outils en ligne gratuits qui respectent votre vie privée. Tout le traitement s'effectue dans votre navigateur — vos fichiers ne quittent jamais votre appareil.",
  },
  "footer.pdfTools": {
    es: "Herramientas PDF",
    de: "PDF-Tools",
    pt: "Ferramentas PDF",
    fr: "Outils PDF",
  },
  "footer.otherTools": {
    es: "Otras Herramientas",
    de: "Weitere Tools",
    pt: "Outras Ferramentas",
    fr: "Autres outils",
  },
  "footer.rights": {
    es: "Todos los derechos reservados.",
    de: "Alle Rechte vorbehalten.",
    pt: "Todos os direitos reservados.",
    fr: "Tous droits réservés.",
  },
  "footer.tagline": {
    es: "Herramientas gratuitas hechas con cuidado. Tu privacidad es nuestra prioridad.",
    de: "Kostenlose Tools, mit Sorgfalt gebaut. Ihre Privatsphäre hat Priorität.",
    pt: "Ferramentas gratuitas feitas com cuidado. Sua privacidade é nossa prioridade.",
    fr: "Des outils gratuits, conçus avec soin. Votre vie privée est notre priorité.",
  },
  "pdfHub.title": {
    es: "Herramientas PDF Online Gratis",
    de: "Kostenlose Online-PDF-Tools",
    pt: "Ferramentas PDF Online Grátis",
    fr: "Outils PDF en ligne gratuits",
  },
  "pdfHub.subtitle": {
    es: "El kit de herramientas PDF más práctico de internet. Une, divide, comprime, rota, añade marcas de agua y números de página — todo gratis y sin límites de tamaño.",
    de: "Das praktischste PDF-Toolkit im Internet. Zusammenfügen, teilen, komprimieren, drehen, Wasserzeichen und Seitenzahlen hinzufügen – alles kostenlos und ohne Größenbeschränkung.",
    pt: "O kit de ferramentas PDF mais prático da internet. Junte, divida, comprima, gire, adicione marcas d'água e números de página — tudo grátis e sem limite de tamanho.",
    fr: "La boîte à outils PDF la plus pratique d'internet. Fusionnez, divisez, compressez, faites pivoter, ajoutez filigranes et numéros de page — le tout gratuitement et sans limite de taille.",
  },
  "pdfHub.noLimit": {
    es: "Sin límite de tamaño",
    de: "Keine Größenbeschränkung",
    pt: "Sem limite de tamanho",
    fr: "Aucune limite de taille",
  },
  "pdfHub.browserBased": {
    es: "100% en el navegador",
    de: "100 % browserbasiert",
    pt: "100% no navegador",
    fr: "100 % dans le navigateur",
  },
  "pdfHub.private": {
    es: "Los archivos no salen de tu dispositivo",
    de: "Dateien verlassen Ihr Gerät nicht",
    pt: "Arquivos não saem do seu dispositivo",
    fr: "Vos fichiers ne quittent pas votre appareil",
  },
  "pdfHub.backToAll": {
    es: "Volver a Todas las Herramientas",
    de: "Zurück zu allen Tools",
    pt: "Voltar a Todas as Ferramentas",
    fr: "Retour à tous les outils",
  },
  "pdfHub.whyTitle": {
    es: "¿Por qué elegir las herramientas PDF de ToolsMani?",
    de: "Warum die PDF-Tools von ToolsMani?",
    pt: "Por que escolher as ferramentas PDF do ToolsMani?",
    fr: "Pourquoi choisir les outils PDF de ToolsMani ?",
  },
  "pdfHub.why1Title": {
    es: "Sin límites de subida",
    de: "Keine Upload-Limits",
    pt: "Sem limites de envio",
    fr: "Aucune limite d'envoi",
  },
  "pdfHub.why1Desc": {
    es: "A diferencia de otras herramientas limitadas a 10-25 MB, procesamos archivos de cualquier tamaño. El único límite es la memoria de tu navegador.",
    de: "Anders als Tools mit 10-25-MB-Limits verarbeiten wir Dateien jeder Größe. Die einzige Grenze ist der Speicher Ihres Browsers.",
    pt: "Ao contrário de outras ferramentas limitadas a 10-25 MB, processamos arquivos de qualquer tamanho. O único limite é a memória do seu navegador.",
    fr: "Contrairement aux outils limités à 10-25 Mo, nous traitons des fichiers de toute taille. La seule limite est la mémoire de votre navigateur.",
  },
  "pdfHub.why2Title": {
    es: "Privacidad total",
    de: "Vollständige Privatsphäre",
    pt: "Privacidade total",
    fr: "Confidentialité totale",
  },
  "pdfHub.why2Desc": {
    es: "Tus archivos nunca salen de tu dispositivo. Todo se procesa localmente en tu navegador. Sin servidores, sin nube, sin rastreo.",
    de: "Ihre Dateien verlassen niemals Ihr Gerät. Alles wird lokal in Ihrem Browser verarbeitet. Keine Server, keine Cloud, kein Tracking.",
    pt: "Seus arquivos nunca saem do seu dispositivo. Tudo é processado localmente no navegador. Sem servidores, sem nuvem, sem rastreamento.",
    fr: "Vos fichiers ne quittent jamais votre appareil. Tout est traité localement dans votre navigateur. Pas de serveurs, pas de cloud, pas de pistage.",
  },
  "pdfHub.why3Title": {
    es: "Procesamiento instantáneo",
    de: "Sofortige Verarbeitung",
    pt: "Processamento instantâneo",
    fr: "Traitement instantané",
  },
  "pdfHub.why3Desc": {
    es: "Sin esperas de subidas y descargas de servidor. Todo corre a la velocidad de tu dispositivo. Resultados en segundos.",
    de: "Kein Warten auf Server-Uploads und -Downloads. Alles läuft mit der Geschwindigkeit Ihres Geräts. Ergebnisse in Sekunden.",
    pt: "Sem esperar uploads e downloads de servidor. Tudo roda na velocidade do seu dispositivo. Resultados em segundos.",
    fr: "Pas d'attente d'envois et de téléchargements serveur. Tout s'exécute à la vitesse de votre appareil. Résultats en quelques secondes.",
  },
  "pdfMerge.title": {
    es: "Unir PDF",
    de: "PDF zusammenfügen",
    pt: "Juntar PDF",
    fr: "Fusionner PDF",
  },
  "pdfMerge.subtitle": {
    es: "Une varios archivos PDF en uno. Arrastra para reordenar y descarga.",
    de: "Mehrere PDF-Dateien zu einer zusammenfügen. Zum Sortieren ziehen, dann herunterladen.",
    pt: "Junte vários arquivos PDF em um. Arraste para reordenar e baixe.",
    fr: "Fusionnez plusieurs fichiers PDF en un seul. Glissez pour réorganiser, puis téléchargez.",
  },
  "pdfSplit.title": {
    es: "Dividir PDF",
    de: "PDF teilen",
    pt: "Dividir PDF",
    fr: "Diviser PDF",
  },
  "pdfSplit.subtitle": {
    es: "Divide un PDF en varios archivos. Extrae páginas, divide por rangos o cada N páginas.",
    de: "Teilen Sie ein PDF in mehrere Dateien. Seiten extrahieren, nach Bereichen oder alle N Seiten teilen.",
    pt: "Divida um PDF em vários arquivos. Extraia páginas, divida por intervalos ou a cada N páginas.",
    fr: "Divisez un PDF en plusieurs fichiers. Extrayez des pages, divisez par plages ou toutes les N pages.",
  },
  "pdfCompress.title": {
    es: "Comprimir PDF",
    de: "PDF komprimieren",
    pt: "Comprimir PDF",
    fr: "Compresser PDF",
  },
  "pdfCompress.subtitle": {
    es: "Reduce el tamaño del PDF optimizando su estructura y eliminando datos sin uso.",
    de: "Reduzieren Sie die PDF-Größe durch Optimierung der Struktur und Entfernen ungenutzter Daten.",
    pt: "Reduza o tamanho do PDF otimizando a estrutura e removendo dados não usados.",
    fr: "Réduisez la taille du PDF en optimisant sa structure et en supprimant les données inutiles.",
  },
  "pdfRotate.title": {
    es: "Rotar PDF",
    de: "PDF drehen",
    pt: "Girar PDF",
    fr: "Pivoter PDF",
  },
  "pdfRotate.subtitle": {
    es: "Rota las páginas del PDF una a una o todas a la vez. Descarga el resultado al instante.",
    de: "Drehen Sie PDF-Seiten einzeln oder alle auf einmal. Ergebnis sofort herunterladen.",
    pt: "Gire as páginas do PDF individualmente ou todas de uma vez. Baixe o resultado na hora.",
    fr: "Faites pivoter les pages du PDF une par une ou toutes à la fois. Téléchargez le résultat instantanément.",
  },
  "pdfPages.title": {
    es: "Gestor de Páginas PDF",
    de: "PDF-Seitenmanager",
    pt: "Gerenciador de Páginas PDF",
    fr: "Gestionnaire de pages PDF",
  },
  "pdfPages.subtitle": {
    es: "Extrae o elimina páginas concretas de un PDF. Selecciona las que necesites y descarga.",
    de: "Bestimmte Seiten aus einem PDF extrahieren oder löschen. Gewünschte Seiten auswählen und herunterladen.",
    pt: "Extraia ou exclua páginas específicas de um PDF. Selecione as que precisa e baixe.",
    fr: "Extrayez ou supprimez des pages précises d'un PDF. Sélectionnez celles qu'il vous faut et téléchargez.",
  },
  "pdfWatermark.title": {
    es: "Marca de Agua en PDF",
    de: "PDF-Wasserzeichen",
    pt: "Marca d'Água em PDF",
    fr: "Filigrane PDF",
  },
  "pdfWatermark.subtitle": {
    es: "Añade marcas de agua de texto a tus PDF. Personaliza texto, tamaño, color y opacidad.",
    de: "Fügen Sie Text-Wasserzeichen zu Ihren PDFs hinzu. Text, Größe, Farbe und Deckkraft anpassen.",
    pt: "Adicione marcas d'água de texto aos seus PDFs. Personalize texto, tamanho, cor e opacidade.",
    fr: "Ajoutez des filigranes de texte à vos PDF. Personnalisez texte, taille, couleur et opacité.",
  },
  "pdfPageNum.title": {
    es: "Añadir Números de Página",
    de: "Seitenzahlen hinzufügen",
    pt: "Adicionar Números de Página",
    fr: "Ajouter des numéros de page",
  },
  "pdfPageNum.subtitle": {
    es: "Añade números de página a tu PDF. Elige posición, formato y número inicial.",
    de: "Fügen Sie Ihrem PDF Seitenzahlen hinzu. Position, Format und Startnummer wählen.",
    pt: "Adicione números de página ao seu PDF. Escolha posição, formato e número inicial.",
    fr: "Ajoutez des numéros de page à votre PDF. Choisissez position, format et numéro de départ.",
  },
  "pdf.merge.name": {
    es: "Unir PDF",
    de: "PDF zusammenfügen",
    pt: "Juntar PDF",
    fr: "Fusionner PDF",
  },
  "pdf.merge.desc": {
    es: "Une varios PDF en un solo archivo. Arrastra para reordenar las páginas.",
    de: "Mehrere PDFs zu einer Datei zusammenfügen. Seiten per Drag & Drop sortieren.",
    pt: "Junte vários PDFs em um único arquivo. Arraste para reordenar as páginas.",
    fr: "Fusionnez plusieurs PDF en un seul fichier. Glissez pour réorganiser les pages.",
  },
  "pdf.split.name": {
    es: "Dividir PDF",
    de: "PDF teilen",
    pt: "Dividir PDF",
    fr: "Diviser PDF",
  },
  "pdf.split.desc": {
    es: "Divide un PDF en varios archivos por rangos de páginas o extrae todas las páginas.",
    de: "Ein PDF nach Seitenbereichen in mehrere Dateien teilen oder alle Seiten extrahieren.",
    pt: "Divida um PDF em vários arquivos por intervalos de páginas ou extraia todas as páginas.",
    fr: "Divisez un PDF en plusieurs fichiers par plages de pages ou extrayez toutes les pages.",
  },
  "pdf.compress.name": {
    es: "Comprimir PDF",
    de: "PDF komprimieren",
    pt: "Comprimir PDF",
    fr: "Compresser PDF",
  },
  "pdf.compress.desc": {
    es: "Reduce el tamaño del archivo optimizando la estructura y eliminando datos sin uso.",
    de: "Dateigröße durch Strukturoptimierung und Entfernen ungenutzter Daten reduzieren.",
    pt: "Reduza o tamanho do arquivo otimizando a estrutura e removendo dados não usados.",
    fr: "Réduisez la taille du fichier en optimisant la structure et en supprimant les données inutiles.",
  },
  "pdf.rotate.name": {
    es: "Rotar PDF",
    de: "PDF drehen",
    pt: "Girar PDF",
    fr: "Pivoter PDF",
  },
  "pdf.rotate.desc": {
    es: "Rota páginas una a una o todas a la vez. Corrige documentos escaneados.",
    de: "Seiten einzeln oder alle auf einmal drehen. Gescannte Dokumente korrigieren.",
    pt: "Gire páginas individualmente ou todas de uma vez. Corrija documentos digitalizados.",
    fr: "Faites pivoter les pages une par une ou toutes à la fois. Corrigez les documents numérisés.",
  },
  "pdf.pages.name": {
    es: "Gestor de Páginas PDF",
    de: "PDF-Seitenmanager",
    pt: "Gerenciador de Páginas",
    fr: "Gestionnaire de pages PDF",
  },
  "pdf.pages.desc": {
    es: "Extrae o elimina páginas concretas. Selecciona impares, pares o personalizadas.",
    de: "Bestimmte Seiten extrahieren oder löschen. Ungerade, gerade oder eigene Auswahl.",
    pt: "Extraia ou exclua páginas específicas. Selecione ímpares, pares ou personalizadas.",
    fr: "Extrayez ou supprimez des pages précises. Sélection impaire, paire ou personnalisée.",
  },
  "pdf.watermark.name": {
    es: "Marca de Agua PDF",
    de: "PDF-Wasserzeichen",
    pt: "Marca d'Água PDF",
    fr: "Filigrane PDF",
  },
  "pdf.watermark.desc": {
    es: "Añade marcas de agua de texto. Controla tamaño, color, opacidad y rotación.",
    de: "Text-Wasserzeichen hinzufügen. Größe, Farbe, Deckkraft und Drehung steuern.",
    pt: "Adicione marcas d'água de texto. Controle tamanho, cor, opacidade e rotação.",
    fr: "Ajoutez des filigranes de texte. Contrôlez taille, couleur, opacité et rotation.",
  },
  "pdf.pagenumber.name": {
    es: "Números de Página PDF",
    de: "PDF-Seitenzahlen",
    pt: "Números de Página PDF",
    fr: "Numéros de page PDF",
  },
  "pdf.pagenumber.desc": {
    es: "Añade números de página con posición, formato y número inicial personalizados.",
    de: "Seitenzahlen mit eigener Position, Format und Startnummer hinzufügen.",
    pt: "Adicione números de página com posição, formato e número inicial personalizados.",
    fr: "Ajoutez des numéros de page avec position, format et numéro de départ personnalisés.",
  },
  "tool.textCounter": {
    es: "Contador de Palabras",
    de: "Wortzähler",
    pt: "Contador de Palavras",
    fr: "Compteur de mots",
  },
  "tool.textCounter.desc": {
    es: "Cuenta palabras, caracteres, frases y párrafos al instante. Ideal para ensayos y redes sociales.",
    de: "Wörter, Zeichen, Sätze und Absätze sofort zählen. Ideal für Aufsätze und Social Media.",
    pt: "Conte palavras, caracteres, frases e parágrafos na hora. Ideal para textos e redes sociais.",
    fr: "Comptez mots, caractères, phrases et paragraphes instantanément. Idéal pour rédactions et réseaux sociaux.",
  },
  "tool.jsonFormatter": {
    es: "Formateador JSON",
    de: "JSON-Formatter",
    pt: "Formatador JSON",
    fr: "Formateur JSON",
  },
  "tool.jsonFormatter.desc": {
    es: "Formatea, valida y embellece tus datos JSON. Admite minificación y vista de árbol.",
    de: "JSON-Daten formatieren, validieren und verschönern. Mit Minifizierung und Baumansicht.",
    pt: "Formate, valide e embeleze seus dados JSON. Suporta minificação e visão em árvore.",
    fr: "Formatez, validez et embellissez vos données JSON. Minification et vue arborescente incluses.",
  },
  "tool.qrGenerator": {
    es: "Generador de Códigos QR",
    de: "QR-Code-Generator",
    pt: "Gerador de QR Code",
    fr: "Générateur de QR code",
  },
  "tool.qrGenerator.desc": {
    es: "Genera códigos QR para URLs, texto, Wi-Fi y más. Descarga en PNG o SVG.",
    de: "QR-Codes für URLs, Text, WLAN und mehr erstellen. Als PNG oder SVG herunterladen.",
    pt: "Gere códigos QR para URLs, texto, Wi-Fi e mais. Baixe em PNG ou SVG.",
    fr: "Générez des QR codes pour URL, texte, Wi-Fi et plus. Téléchargez en PNG ou SVG.",
  },
  "tool.passwordGenerator": {
    es: "Generador de Contraseñas",
    de: "Passwort-Generator",
    pt: "Gerador de Senhas",
    fr: "Générateur de mots de passe",
  },
  "tool.passwordGenerator.desc": {
    es: "Crea contraseñas fuertes y seguras con longitud y caracteres personalizables.",
    de: "Starke, sichere Passwörter mit anpassbarer Länge und Zeichenarten erstellen.",
    pt: "Crie senhas fortes e seguras com comprimento e caracteres personalizáveis.",
    fr: "Créez des mots de passe forts et sûrs, longueur et caractères personnalisables.",
  },
  "tool.imageCompress": {
    es: "Compresor de Imágenes",
    de: "Bildkompressor",
    pt: "Compressor de Imagens",
    fr: "Compresseur d'images",
  },
  "tool.imageCompress.desc": {
    es: "Comprime imágenes sin perder calidad. Compatible con JPEG, PNG y WebP.",
    de: "Bilder ohne Qualitätsverlust komprimieren. Unterstützt JPEG, PNG und WebP.",
    pt: "Comprima imagens sem perder qualidade. Suporta JPEG, PNG e WebP.",
    fr: "Compressez des images sans perte de qualité. Compatible JPEG, PNG et WebP.",
  },
  "tool.base64": {
    es: "Codificador Base64",
    de: "Base64-Encoder/Decoder",
    pt: "Codificador Base64",
    fr: "Encodeur Base64",
  },
  "tool.base64.desc": {
    es: "Codifica texto a Base64 o decodifícalo de vuelta. Compatible con UTF-8.",
    de: "Text in Base64 kodieren oder zurück dekodieren. UTF-8-Unterstützung.",
    pt: "Codifique texto em Base64 ou decodifique de volta. Suporte a UTF-8.",
    fr: "Encodez du texte en Base64 ou décodez-le. Compatible UTF-8.",
  },
  "tool.colorPicker": {
    es: "Selector de Color",
    de: "Farbwähler & Konverter",
    pt: "Seletor de Cores",
    fr: "Sélecteur de couleurs",
  },
  "tool.colorPicker.desc": {
    es: "Elige colores y convierte entre HEX, RGB y HSL. Copia los valores al instante.",
    de: "Farben wählen und zwischen HEX, RGB und HSL konvertieren. Werte sofort kopieren.",
    pt: "Escolha cores e converta entre HEX, RGB e HSL. Copie os valores na hora.",
    fr: "Choisissez des couleurs et convertissez entre HEX, RGB et HSL. Copiez les valeurs instantanément.",
  },
  "tool.loremIpsum": {
    es: "Generador Lorem Ipsum",
    de: "Lorem-Ipsum-Generator",
    pt: "Gerador Lorem Ipsum",
    fr: "Générateur Lorem Ipsum",
  },
  "tool.loremIpsum.desc": {
    es: "Genera texto de relleno en párrafos, frases o palabras. Perfecto para maquetas.",
    de: "Platzhaltertext als Absätze, Sätze oder Wörter erzeugen. Perfekt für Mockups.",
    pt: "Gere texto de preenchimento em parágrafos, frases ou palavras. Perfeito para mockups.",
    fr: "Générez du texte de remplissage en paragraphes, phrases ou mots. Parfait pour les maquettes.",
  },
  "tool.markdownPreview": {
    es: "Vista Previa Markdown",
    de: "Markdown-Vorschau",
    pt: "Pré-visualização Markdown",
    fr: "Aperçu Markdown",
  },
  "tool.markdownPreview.desc": {
    es: "Escribe Markdown y ve una vista previa en vivo. Títulos, listas, código y más.",
    de: "Markdown schreiben und live in der Vorschau sehen. Überschriften, Listen, Code und mehr.",
    pt: "Escreva Markdown e veja a prévia ao vivo. Títulos, listas, código e mais.",
    fr: "Écrivez du Markdown et voyez l'aperçu en direct. Titres, listes, code et plus.",
  },
  "tool.unitConverter": {
    es: "Conversor de Unidades",
    de: "Einheitenumrechner",
    pt: "Conversor de Unidades",
    fr: "Convertisseur d'unités",
  },
  "tool.unitConverter.desc": {
    es: "Convierte longitud, peso, temperatura, volumen y más. Rápido y preciso.",
    de: "Länge, Gewicht, Temperatur, Volumen und mehr umrechnen. Schnell und genau.",
    pt: "Converta comprimento, peso, temperatura, volume e mais. Rápido e preciso.",
    fr: "Convertissez longueur, poids, température, volume et plus. Rapide et précis.",
  },
  "tool.imageConvert": {
    es: "Conversor de Imágenes",
    de: "Bildkonverter",
    pt: "Conversor de Imagens",
    fr: "Convertisseur d'images",
  },
  "tool.imageConvert.desc": {
    es: "Convierte imágenes entre PNG, JPEG, WebP y BMP. Conversión por lotes.",
    de: "Bilder zwischen PNG, JPEG, WebP und BMP konvertieren. Stapelverarbeitung möglich.",
    pt: "Converta imagens entre PNG, JPEG, WebP e BMP. Conversão em lote.",
    fr: "Convertissez des images entre PNG, JPEG, WebP et BMP. Conversion par lots.",
  },
  "tool.pdfToImage": {
    es: "PDF a Imagen",
    de: "PDF in Bild",
    pt: "PDF para Imagem",
    fr: "PDF en image",
  },
  "tool.pdfToImage.desc": {
    es: "Convierte páginas PDF en imágenes JPG o PNG de alta calidad. Sin límite de tamaño.",
    de: "PDF-Seiten in hochwertige JPG- oder PNG-Bilder umwandeln. Ohne Größenlimit.",
    pt: "Converta páginas PDF em imagens JPG ou PNG de alta qualidade. Sem limite de tamanho.",
    fr: "Convertissez les pages PDF en images JPG ou PNG de haute qualité. Sans limite de taille.",
  },
  "tool.imageToPdf": {
    es: "Imagen a PDF",
    de: "Bild in PDF",
    pt: "Imagem para PDF",
    fr: "Image en PDF",
  },
  "tool.imageToPdf.desc": {
    es: "Convierte imágenes JPG, PNG o WebP en un PDF. Combina varias en un solo documento.",
    de: "JPG-, PNG- oder WebP-Bilder in ein PDF umwandeln. Mehrere Bilder in einem Dokument.",
    pt: "Converta imagens JPG, PNG ou WebP em PDF. Combine várias em um único documento.",
    fr: "Convertissez des images JPG, PNG ou WebP en PDF. Combinez-en plusieurs dans un document.",
  },
  "tool.heicConvert": {
    es: "HEIC a JPG / PNG",
    de: "HEIC in JPG / PNG",
    pt: "HEIC para JPG / PNG",
    fr: "HEIC en JPG / PNG",
  },
  "tool.heicConvert.desc": {
    es: "Convierte fotos HEIC de iPhone a JPG, PNG o WebP. Por lotes, sin subir nada.",
    de: "iPhone-HEIC-Fotos in JPG, PNG oder WebP umwandeln. Stapelweise, ohne Upload.",
    pt: "Converta fotos HEIC do iPhone em JPG, PNG ou WebP. Em lote, sem upload.",
    fr: "Convertissez les photos HEIC d'iPhone en JPG, PNG ou WebP. Par lots, sans envoi.",
  },
  "tool.imageResize": {
    es: "Redimensionar Imágenes",
    de: "Bilder skalieren",
    pt: "Redimensionar Imagens",
    fr: "Redimensionner des images",
  },
  "tool.imageResize.desc": {
    es: "Redimensiona JPG, PNG y WebP por ancho o porcentaje. Mantiene la proporción.",
    de: "JPG, PNG und WebP nach Breite oder Prozent skalieren. Seitenverhältnis bleibt erhalten.",
    pt: "Redimensione JPG, PNG e WebP por largura ou porcentagem. Mantém a proporção.",
    fr: "Redimensionnez JPG, PNG et WebP par largeur ou pourcentage. Proportions conservées.",
  },
  "tool.uuidGenerator": {
    es: "Generador UUID y Hash",
    de: "UUID-Generator & Hash",
    pt: "Gerador UUID e Hash",
    fr: "Générateur UUID & Hash",
  },
  "tool.uuidGenerator.desc": {
    es: "Genera UUID v4 aleatorios en masa y calcula hashes SHA-256 de cualquier texto.",
    de: "Zufällige UUID v4 in Serie erzeugen und SHA-256-Hashes von Text berechnen.",
    pt: "Gere UUID v4 aleatórios em massa e calcule hashes SHA-256 de qualquer texto.",
    fr: "Générez des UUID v4 aléatoires en série et calculez des hachages SHA-256.",
  },
  "tool.pdfSign": {
    es: "Firmar PDF",
    de: "PDF unterschreiben",
    pt: "Assinar PDF",
    fr: "Signer un PDF",
  },
  "tool.pdfSign.desc": {
    es: "Dibuja tu firma y colócala en cualquier página del PDF. El documento no sale de tu navegador.",
    de: "Unterschrift zeichnen und auf jeder PDF-Seite platzieren. Das Dokument verlässt Ihren Browser nicht.",
    pt: "Desenhe sua assinatura e coloque em qualquer página do PDF. O documento não sai do navegador.",
    fr: "Dessinez votre signature et placez-la sur n'importe quelle page. Le document ne quitte pas votre navigateur.",
  },
  "tool.exifCleaner": {
    es: "Eliminar EXIF",
    de: "EXIF entfernen",
    pt: "Remover EXIF",
    fr: "Supprimer les EXIF",
  },
  "tool.exifCleaner.desc": {
    es: "Borra metadatos ocultos de tus fotos: ubicación GPS, cámara, fecha y más.",
    de: "Versteckte Metadaten aus Fotos löschen: GPS-Standort, Kamera, Datum und mehr.",
    pt: "Apague metadados ocultos das fotos: localização GPS, câmera, data e mais.",
    fr: "Effacez les métadonnées cachées des photos : position GPS, appareil, date et plus.",
  },
  "tool.ageCalculator": {
    es: "Calculadora de Edad",
    de: "Altersrechner",
    pt: "Calculadora de Idade",
    fr: "Calculateur d'âge",
  },
  "tool.ageCalculator.desc": {
    es: "Calcula tu edad exacta en años, meses y días, más el total de días vividos.",
    de: "Exaktes Alter in Jahren, Monaten und Tagen berechnen, plus gelebte Tage insgesamt.",
    pt: "Calcule sua idade exata em anos, meses e dias, mais o total de dias vividos.",
    fr: "Calculez votre âge exact en années, mois et jours, plus le total de jours vécus.",
  },
  "tool.caseConverter": {
    es: "Conversor de Mayúsculas",
    de: "Groß-/Kleinschreibung",
    pt: "Conversor Maiúsculas/Minúsculas",
    fr: "Convertisseur de casse",
  },
  "tool.caseConverter.desc": {
    es: "Convierte texto entre MAYÚSCULAS, minúsculas, Título, camelCase, snake_case y más.",
    de: "Text zwischen GROSSBUCHSTABEN, kleinbuchstaben, camelCase, snake_case u. a. umwandeln.",
    pt: "Converta texto entre MAIÚSCULAS, minúsculas, Título, camelCase, snake_case e mais.",
    fr: "Convertissez le texte en MAJUSCULES, minuscules, camelCase, snake_case et plus.",
  },
  "tool.textDiff": {
    es: "Comparar Textos (Diff)",
    de: "Textvergleich (Diff)",
    pt: "Comparar Textos (Diff)",
    fr: "Comparateur de textes (Diff)",
  },
  "tool.textDiff.desc": {
    es: "Compara dos textos y ve las diferencias línea por línea. Nada se sube.",
    de: "Zwei Texte vergleichen und Unterschiede Zeile für Zeile sehen. Nichts wird hochgeladen.",
    pt: "Compare dois textos e veja as diferenças linha a linha. Nada é enviado.",
    fr: "Comparez deux textes et voyez les différences ligne par ligne. Rien n'est envoyé.",
  },
  "tool.csvJson": {
    es: "Conversor CSV ↔ JSON",
    de: "CSV ↔ JSON Konverter",
    pt: "Conversor CSV ↔ JSON",
    fr: "Convertisseur CSV ↔ JSON",
  },
  "tool.csvJson.desc": {
    es: "Convierte CSV a JSON y arrays JSON a CSV. Campos entrecomillados y delimitadores.",
    de: "CSV in JSON und JSON-Arrays zurück in CSV umwandeln. Anführungszeichen und Trennzeichen.",
    pt: "Converta CSV em JSON e arrays JSON em CSV. Campos com aspas e delimitadores.",
    fr: "Convertissez CSV en JSON et tableaux JSON en CSV. Champs entre guillemets et délimiteurs.",
  },
  "tool.timestampConverter": {
    es: "Conversor Timestamp Unix",
    de: "Unix-Timestamp-Konverter",
    pt: "Conversor Timestamp Unix",
    fr: "Convertisseur timestamp Unix",
  },
  "tool.timestampConverter.desc": {
    es: "Convierte timestamps Unix a fechas legibles y viceversa, en hora local y UTC.",
    de: "Unix-Timestamps in lesbare Daten umwandeln und zurück, in Ortszeit und UTC.",
    pt: "Converta timestamps Unix em datas legíveis e vice-versa, em hora local e UTC.",
    fr: "Convertissez les timestamps Unix en dates lisibles et inversement, en heure locale et UTC.",
  },
  "tool.faviconGenerator": {
    es: "Generador de Favicon",
    de: "Favicon-Generator",
    pt: "Gerador de Favicon",
    fr: "Générateur de favicon",
  },
  "tool.faviconGenerator.desc": {
    es: "Convierte cualquier imagen en un set completo de favicons: ICO, PNG y etiquetas HTML.",
    de: "Beliebiges Bild in ein komplettes Favicon-Set umwandeln: ICO, PNG-Größen und HTML-Tags.",
    pt: "Transforme qualquer imagem em um conjunto completo de favicons: ICO, PNGs e tags HTML.",
    fr: "Transformez toute image en un jeu complet de favicons : ICO, tailles PNG et balises HTML.",
  },
  "tool.ocr": {
    es: "Imagen a Texto (OCR)",
    de: "Bild in Text (OCR)",
    pt: "Imagem para Texto (OCR)",
    fr: "Image en texte (OCR)",
  },
  "tool.ocr.desc": {
    es: "Extrae texto de fotos, capturas y escaneos. El OCR corre en tu navegador, sin subir imágenes.",
    de: "Text aus Fotos, Screenshots und Scans extrahieren. OCR läuft im Browser, ohne Upload.",
    pt: "Extraia texto de fotos, capturas e digitalizações. OCR roda no navegador, sem upload.",
    fr: "Extrayez le texte de photos, captures et scans. L'OCR s'exécute dans votre navigateur, sans envoi.",
  },
  "tool.urlEncode": {
    es: "Codificador de URL",
    de: "URL-Encoder/Decoder",
    pt: "Codificador de URL",
    fr: "Encodeur d'URL",
  },
  "tool.urlEncode.desc": {
    es: "Codifica texto para URLs o decodifica URLs codificadas a texto legible.",
    de: "Text für URLs kodieren oder prozentkodierte URLs in lesbaren Text dekodieren.",
    pt: "Codifique texto para URLs ou decodifique URLs codificadas em texto legível.",
    fr: "Encodez du texte pour les URL ou décodez les URL encodées en texte lisible.",
  },
  "tool.jwtDecoder": {
    es: "Decodificador JWT",
    de: "JWT-Decoder",
    pt: "Decodificador JWT",
    fr: "Décodeur JWT",
  },
  "tool.jwtDecoder.desc": {
    es: "Decodifica encabezado y payload de un JWT localmente. El token no sale de tu navegador.",
    de: "JWT-Header und -Payload lokal dekodieren. Der Token verlässt Ihren Browser nicht.",
    pt: "Decodifique cabeçalho e payload de um JWT localmente. O token não sai do navegador.",
    fr: "Décodez l'en-tête et la charge utile d'un JWT localement. Le jeton ne quitte pas votre navigateur.",
  },
  "tool.regexTester": {
    es: "Probador de Regex",
    de: "Regex-Tester",
    pt: "Testador de Regex",
    fr: "Testeur de regex",
  },
  "tool.regexTester.desc": {
    es: "Prueba expresiones regulares en vivo con coincidencias resaltadas y grupos de captura.",
    de: "Reguläre Ausdrücke live testen, mit hervorgehobenen Treffern und Capture-Gruppen.",
    pt: "Teste expressões regulares ao vivo com correspondências destacadas e grupos de captura.",
    fr: "Testez des expressions régulières en direct avec correspondances surlignées et groupes de capture.",
  },
  "tool.percentageCalculator": {
    es: "Calculadora de Porcentajes",
    de: "Prozentrechner",
    pt: "Calculadora de Porcentagem",
    fr: "Calculateur de pourcentage",
  },
  "tool.percentageCalculator.desc": {
    es: "Cuánto es el X% de Y, qué porcentaje es X de Y y cambio porcentual, al instante.",
    de: "Was sind X % von Y, wie viel Prozent ist X von Y und prozentuale Änderung – sofort.",
    pt: "Quanto é X% de Y, que porcentagem X é de Y e variação percentual, na hora.",
    fr: "Combien font X % de Y, quel pourcentage X est de Y et variation en pourcentage — instantanément.",
  },
  "tool.vatCalculator": {
    es: "Calculadora de IVA",
    de: "Mehrwertsteuer-Rechner",
    pt: "Calculadora de IVA",
    fr: "Calculateur de TVA",
  },
  "tool.vatCalculator.desc": {
    es: "Añade IVA a precios netos o extráelo de precios con IVA. Tasas predefinidas y personalizadas.",
    de: "MwSt. zu Nettopreisen addieren oder aus Bruttopreisen herausrechnen. Voreingestellte und eigene Sätze.",
    pt: "Adicione IVA a preços líquidos ou extraia de preços com IVA. Taxas predefinidas e personalizadas.",
    fr: "Ajoutez la TVA aux prix HT ou extrayez-la des prix TTC. Taux prédéfinis et personnalisés.",
  },
  "tool.numberToWords": {
    es: "Número a Letras",
    de: "Zahl in Worten",
    pt: "Número por Extenso",
    fr: "Nombre en lettres",
  },
  "tool.numberToWords.desc": {
    es: "Escribe cualquier número en letras — para facturas, cheques y formularios oficiales.",
    de: "Beliebige Zahlen ausschreiben – für Rechnungen, Schecks und amtliche Formulare.",
    pt: "Escreva qualquer número por extenso — para faturas, cheques e formulários oficiais.",
    fr: "Écrivez tout nombre en toutes lettres — pour factures, chèques et formulaires officiels.",
  },
  "tool.videoToMp3": {
    es: "Video a MP3",
    de: "Video in MP3",
    pt: "Vídeo para MP3",
    fr: "Vidéo en MP3",
  },
  "tool.videoToMp3.desc": {
    es: "Extrae el audio de videos MP4, MOV y WebM como MP3 o WAV. Corre en tu navegador, sin subir nada.",
    de: "Audio aus MP4-, MOV- und WebM-Videos als MP3 oder WAV extrahieren. Läuft im Browser, ohne Upload.",
    pt: "Extraia o áudio de vídeos MP4, MOV e WebM como MP3 ou WAV. Roda no navegador, sem upload.",
    fr: "Extrayez l'audio des vidéos MP4, MOV et WebM en MP3 ou WAV. S'exécute dans votre navigateur, sans envoi.",
  },
};

export function t(key: TranslationKey, locale: Locale): string {
  if (locale !== "en" && locale !== "tr") {
    const v = extra[key]?.[locale];
    if (v) return v;
    return translations[key]?.en ?? key;
  }
  return translations[key]?.[locale] ?? translations[key]?.en ?? key;
}

export default translations;
