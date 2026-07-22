# ToolsMani Lansman Kiti

Aşağıdaki metinler kopyala-yapıştır için hazır. Her platformun kendi kültürü var;
metinler ona göre yazıldı. Sıra önerisi: önce Reddit (küçük test), sonra Hacker News,
en son Product Hunt (en çok hazırlık isteyen).

Genel ipuçları:
- Hepsinde aynı gün paylaşmayın; 3-4 güne yayın, her birine yorum yanıtlamak için vakit ayırın.
- Yorumlara hızlı ve dürüst yanıt verin — "bu özellik yok, ekleyeceğim" demek olumlu karşılanır.
- Eleştiri gelirse (gelecektir) savunmaya geçmeyin; teşekkür edip not alın.

---

## 1) Reddit — r/privacy

**Başlık:**
I built 25 free file tools (PDF, images) that run 100% in your browser — no uploads, no ads, no accounts

**Gövde:**

Like many of you, I've always been uncomfortable with "free online PDF tools" that
require uploading contracts, IDs and personal photos to some unknown server.

So I built ToolsMani: https://toolsmani.com

- 25 tools: PDF merge/split/compress/sign, EXIF remover, image compress/resize/convert, QR generator, password generator, and more
- Everything runs client-side in your browser (pdf-lib, canvas, Web Crypto). Your files never leave your device — the tools even work offline once the page loads.
- No ads, no accounts, no file size limits, and I intend to keep it that way.
- The EXIF remover might be the most relevant here: it strips GPS/camera/timestamp metadata locally — because a tool that removes private data shouldn't require uploading it first.

What I do collect: standard Google Analytics page views and an anonymous daily counter
per tool (literally just "pdf-merge: +1"). No file contents, ever. Privacy policy spells
this out: https://toolsmani.com/privacy/

Happy to answer anything about the implementation. Tool suggestions welcome — I ship fast.

**Not:** r/privacy self-promotion kurallarına dikkat: gönderi öncesi subreddit kurallarını okuyun;
bazı sub'lar "Tool Tuesday" gibi belirli günler ister. Alternatif sub'lar: r/degoogle, r/selfhosted (kısmen), r/webdev (Show-off Saturday), r/InternetIsBeautiful.

---

## 2) Hacker News — Show HN

**Başlık:**
Show HN: 25 file tools (PDF sign, EXIF remover) that run entirely in the browser

**URL:** https://toolsmani.com

**İlk yorum (gönderiyle birlikte kendiniz ekleyin):**

Hi HN. I built this because every "free PDF tool" site wants me to upload my documents
to their servers, and that always felt backwards.

Everything is client-side: pdf-lib for PDF manipulation, canvas re-encoding for images
(which is also how the EXIF remover works — metadata blocks simply aren't carried over),
Web Crypto for hashing, and a local QR encoder. The site is a static Next.js export on
Firebase Hosting, so there's no backend that could even receive your files.

Trade-offs I accepted: PDF compression is structure-only (no image downsampling yet),
and very large files are limited by device memory. In exchange: no upload wait, no file
size limits, works offline after load.

No ads, no accounts. Revenue model: none for now — costs are near zero because
everything runs on the client.

Would love feedback, especially on what tools are still missing.

**Not:** HN'de salı-perşembe, ABD sabah saatleri (TR ile 16:00-18:00 arası) iyi zamandır.
Yorumlara ilk 2 saat içinde yanıt vermek kritik.

---

## 3) Product Hunt

**Ürün adı:** ToolsMani

**Tagline (60 karakter sınırı):**
25 free file tools that never upload your files

**Açıklama:**

ToolsMani is a collection of 25 free tools for everyday file tasks — merge/split/compress/sign
PDFs, remove EXIF metadata from photos, compress and resize images, generate QR codes and
passwords, and more.

The difference: everything runs 100% in your browser. Your files are processed on your own
device and never touch a server. No ads, no accounts, no file size limits — and it stays free.

**İlk yorum (Maker comment):**

Hey hunters! 👋

I started ToolsMani after one too many "upload your contract to compress it" experiences.
It felt wrong that basic file operations require handing your documents to a stranger's server.

So every tool here is client-side: the PDF signer embeds your drawn signature locally with
pdf-lib, the EXIF remover strips photo metadata by re-encoding pixels on a canvas, and the
QR generator encodes locally. Once the page loads, most tools work with your internet off —
that's the proof.

It's free, ad-free, and account-free. I make no money from it right now; hosting is nearly
free because there's no backend.

What tool should I build next? I usually ship within days. 🚀

**Görseller:** PH galerisi için 1270x760 ekran görüntüleri gerekir. Ana sayfa + 2-3 araç
sayfası (pdf-sign, exif-cleaner) ekran görüntüsü alın. og-image.png'yi de küçük logo
alanına koyabilirsiniz.

**Not:** PH lansmanı Pasifik saatiyle gece 00:01'de başlar (TR 10:00/11:00). Salı-perşembe
tercih edin. Lansman günü yorumlara gün boyu yanıt verin.

---

## 4) Dizinler (tek seferlik, 10'ar dakika)

- **AlternativeTo** — https://alternativeto.net/manage-item/ → "ToolsMani" ekleyin;
  alternatifi olduğu ürünler: iLovePDF, Smallpdf, TinyPNG. Gizlilik vurgusunu açıklamaya yazın.
- **Privacy Guides forum** (discuss.privacyguides.net) — "Site Suggestions" bölümüne mütevazı
  bir tanıtım.
- **GitHub awesome listeleri** — "awesome-privacy" ve "awesome-selfhosted" benzeri listelere
  PR açılabilir (kodu açık kaynak yaparsanız şansı artar — düşünmeye değer).

---

## Yanıt şablonları (yorumlar için)

**"Kod açık kaynak mı?" sorusuna:**
Not yet — it's on my list. The privacy claim is verifiable today though: open DevTools,
watch the network tab while using any tool, or just turn off your connection after page load.

**"X aracı eksik" yorumuna:**
Good idea — added to my list. I usually ship new tools within a few days; follow the site
or check back next week.

**"Nasıl para kazanıyorsun?" sorusuna:**
Right now, I don't. Client-side processing means hosting costs are near zero, so I can
afford to keep it free and ad-free. If that ever changes, it'll be clearly announced and
never at the cost of the no-upload principle.
