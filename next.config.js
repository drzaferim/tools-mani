const fs = require("fs");
const path = require("path");

// Keep the PDF.js worker local so PDF tools don't depend on a CDN path that can drift across versions.
const pdfWorkerSource = path.join(
  __dirname,
  "node_modules",
  "pdfjs-dist",
  "legacy",
  "build",
  "pdf.worker.min.mjs"
);
const pdfWorkerTarget = path.join(__dirname, "public", "pdf.worker.min.mjs");

if (fs.existsSync(pdfWorkerSource)) {
  fs.copyFileSync(pdfWorkerSource, pdfWorkerTarget);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
