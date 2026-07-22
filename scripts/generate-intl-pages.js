/**
 * es/de/pt/fr ayna sayfalarını üretir: ana sayfa + /tools/* rotaları.
 * (TR ayrı: generate-tr-pages.js sitenin tamamını aynalar.)
 * Meta başlık/açıklamalar scripts/intl-data.json'dan gelir.
 * Yeni araç eklendiğinde intl-data.json "tools" bölümüne kayıt ekleyip yeniden çalıştırın.
 */
const fs = require("fs");
const path = require("path");

const DATA = require("./intl-data.json");
const LANGS = ["es", "de", "pt", "fr"];
const appDir = path.join(__dirname, "..", "src", "app");

// slug → çeviri anahtarı eşlemesi
const SLUG_KEY = {
  "pdf-merge": "pdf.merge",
  "pdf-split": "pdf.split",
  "pdf-compress": "pdf.compress",
  "pdf-rotate": "pdf.rotate",
  "pdf-pages": "pdf.pages",
  "pdf-watermark": "pdf.watermark",
  "pdf-pagenumber": "pdf.pagenumber",
  "text-counter": "tool.textCounter",
  "json-formatter": "tool.jsonFormatter",
  "qr-generator": "tool.qrGenerator",
  "password-generator": "tool.passwordGenerator",
  "image-compress": "tool.imageCompress",
  "base64": "tool.base64",
  "color-picker": "tool.colorPicker",
  "lorem-ipsum": "tool.loremIpsum",
  "markdown-preview": "tool.markdownPreview",
  "unit-converter": "tool.unitConverter",
  "image-convert": "tool.imageConvert",
  "pdf-to-image": "tool.pdfToImage",
  "image-to-pdf": "tool.imageToPdf",
  "heic-convert": "tool.heicConvert",
  "image-resize": "tool.imageResize",
  "uuid-generator": "tool.uuidGenerator",
  "pdf-sign": "tool.pdfSign",
  "exif-cleaner": "tool.exifCleaner",
  "age-calculator": "tool.ageCalculator",
  "case-converter": "tool.caseConverter",
  "text-diff": "tool.textDiff",
  "csv-json": "tool.csvJson",
  "timestamp-converter": "tool.timestampConverter",
  "favicon-generator": "tool.faviconGenerator",
  "ocr": "tool.ocr",
  "url-encode": "tool.urlEncode",
  "jwt-decoder": "tool.jwtDecoder",
  "regex-tester": "tool.regexTester",
  "percentage-calculator": "tool.percentageCalculator",
  "vat-calculator": "tool.vatCalculator",
  "number-to-words": "tool.numberToWords",
  "video-to-mp3": "tool.videoToMp3",
};

function languagesBlock(basePath, indent) {
  const i = indent;
  const langs = [
    `en: ${JSON.stringify(basePath)}`,
    `tr: ${JSON.stringify("/tr" + basePath)}`,
    ...LANGS.map((lg) => `${lg}: ${JSON.stringify("/" + lg + basePath)}`),
    `"x-default": ${JSON.stringify(basePath)}`,
  ];
  return langs.map((l) => `${i}  ${l},`).join("\n");
}

function pageSource(importPath, canonical, basePath, title, desc) {
  return `import type { Metadata } from "next";

export { default } from ${JSON.stringify(importPath)};

export const metadata: Metadata = {
  title: ${JSON.stringify(title)},
  description:
    ${JSON.stringify(desc)},
  alternates: {
    canonical: ${JSON.stringify(canonical)},
    languages: {
${languagesBlock(basePath, "    ")}
    },
  },
};
`;
}

let created = 0;
for (const lg of LANGS) {
  // Ana sayfa
  const [homeTitle, homeDesc] = DATA.meta.home[lg];
  let dir = path.join(appDir, lg);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "page.tsx"),
    pageSource("@/app/page", `/${lg}/`, "/", homeTitle, homeDesc)
  );
  created++;

  // PDF hub
  const [hubTitle, hubDesc] = DATA.meta.pdfHub[lg];
  dir = path.join(appDir, lg, "tools", "pdf");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "page.tsx"),
    pageSource("@/app/tools/pdf/page", `/${lg}/tools/pdf/`, "/tools/pdf/", hubTitle, hubDesc)
  );
  created++;

  // Araçlar
  for (const [slug, key] of Object.entries(SLUG_KEY)) {
    const entry = DATA.tools[key];
    if (!entry || !entry[lg]) {
      console.warn(`çeviri eksik: ${key} / ${lg} — atlandı`);
      continue;
    }
    const [name, desc] = entry[lg];
    const title = name + DATA.meta.titleSuffix[lg];
    dir = path.join(appDir, lg, "tools", slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, "page.tsx"),
      pageSource(`@/app/tools/${slug}/page`, `/${lg}/tools/${slug}/`, `/tools/${slug}/`, title, desc)
    );
    created++;
  }
}

console.log(`${created} uluslararası ayna sayfası üretildi (${LANGS.join(", ")}).`);
