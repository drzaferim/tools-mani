export interface Tool {
  id: string;
  name: string;
  description: string;
  category: "text" | "developer" | "generator" | "file";
  href: string;
  icon: string;
  isFree: boolean;
}

export const tools: Tool[] = [
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
    id: "pdf-merge",
    name: "PDF Merger",
    description:
      "Merge multiple PDF files into one. Reorder pages and customize output.",
    category: "file",
    href: "/tools/pdf-merge",
    icon: "FileText",
    isFree: false,
  },
];

export const categories = [
  { id: "all", name: "All Tools" },
  { id: "text", name: "Text" },
  { id: "developer", name: "Developer" },
  { id: "generator", name: "Generators" },
  { id: "file", name: "File" },
];
