export interface Tool {
  id: string;
  name: string;
  description: string;
  category: "text" | "developer" | "generator" | "file" | "pdf";
  href: string;
  icon: string;
  isFree: boolean;
}

export const tools: Tool[] = [
  // PDF Tools
  {
    id: "pdf-merge",
    name: "PDF Merger",
    description:
      "Merge multiple PDF files into one. Reorder pages and customize output. No file size limit.",
    category: "pdf",
    href: "/tools/pdf-merge",
    icon: "FileText",
    isFree: true,
  },
  {
    id: "pdf-split",
    name: "PDF Splitter",
    description:
      "Split a PDF into multiple files. Extract pages, split by range, or split every N pages.",
    category: "pdf",
    href: "/tools/pdf-split",
    icon: "Scissors",
    isFree: true,
  },
  {
    id: "pdf-compress",
    name: "PDF Compress",
    description:
      "Reduce PDF file size by optimizing structure and removing unused data. No file size limit.",
    category: "pdf",
    href: "/tools/pdf-compress",
    icon: "FileDown",
    isFree: true,
  },
  {
    id: "pdf-rotate",
    name: "PDF Rotate",
    description:
      "Rotate PDF pages individually or all at once. Fix scanned documents easily.",
    category: "pdf",
    href: "/tools/pdf-rotate",
    icon: "RotateCw",
    isFree: true,
  },
  {
    id: "pdf-pages",
    name: "PDF Page Manager",
    description:
      "Extract or delete specific pages from a PDF. Select the pages you need and download.",
    category: "pdf",
    href: "/tools/pdf-pages",
    icon: "Files",
    isFree: true,
  },
  {
    id: "pdf-watermark",
    name: "PDF Watermark",
    description:
      "Add text watermarks to your PDF files. Customize text, size, color, and opacity.",
    category: "pdf",
    href: "/tools/pdf-watermark",
    icon: "Droplets",
    isFree: true,
  },
  {
    id: "pdf-pagenumber",
    name: "PDF Page Numbers",
    description:
      "Add page numbers to your PDF. Choose position, format, and starting number.",
    category: "pdf",
    href: "/tools/pdf-pagenumber",
    icon: "Hash",
    isFree: true,
  },
  {
    id: "pdf-to-image",
    name: "PDF to Image",
    description:
      "Convert PDF pages to high-quality JPG or PNG images. Extract every page as an image. No file size limit.",
    category: "pdf",
    href: "/tools/pdf-to-image",
    icon: "ImageDown",
    isFree: true,
  },
  {
    id: "image-to-pdf",
    name: "Image to PDF",
    description:
      "Convert JPG, PNG, WebP, or BMP images to a PDF document. Combine multiple images into one PDF.",
    category: "pdf",
    href: "/tools/image-to-pdf",
    icon: "FileImage",
    isFree: true,
  },
  // Text Tools
  {
    id: "text-counter",
    name: "Text Counter",
    description:
      "Count words, characters, sentences, and paragraphs instantly. Great for essays, articles, and social media posts.",
    category: "text",
    href: "/tools/text-counter",
    icon: "Type",
    isFree: true,
  },
  {
    id: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    description:
      "Generate placeholder text in paragraphs, sentences, or words. Perfect for design mockups.",
    category: "text",
    href: "/tools/lorem-ipsum",
    icon: "TextCursorInput",
    isFree: true,
  },
  {
    id: "markdown-preview",
    name: "Markdown Preview",
    description:
      "Write Markdown and see a live preview. Supports headings, lists, code blocks, and more.",
    category: "text",
    href: "/tools/markdown-preview",
    icon: "Eye",
    isFree: true,
  },
  // Developer Tools
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description:
      "Format, validate, and beautify your JSON data. Supports minification and tree view.",
    category: "developer",
    href: "/tools/json-formatter",
    icon: "Braces",
    isFree: true,
  },
  {
    id: "base64",
    name: "Base64 Encoder/Decoder",
    description:
      "Encode text to Base64 or decode Base64 back to text. Supports UTF-8 encoding.",
    category: "developer",
    href: "/tools/base64",
    icon: "Binary",
    isFree: true,
  },
  {
    id: "color-picker",
    name: "Color Picker & Converter",
    description:
      "Pick colors and convert between HEX, RGB, and HSL formats. Copy color values instantly.",
    category: "developer",
    href: "/tools/color-picker",
    icon: "Palette",
    isFree: true,
  },
  // Generators
  {
    id: "qr-generator",
    name: "QR Code Generator",
    description:
      "Generate QR codes for URLs, text, Wi-Fi credentials, and more. Download as PNG or SVG.",
    category: "generator",
    href: "/tools/qr-generator",
    icon: "QrCode",
    isFree: true,
  },
  {
    id: "password-generator",
    name: "Password Generator",
    description:
      "Create strong, secure passwords with customizable length and character types.",
    category: "generator",
    href: "/tools/password-generator",
    icon: "Shield",
    isFree: true,
  },
  {
    id: "unit-converter",
    name: "Unit Converter",
    description:
      "Convert between units of length, weight, temperature, volume, and more. Fast and accurate.",
    category: "generator",
    href: "/tools/unit-converter",
    icon: "Ruler",
    isFree: true,
  },
  // File Tools
  {
    id: "image-compress",
    name: "Image Compressor",
    description:
      "Compress images without losing quality. Supports JPEG, PNG, and WebP formats.",
    category: "file",
    href: "/tools/image-compress",
    icon: "Image",
    isFree: true,
  },
  {
    id: "image-convert",
    name: "Image Converter",
    description:
      "Convert images between PNG, JPEG, WebP, and BMP formats. Batch convert multiple files.",
    category: "file",
    href: "/tools/image-convert",
    icon: "ArrowRightLeft",
    isFree: true,
  },
  {
    id: "heic-convert",
    name: "HEIC to JPG / PNG",
    description:
      "Convert iPhone HEIC/HEIF photos to JPG, PNG or WebP. Batch convert multiple files. No upload needed.",
    category: "file",
    href: "/tools/heic-convert",
    icon: "Smartphone",
    isFree: true,
  },
  {
    id: "pdf-sign",
    name: "Sign PDF",
    description:
      "Draw your signature and place it on any PDF page. The document never leaves your browser.",
    category: "pdf",
    href: "/tools/pdf-sign",
    icon: "PenTool",
    isFree: true,
  },
  {
    id: "exif-cleaner",
    name: "EXIF Remover",
    description:
      "Strip hidden metadata from photos: GPS location, camera model, capture date and more.",
    category: "file",
    href: "/tools/exif-cleaner",
    icon: "ShieldCheck",
    isFree: true,
  },
  {
    id: "image-resize",
    name: "Image Resizer",
    description:
      "Resize JPG, PNG and WebP images by width or percentage. Batch support, aspect ratio preserved.",
    category: "file",
    href: "/tools/image-resize",
    icon: "Scaling",
    isFree: true,
  },
  {
    id: "uuid-generator",
    name: "UUID Generator & Hash",
    description:
      "Generate random UUID v4 identifiers in bulk and compute SHA-256 hashes of any text.",
    category: "developer",
    href: "/tools/uuid-generator",
    icon: "Fingerprint",
    isFree: true,
  },
];

export const categories = [
  { id: "all", name: "All Tools" },
  { id: "pdf", name: "PDF Tools" },
  { id: "text", name: "Text" },
  { id: "developer", name: "Developer" },
  { id: "generator", name: "Generators" },
  { id: "file", name: "File" },
];
