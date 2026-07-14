/**
 * Build çıktısını (out/) tarayıp sitemap.xml'i otomatik üretir.
 * "npm run build" sonrası postbuild kancasıyla çalışır — yeni sayfa/araç
 * eklendiğinde sitemap kendiliğinden güncel kalır.
 */
const fs = require("fs");
const path = require("path");

const SITE = "https://toolsmani.com";
const outDir = path.join(__dirname, "..", "out");
const EXCLUDE = [/^\/admin\//, /^\/404\//];

function collectRoutes(dir, prefix = "/") {
  const routes = [];
  if (fs.existsSync(path.join(dir, "index.html"))) {
    routes.push(prefix);
  }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === "_next") continue;
    routes.push(...collectRoutes(path.join(dir, entry.name), `${prefix}${entry.name}/`));
  }
  return routes;
}

function priorityFor(route) {
  if (route === "/" || route === "/tr/") return "1.0";
  if (route.endsWith("/tools/pdf/")) return "0.95";
  if (route.includes("/tools/pdf") || route.includes("/tools/image") || route.includes("/tools/heic")) return "0.9";
  if (route.includes("/tools/")) return "0.8";
  if (route.startsWith("/blog")) return "0.7";
  return "0.5";
}

const routes = collectRoutes(outDir)
  .filter((r) => !EXCLUDE.some((re) => re.test(r)))
  .sort();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE}${r}</loc>
    <changefreq>${r === "/" || r === "/tr/" || r === "/blog/" ? "weekly" : "monthly"}</changefreq>
    <priority>${priorityFor(r)}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(outDir, "sitemap.xml"), xml);
console.log(`sitemap.xml üretildi: ${routes.length} URL.`);
